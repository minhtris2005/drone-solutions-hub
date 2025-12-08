// supabase/functions/document-download/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import sgMail from 'npm:@sendgrid/mail@^7.7.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

// CORS headers đầy đủ
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-requested-with',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  console.log('📄 Document Download Edge Function called')
  
  // Handle CORS preflight - QUAN TRỌNG: Trả về 200 OK
  if (req.method === 'OPTIONS') {
    console.log('🔄 Handling CORS preflight request')
    return new Response('ok', { 
      status: 200,
      headers: corsHeaders 
    })
  }

  // Chỉ cho phép POST method
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method not allowed' 
    }), { 
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    // Parse request
    let formData
    try {
      formData = await req.json()
    } catch (parseError) {
      console.error('❌ Failed to parse JSON:', parseError)
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid JSON format' 
      }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    console.log('📥 Received document download data:', formData)

    const { 
      name, 
      email, 
      phone, 
      company, 
      document 
    } = formData
    
    // Validate
    if (!name || !email || !phone || !document || !document.title) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields for document download' 
      }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // 1. SETUP SENDGRID
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
    const FROM_EMAIL = 'no-reply@em1368.vibecoding.hitek.com.vn'
    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'phamnguyenminhtri249@gmail.com'
    
    console.log('🔑 SendGrid API Key exists:', !!SENDGRID_API_KEY)
    
    if (!SENDGRID_API_KEY) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'SendGrid API Key chưa được cấu hình trong Environment Variables' 
      }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    // 2. SETUP SUPABASE CLIENT
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    
    console.log('🔗 Supabase URL exists:', !!supabaseUrl)
    console.log('🔑 Supabase Service Key exists:', !!supabaseServiceKey)
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Supabase credentials missing' 
      }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // 3. LƯU VÀO BẢNG document_downloads
    let dbRecordId = null
    try {
      const { data, error } = await supabase
        .from('document_downloads')
        .insert({
          user_name: name,
          user_email: email,
          user_phone: phone,
          user_company: company || null,
          document_id: document.id,
          document_title: document.title,
          document_description: document.description,
          document_url: document.file_url,
          document_type: document.file_type,
          document_size: document.file_size,
          download_at: new Date().toISOString(),
          status: 'downloaded'
        })
        .select('id')
        .single()
      
      if (error) {
        console.error('❌ Database insert error:', error)
        throw new Error(`Database error: ${error.message}`)
      } else {
        dbRecordId = data.id
        console.log('✅ Saved to document_downloads with ID:', dbRecordId)
      }
    } catch (dbError) {
      console.error('❌ Database error:', dbError)
      throw dbError
    }

    sgMail.setApiKey(SENDGRID_API_KEY)

    // 4. EMAIL CHO ADMIN - Tải tài liệu
    const adminEmail = {
      to: ADMIN_EMAIL,
      from: {
        email: FROM_EMAIL,
        name: 'Hitek Flycam Tài Liệu'
      },
      subject: `📄 Hitek Flycam - Tải tài liệu từ ${name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tải tài liệu từ Hitek Flycam</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; }
        .highlight { background: #d1fae5; padding: 15px; border-radius: 8px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .document-info {
            background: #f0f9ff;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 25px 0;
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📄 Hitek Flycam - Tải tài liệu mới</h1>
            <p>Có người vừa tải tài liệu từ website của bạn</p>
        </div>
        
        <div class="content">
            <div class="highlight">
                <p><strong>📋 Thông tin người tải:</strong></p>
                <p>Họ tên: <strong>${name}</strong></p>
                <p>Thời gian: <strong>${new Date().toLocaleString('vi-VN')}</strong></p>
                <p>Mã giao dịch: <strong>DL${dbRecordId ? dbRecordId.toString().substring(0, 8).toUpperCase() : 'N/A'}</strong></p>
            </div>
            
            <div class="document-info">
                <h3 style="margin-top: 0; color: #2563eb;">📄 THÔNG TIN TÀI LIỆU ĐÃ TẢI</h3>
                <table>
                    <tr>
                        <td width="30%"><strong>Tiêu đề:</strong></td>
                        <td><strong>${document.title}</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Mô tả:</strong></td>
                        <td>${document.description || 'Không có mô tả'}</td>
                    </tr>
                    ${document.file_type ? `
                    <tr>
                        <td><strong>Loại file:</strong></td>
                        <td>${document.file_type}</td>
                    </tr>
                    ` : ''}
                    ${document.file_size ? `
                    <tr>
                        <td><strong>Kích thước:</strong></td>
                        <td>${document.file_size}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>
            
            <table>
                <tr>
                    <td width="30%"><strong>👤 Họ và tên:</strong></td>
                    <td>${name}</td>
                </tr>
                <tr>
                    <td><strong>🏢 Công ty:</strong></td>
                    <td>${company || 'Không có'}</td>
                </tr>
                <tr>
                    <td><strong>📧 Email:</strong></td>
                    <td><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
                </tr>
                <tr>
                    <td><strong>📞 Số điện thoại:</strong></td>
                    <td><a href="tel:${phone}" style="color: #3b82f6;">${phone}</a></td>
                </tr>
            </table>
            
            <hr style="margin: 30px 0; border: 1px solid #e5e7eb;">
            
            <div style="margin-top: 30px; padding: 15px; background: #f3f4f6; border-radius: 6px; font-size: 14px;">
                <p><strong>📊 Thông tin hệ thống:</strong></p>
                <table>
                    <tr>
                        <td width="40%">Hệ thống:</td>
                        <td>Hitek Flycam - Module Tài Liệu</td>
                    </tr>
                    <tr>
                        <td>Thời gian xử lý:</td>
                        <td>${new Date().toISOString()}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
`
    }

    // 5. EMAIL XÁC NHẬN CHO NGƯỜI TẢI
    const userEmail = {
      to: email,
      from: {
        email: FROM_EMAIL,
        name: 'Hitek Flycam Tài Liệu'
      },
      subject: 'Hitek Flycam - Xác nhận tải tài liệu thành công',
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác nhận tải tài liệu thành công</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 25px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; }
        .info-box { background: #f0f9ff; padding: 25px; border-radius: 10px; margin: 25px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">📥 Tải tài liệu thành công!</h1>
            <p style="margin: 10px 0 0 0;">Hitek Flycam đã nhận được yêu cầu của bạn</p>
        </div>
        
        <div class="content">
            <p>Xin chào <strong>${name}</strong>,</p>
            
            <p>Cảm ơn bạn đã tải tài liệu từ <strong>Hitek Flycam</strong>. Chúng tôi đã ghi nhận thông tin của bạn và đội ngũ chuyên gia sẽ liên hệ hỗ trợ bạn trong thời gian sớm nhất.</p>
            
            <div class="info-box">
                <h3 style="margin-top: 0; color: #059669;">📄 Chi tiết tài liệu đã tải</h3>
                <table style="width: 100%;">
                    <tr>
                        <td style="padding: 12px 0; width: 35%;"><strong>Mã giao dịch:</strong></td>
                        <td style="padding: 12px 0;"><strong style="color: #3b82f6;">DL${dbRecordId ? dbRecordId.toString().substring(0, 8).toUpperCase() : 'N/A'}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0;"><strong>Tài liệu:</strong></td>
                        <td style="padding: 12px 0;">${document.title}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0;"><strong>Thời gian:</strong></td>
                        <td style="padding: 12px 0;">${new Date().toLocaleString('vi-VN')}</td>
                    </tr>
                </table>
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
                <p><strong>📞 Hotline hỗ trợ: 0346 124 230</strong></p>
                <p><strong>📧 Email: support@hitekflycam.vn</strong></p>
            </div>
            
            <div style="text-align: center; margin: 25px 0; color: #6b7280; font-size: 14px;">
                <p>Trân trọng,</p>
                <p style="font-size: 16px; color: #2563eb; font-weight: bold;">Đội ngũ Hitek Flycam</p>
            </div>
        </div>
    </div>
</body>
</html>
`
    }

    // 6. GỬI EMAILS
    console.log('📤 Starting to send document download emails')
    
    let adminSent = false
    let userSent = false
    let adminError = null
    let userError = null
    
    // Gửi email cho admin
    try {
      console.log('📧 Sending admin notification to:', ADMIN_EMAIL)
      const adminResult = await sgMail.send(adminEmail)
      adminSent = adminResult[0].statusCode === 202
      console.log('✅ Admin notification sent:', adminSent)
    } catch (error) {
      console.error('❌ Admin notification failed:', error)
      adminError = error.message
    }
    
    // Gửi xác nhận cho người tải
    try {
      console.log('📧 Sending user confirmation to:', email)
      const userResult = await sgMail.send(userEmail)
      userSent = userResult[0].statusCode === 202
      console.log('✅ User confirmation sent:', userSent)
    } catch (error) {
      console.error('❌ User confirmation failed:', error)
      userError = error.message
    }

    // 7. CẬP NHẬT DATABASE VỚI TRẠNG THÁI EMAIL
    if (dbRecordId) {
      try {
        const updateData: any = {
          admin_email_sent: adminSent,
          user_email_sent: userSent,
          updated_at: new Date().toISOString()
        }
        
        if (!adminSent || !userSent) {
          updateData.email_error_details = {
            admin_error: adminError,
            user_error: userError
          }
        }
        
        const { error: updateError } = await supabase
          .from('document_downloads')
          .update(updateData)
          .eq('id', dbRecordId)
        
        if (updateError) {
          console.error('❌ Database update error:', updateError)
        } else {
          console.log('✅ Database updated with email status')
        }
      } catch (updateError) {
        console.error('❌ Database update failed:', updateError)
      }
    }

    // 8. TRẢ VỀ RESPONSE
    const responseData = {
      success: true,
      message: 'Document download recorded successfully!',
      data: {
        record_id: dbRecordId,
        document_title: document.title,
        document_url: document.file_url,
        emails_sent: {
          admin: adminSent,
          user: userSent
        },
        download_time: new Date().toISOString()
      }
    }

    return new Response(
      JSON.stringify(responseData),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('❌ Error in Document Download Edge Function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})