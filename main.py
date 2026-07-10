from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2
from supabase import create_client
from groq import Groq
from datetime import datetime
import time
import docx
import io
import pytesseract
from PIL import Image
import fitz
from dotenv import load_dotenv
import os

load_dotenv()

import platform
if platform.system() == "Windows":
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
groq_client = Groq(api_key=GROQ_API_KEY)

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class ChatRequest(BaseModel):
    message: str
    context: str = ""

class TranslateRequest(BaseModel):
    text: str
    language: str

class SettingsUpdate(BaseModel):
    full_name: str
    email: str
    language: str
    timezone: str
    theme: str

def calculate_risk_score(text):
    high_keywords = ["terminate", "penalty", "liability", "breach", "sue"]
    medium_keywords = ["confidential", "restrict", "limit", "obligation"]
    text_lower = text.lower()
    if any(word in text_lower for word in high_keywords):
        return "High"
    elif any(word in text_lower for word in medium_keywords):
        return "Medium"
    return "Low"

@app.get("/")
def home():
    return {"message": "API Working!"}

@app.post("/upload-contract/")
async def upload_contract(file: UploadFile = File(...)):
    try:
        extracted_text = ""
        try:
            if file.filename.endswith(".pdf"):
                content = await file.read()
                pdf_doc = fitz.open(stream=content, filetype="pdf")
                for page in pdf_doc:
                    text = page.get_text()
                    if text.strip():
                        extracted_text += text
                    else:
                        pix = page.get_pixmap()
                        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                        extracted_text += pytesseract.image_to_string(img)
            elif file.filename.endswith(".docx"):
                content = await file.read()
                doc = docx.Document(io.BytesIO(content))
                for para in doc.paragraphs:
                    extracted_text += para.text + "\n"
        except:
            extracted_text = "Failed"

        ai_summary = "Summary generation disabled"
        clauses = []
        recommendations = []

        if extracted_text and len(extracted_text) > 50 and extracted_text != "Failed":
            try:
                chat_completion = groq_client.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": f"""Analyse the following document and return a JSON with these fields:
- summary: 2-3 sentence summary
- clauses: list of detected clauses (max 5)
- missing_clauses: list of missing important clauses (max 3)
- recommendations: list of recommendations (max 3)

Return only valid JSON, no other text.

Document:
{extracted_text[:3000]}"""
                        }
                    ],
                    model="llama-3.3-70b-versatile",
                )
                import json
                result = json.loads(chat_completion.choices[0].message.content.strip())
                ai_summary = result.get("summary", "")
                clauses = result.get("clauses", [])
                recommendations = result.get("recommendations", [])
            except Exception as e:
                # Fallback to simple summary
                try:
                    chat_completion = groq_client.chat.completions.create(
                        messages=[{"role": "user", "content": f"Summarize in 2-3 sentences. Return only the summary:\n{extracted_text[:3000]}"}],
                        model="llama-3.3-70b-versatile",
                    )
                    ai_summary = chat_completion.choices[0].message.content.strip()
                except:
                    ai_summary = f"AI Generation Failed: {str(e)}"

        risk = calculate_risk_score(extracted_text)

        data = {
            "filename": file.filename,
            "extracted_text": extracted_text[:3000],
            "summary": ai_summary,
            "risk_score": risk,
            "uploaded_at": datetime.now().isoformat()
        }

        supabase.table("contracts").insert(data).execute()

        return {
            "status": "success",
            "summary": ai_summary,
            "risk_score": risk,
            "clauses": clauses,
            "recommendations": recommendations,
            "extracted_text": extracted_text[:1000]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat/")
async def chat(request: ChatRequest):
    try:
        system_prompt = "You are an AI contract analysis assistant. Help users understand their contracts, identify risks, and provide legal insights. Be concise and helpful."
        if request.context:
            system_prompt += f"\n\nDocument context: {request.context[:2000]}"

        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            model="llama-3.3-70b-versatile",
        )
        return {"response": chat_completion.choices[0].message.content.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/translate/")
async def translate(request: TranslateRequest):
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"Translate the following text to {request.language}. Return only the translated text:\n\n{request.text}"
                }
            ],
            model="llama-3.3-70b-versatile",
        )
        return {"translated": chat_completion.choices[0].message.content.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/documents")
async def get_documents():
    try:
        response = supabase.table("contracts").select("*").order("uploaded_at", desc=True).execute()
        return response.data
    except:
        return {"error": "failed"}

@app.delete("/documents/{doc_id}")
async def delete_document(doc_id: int):
    try:
        supabase.table("contracts").delete().eq("id", doc_id).execute()
        return {"status": "deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/settings")
def get_settings():
    try:
        res = supabase.table("settings").select("*").eq("id", 1).single().execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/settings")
def update_settings(data: SettingsUpdate):
    try:
        res = supabase.table("settings").update({
            "full_name": data.full_name,
            "email": data.email,
            "language": data.language,
            "timezone": data.timezone,
            "theme": data.theme
        }).eq("id", 1).execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))