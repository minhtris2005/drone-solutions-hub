// utils/documentService.js
export async function sendDocumentDownload(formData) {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    console.log('📄 [DocumentService] Sending document download...');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Form data:', formData);
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    // SỬA TÊN FUNCTION: send-document-download-email → document-download
    const functionUrl = `${supabaseUrl}/functions/v1/document-download`;
    console.log('Function URL:', functionUrl);
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify(formData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    let result;
    
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Failed to parse response:', parseError);
      throw new Error('Invalid JSON response from server');
    }
    
    if (!response.ok) {
      console.error('❌ Response not OK:', result);
      throw new Error(result.error || `HTTP ${response.status}: ${responseText}`);
    }

    return { success: true, data: result };
    
  } catch (error) {
    console.error('❌ Document download error:', error);
    return { 
      success: false, 
      error: error.message
    };
  }
}