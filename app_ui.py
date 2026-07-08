import streamlit as st
import requests

# Backend server URL (FastAPI running at port 8000)
BACKEND_URL = "http://127.0.0.1:8000/upload-contract/"

st.title("📄 Contract Analyzer AI")
st.write("Upload your PDF file, and the AI will provide a summary and risk score!")

uploaded_file = st.file_uploader("Choose a PDF file", type=["pdf"])

if uploaded_file is not None:
    if st.button("Analyze"):
        with st.spinner('AI is analyzing...'):
            try:
                # Sending file to the backend
                files = {"file": (uploaded_file.name, uploaded_file.getvalue(), "application/pdf")}
                response = requests.post(BACKEND_URL, files=files)
                
                if response.status_code == 200:
                    result = response.json()
                    st.success("Successfully analyzed!")
                    
                    # Displaying the result
                    data = result.get("database_record", [{}])[0]
                    
                    st.subheader("Summary:")
                    st.write(data.get("summary", "No summary available"))
                    
                    st.subheader("Risk Score:")
                    st.write(data.get("risk_score", "No score available"))
                else:
                    st.error(f"Error: {response.text}")
            except Exception as e:
                st.error(f"Connection error: {e}")