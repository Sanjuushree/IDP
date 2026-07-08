import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ivlogyfrmutyqmbfuhbn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2bG9neWZybXV0eXFtYmZ1aGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NzE0NzEsImV4cCI6MjA5NjU0NzQ3MX0.EGJsjUywBSnK1f9TRanYUiVJnIisYpFZ_AwwxVhtogM';

export const supabase = createClient(supabaseUrl, supabaseKey);