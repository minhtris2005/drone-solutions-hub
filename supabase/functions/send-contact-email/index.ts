import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import sgMail from 'npm:@sendgrid/mail@^7.7.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('📧 Edge Function called - SENDGRID VERSION')
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request
    const formData = await req.json()
    console.log('📥 Received data:', formData)

    const { name, email, phone, company, service, location, message } = formData
    
    // Validate
    if (!name || !email || !phone || !message) {
      throw new Error('Missing required fields')
    }

    // Thêm serviceOptions mapping
    const serviceOptions = [
      { value: '', label: 'Chọn dịch vụ...' },
      { value: 'sua-chua-drone', label: 'Sửa chữa drone' },
      { value: 'quay-flycam', label: 'Quay flycam' },
      { value: 'drone-trac-dia', label: 'Drone trắc địa' },
      { value: 'drone-van-chuyen', label: 'Drone vận chuyển' },
      { value: 'dich-vu-phep-bay', label: 'Dịch vụ phép bay' },
      { value: 'nhau-khau-drone', label: 'Nhập khẩu drone' },
      { value: 'khac', label: 'Dịch vụ khác' }
    ];

    // 1. SETUP SENDGRID
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
    const FROM_EMAIL = 'no-reply@em1368.vibecoding.hitek.com.vn'
    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'phamnguyenminhtri249@gmail.com'
    
    console.log('🔑 SendGrid API Key exists:', !!SENDGRID_API_KEY)
    console.log('📧 From email:', FROM_EMAIL)
    console.log('📧 Admin email:', ADMIN_EMAIL)
    
    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API Key chưa được cấu hình trong Environment Variables')
    }
    
    // 2. SETUP SUPABASE CLIENT
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    
    console.log('🔗 Supabase URL exists:', !!supabaseUrl)
    console.log('🔑 Supabase Service Key exists:', !!supabaseServiceKey)
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn('⚠️ Supabase credentials missing - skipping database save')
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // 3. LƯU VÀO DATABASE TRƯỚC KHI GỬI EMAIL
    let dbRecordId = null
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert({
          name,
          email,
          phone,
          company: company || null,
          service: service || null,
          location: location || null,
          message,
          status: 'pending', // pending, sent, failed
          submitted_at: new Date().toISOString()
        })
        .select('id')
        .single()
      
      if (error) {
        console.error('❌ Database insert error:', error)
        // Vẫn tiếp tục gửi email nếu lưu database thất bại
      } else {
        dbRecordId = data.id
        console.log('✅ Saved to database with ID:', dbRecordId)
      }
    } catch (dbError) {
      console.error('❌ Database error:', dbError)
    }

    sgMail.setApiKey(SENDGRID_API_KEY)

    // 4. Form hiển thị mail được gửi tới admin
    const adminEmail = {
      to: ADMIN_EMAIL,
      from: {
        email: FROM_EMAIL,
        name: 'Hitek Flycam Website'
      },
      subject: `📧 Hitek Flycam - Liên hệ mới từ ${name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liên hệ mới từ Hitek Flycam</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #4b5563; margin-bottom: 5px; }
        .value { color: #111827; }
        .highlight { background: #dbeafe; padding: 10px; border-radius: 6px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .service-label { 
            background: #3b82f6; 
            color: white; 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-size: 12px; 
            display: inline-block; 
            margin-top: 4px; 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Hitek Flycam - Liên hệ mới</h1>
            <p>Bạn có một yêu cầu liên hệ mới từ website</p>
        </div>
        
        <div class="content">
            <div class="highlight">
                <p><strong>📋 Thông tin liên hệ:</strong></p>
                <p>Người gửi: <strong>${name}</strong></p>
                <p>Thời gian: <strong>${new Date().toLocaleString('vi-VN')}</strong></p>
                <p>ID: <strong>${dbRecordId ? 'HD' + dbRecordId.toString().padStart(6, '0') : 'Chưa lưu DB'}</strong></p>
            </div>
            
            <table>
                <tr>
                    <td class="label" width="30%">👤 Họ và tên:</td>
                    <td class="value">${name}</td>
                </tr>
                <tr>
                    <td class="label">🏢 Công ty:</td>
                    <td class="value">${company || '<span style="color: #6b7280;">Không có</span>'}</td>
                </tr>
                <tr>
                    <td class="label">📧 Email:</td>
                    <td class="value"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
                </tr>
                <tr>
                    <td class="label">📞 Số điện thoại:</td>
                    <td class="value"><a href="tel:${phone}" style="color: #3b82f6;">${phone}</a></td>
                </tr>
                <tr>
                    <td class="label">🔧 Dịch vụ quan tâm:</td>
                    <td class="value">
                        ${service ? serviceOptions.find(s => s.value === service)?.label || service : '<span style="color: #6b7280;">Không chọn</span>'}
                    </td>
                </tr>
                <tr>
                    <td class="label">📍 Địa điểm:</td>
                    <td class="value">${location || '<span style="color: #6b7280;">Không có</span>'}</td>
                </tr>
            </table>
            
            <div style="margin: 30px 0;">
                <div class="label">💬 Nội dung tin nhắn:</div>
                <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb; margin-top: 10px;">
                    ${message.replace(/\n/g, '<br>')}
                </div>
            </div>
            
            <hr style="margin: 30px 0; border: 1px solid #e5e7eb;">
            
            <div style="margin-top: 30px; padding: 15px; background: #f3f4f6; border-radius: 6px; font-size: 14px;">
                <p><strong>📊 Thông tin hệ thống:</strong></p>
                <table>
                    <tr>
                        <td width="40%">Domain gửi:</td>
                        <td>em1368.vibecoding.hitek.com.vn</td>
                    </tr>
                    <tr>
                        <td>Thời gian xử lý:</td>
                        <td>${new Date().toISOString()}</td>
                    </tr>
                    <tr>
                        <td>Trạng thái:</td>
                        <td>Đang chờ xử lý</td>
                    </tr>
                </table>
            </div>
            
            <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
                <p>Đây là email tự động từ hệ thống Hitek Flycam.</p>
                <p>Vui lòng phản hồi trong vòng 24 giờ làm việc.</p>
                <p style="margin-top: 10px;">
                    <a href="mailto:${email}" style="background: #3b82f6; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; display: inline-block;">
                        📧 Trả lời ngay
                    </a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`
    }

    // 5. Form hiển thị mail được gửi tới khách hàng
    const userEmail = {
      to: email,
      from: {
        email: FROM_EMAIL,
        name: 'Hitek Flycam'
      },
      subject: 'Hitek Flycam - Cảm ơn bạn đã liên hệ',
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cảm ơn bạn đã liên hệ với Hitek Flycam</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; }
        .info-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #d1fae5; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .contact-info { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; }
        .service-badge { background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px; display: inline-block; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">🎉 Cảm ơn bạn đã liên hệ!</h1>
            <p style="margin: 10px 0 0 0;">Hitek Flycam đã nhận được yêu cầu của bạn</p>
        </div>
        
        <div class="content">
            <p>Xin chào <strong>${name}</strong>,</p>
            
            <p>Cảm ơn bạn đã liên hệ với <strong>Hitek Flycam</strong>. Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi trong thời gian sớm nhất.</p>
            
            <div class="info-box">
                <h3 style="margin-top: 0; color: #059669; border-bottom: 2px solid #d1fae5; padding-bottom: 10px;">📋 Thông tin yêu cầu của bạn</h3>
                <table style="width: 100%;">
                    <tr>
                        <td style="padding: 8px 0;"><strong>Mã yêu cầu:</strong></td>
                        <td style="padding: 8px 0;"><strong style="color: #3b82f6;">${dbRecordId ? 'HD' + dbRecordId.toString().padStart(6, '0') : 'Đang xử lý'}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Dịch vụ:</strong></td>
                        <td style="padding: 8px 0;">
                            ${service ? '<span class="service-badge">' + (serviceOptions.find(s => s.value === service)?.label || service) + '</span>' : '<span style="color: #6b7280;">Chưa chọn dịch vụ cụ thể</span>'}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Thời gian gửi:</strong></td>
                        <td style="padding: 8px 0;">${new Date().toLocaleString('vi-VN')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; vertical-align: top;"><strong>Nội dung:</strong></td>
                        <td style="padding: 8px 0;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</td>
                    </tr>
                </table>
            </div>
            
            <div class="contact-info">
                <h3 style="margin-top: 0; color: #2563eb;">📞 Liên hệ nhanh với chúng tôi</h3>
                <table style="width: 100%;">
                    <tr>
                        <td style="padding: 8px 0;"><strong>Hotline:</strong></td>
                        <td style="padding: 8px 0;"><a href="tel:0346124230" style="color: #3b82f6;">0346 124 230</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Email:</strong></td>
                        <td style="padding: 8px 0;"><a href="mailto:support@hitekflycam.vn" style="color: #3b82f6;">support@hitekflycam.vn</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Website:</strong></td>
                        <td style="padding: 8px 0;"><a href="https://hitekflycam.vn" style="color: #3b82f6;">https://hitekflycam.vn</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Địa chỉ:</strong></td>
                        <td style="padding: 8px 0;">TP. Hồ Chí Minh, Việt Nam</td>
                    </tr>
                </table>
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
                <a href="tel:0346124230" class="button" style="margin-right: 10px;">📞 Gọi ngay</a>
                <a href="mailto:support@hitekflycam.vn" class="button" style="background: #10b981;">📧 Gửi email</a>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
                <p><strong style="color: #d97706;">💡 Lưu ý quan trọng:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Thời gian phản hồi: <strong>1-2 giờ</strong> trong giờ hành chính</li>
                    <li>Để được hỗ trợ nhanh nhất, vui lòng giữ điện thoại luôn mở</li>
                    <li>Tham khảo dịch vụ của chúng tôi tại: <a href="https://hitekflycam.vn/dich-vu" style="color: #3b82f6;">https://hitekflycam.vn/dich-vu</a></li>
                </ul>
            </div>
            
            <div class="footer">
                <p>Trân trọng,</p>
                <p style="font-size: 18px; color: #2563eb; font-weight: bold;">Đội ngũ Hitek Flycam</p>
                <p>📍 TP. Hồ Chí Minh, Việt Nam</p>
                <p>📧 support@hitekflycam.vn | 📞 0346 124 230</p>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <p style="font-size: 12px; color: #9ca3af; margin: 5px 0;">
                        © ${new Date().getFullYear()} Hitek Flycam. All rights reserved.
                    </p>
                    <p style="font-size: 12px; color: #9ca3af; margin: 5px 0;">
                        Đây là email tự động, vui lòng không trả lời email này.
                    </p>
                    <p style="font-size: 12px; color: #9ca3af; margin: 5px 0;">
                        Nếu bạn không gửi yêu cầu này, vui lòng bỏ qua email hoặc liên hệ hỗ trợ.
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`
    }

    // 6. GỬI EMAILS
    console.log('📤 Starting to send emails with domain:', FROM_EMAIL)
    
    let adminSent = false
    let userSent = false
    let adminError = null
    let userError = null
    
    // Gửi email cho admin
    try {
      console.log('📧 Sending admin email from:', FROM_EMAIL, 'to:', ADMIN_EMAIL)
      const adminResult = await sgMail.send(adminEmail)
      adminSent = adminResult[0].statusCode === 202
      console.log('✅ Admin email sent:', adminSent)
    } catch (error) {
      console.error('❌ Admin email failed:', error)
      adminError = error.message
    }
    
    // Gửi auto-reply cho khách hàng
    try {
      console.log('📧 Sending auto-reply from:', FROM_EMAIL, 'to:', email)
      const userResult = await sgMail.send(userEmail)
      userSent = userResult[0].statusCode === 202
      console.log('✅ Auto-reply sent:', userSent)
    } catch (error) {
      console.error('❌ Auto-reply failed:', error)
      userError = error.message
    }

    // 7. CẬP NHẬT DATABASE VỚI TRẠNG THÁI GỬI EMAIL
    if (dbRecordId) {
      try {
        const updateData: any = {
          admin_email_sent: adminSent,
          user_email_sent: userSent,
          updated_at: new Date().toISOString()
        }
        
        if (adminSent && userSent) {
          updateData.status = 'sent'
        } else {
          updateData.status = 'partial_failure'
          updateData.error_details = {
            admin_error: adminError,
            user_error: userError
          }
        }
        
        const { error: updateError } = await supabase
          .from('contact_submissions')
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

    if (!adminSent && !userSent) {
      throw new Error('Failed to send both emails')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Emails sent successfully!',
        data_saved: !!dbRecordId,
        emails_sent: {
          admin: adminSent,
          user: userSent
        },
        record_id: dbRecordId
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('❌ Error in Edge Function:', error)
    console.error('Error details:', error.response?.body)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error.response?.body || 'No additional details'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})