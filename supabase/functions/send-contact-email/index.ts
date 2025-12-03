import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import sgMail from 'npm:@sendgrid/mail@^7.7.0'

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
    
    sgMail.setApiKey(SENDGRID_API_KEY)

    // 2. EMAIL CHO ADMIN (bạn)
    const adminEmail = {
      to: ADMIN_EMAIL,
      from: {
        email: FROM_EMAIL,
        name: 'Hitek Flycam Website' // Thêm tên sender
      },
      subject: `📧 Hitek Flycam - Liên hệ mới từ ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 28px;">📧 LIÊN HỆ MỚI</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Hitek Flycam Website</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <h2 style="color: #374151; margin-top: 0;">👤 Thông tin khách hàng</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Họ tên:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Số điện thoại:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${phone}</td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Công ty:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${company}</td>
              </tr>
              ` : ''}
              ${service ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Dịch vụ quan tâm:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${service}</td>
              </tr>
              ` : ''}
              ${location ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Địa điểm:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${location}</td>
              </tr>
              ` : ''}
            </table>
            
            <div style="margin-top: 25px;">
              <h3 style="color: #374151; margin-bottom: 10px;">💬 Nội dung tin nhắn</h3>
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              <p><strong>⏰ Thời gian nhận:</strong> ${new Date().toLocaleString('vi-VN', { 
                timeZone: 'Asia/Ho_Chi_Minh',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}</p>
              <p><strong>🌐 Nguồn:</strong> Hitek Flycam Website</p>
            </div>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Hitek Flycam - Giải pháp Drone chuyên nghiệp</p>
          </div>
        </div>
      `,
      text: `LIÊN HỆ MỚI TỪ WEBSITE\n
Họ tên: ${name}
Email: ${email}
Số điện thoại: ${phone}
Công ty: ${company || 'Không có'}
Dịch vụ quan tâm: ${service || 'Không có'}
Địa điểm: ${location || 'Không có'}

Nội dung tin nhắn:
${message}

Thời gian: ${new Date().toLocaleString('vi-VN')}
`
    }

    // 3. EMAIL AUTO-REPLY (cho khách hàng)
    const userEmail = {
      to: email,
      from: {
        email: FROM_EMAIL,
        name: 'Hitek Flycam'
      },
      subject: 'Hitek Flycam - Cảm ơn bạn đã liên hệ',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🎯 Cảm ơn bạn đã liên hệ!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Hitek Flycam - Giải pháp Drone chuyên nghiệp</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <p style="font-size: 16px; color: #374151;">Xin chào <strong>${name}</strong>,</p>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Cảm ơn bạn đã liên hệ với Hitek Flycam. Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi trong thời gian sớm nhất 
              <strong>(thường trong vòng 24 giờ làm việc)</strong>.
            </p>
            
            <div style="background: #f3f4f6; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #111827; margin-top: 0;">📋 Thông tin liên hệ của bạn</h3>
              <table style="width: 100%;">
                <tr><td style="padding: 8px 0; color: #6b7280;">Họ tên:</td><td style="padding: 8px 0; font-weight: 500;">${name}</td></tr>
                ${company ? `<tr><td style="padding: 8px 0; color: #6b7280;">Công ty:</td><td style="padding: 8px 0; font-weight: 500;">${company}</td></tr>` : ''}
                <tr><td style="padding: 8px 0; color: #6b7280;">Email:</td><td style="padding: 8px 0; font-weight: 500;">${email}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Số điện thoại:</td><td style="padding: 8px 0; font-weight: 500;">${phone}</td></tr>
                ${service ? `<tr><td style="padding: 8px 0; color: #6b7280;">Dịch vụ quan tâm:</td><td style="padding: 8px 0; font-weight: 500;">${service}</td></tr>` : ''}
                ${location ? `<tr><td style="padding: 8px 0; color: #6b7280;">Địa điểm:</td><td style="padding: 8px 0; font-weight: 500;">${location}</td></tr>` : ''}
              </table>
              <div style="margin-top: 15px;">
                <div style="color: #6b7280; font-size: 14px; margin-bottom: 5px;">Nội dung tin nhắn:</div>
                <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #bae6fd;">
              <h4 style="color: #0369a1; margin-top: 0;">📞 Cần hỗ trợ ngay?</h4>
              <p style="color: #0c4a6e; margin-bottom: 10px;">Liên hệ trực tiếp với chúng tôi:</p>
              <ul style="color: #0c4a6e; padding-left: 20px; margin: 0;">
                <li>Hotline: <strong>028 99 95 95 88</strong></li>
                <li>Email: <strong>info@droneservices.vn</strong></li>
                <li>Thời gian làm việc: Thứ 2 - Thứ 6: 8:00 - 18:00</li>
              </ul>
            </div>
            
            <p style="color: #4b5563;">Trân trọng,<br>
            <strong style="color: #dc2626; font-size: 16px;">Đội ngũ Hitek Flycam</strong></p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
              <p><strong>Hitek Flycam - Giải pháp Drone chuyên nghiệp</strong></p>
              <p>📍 Quận 1, Tp. Hồ Chí Minh | 📞 028 99 95 95 88 | 🌐 droneservices.vn</p>
              <p style="margin-top: 10px; color: #9ca3af;">
                Email này được gửi tự động, vui lòng không trả lời trực tiếp.<br>
                ID liên hệ: ${Date.now()}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `Cảm ơn bạn đã liên hệ với Hitek Flycam!

Xin chào ${name},

Cảm ơn bạn đã liên hệ với Hitek Flycam. Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi trong thời gian sớm nhất (thường trong vòng 24 giờ làm việc).

THÔNG TIN LIÊN HỆ CỦA BẠN:
- Họ tên: ${name}
${company ? `- Công ty: ${company}\n` : ''}- Email: ${email}
- Số điện thoại: ${phone}
${service ? `- Dịch vụ quan tâm: ${service}\n` : ''}${location ? `- Địa điểm: ${location}\n` : ''}
- Nội dung: ${message}

CẦN HỖ TRỢ NGAY?
- Hotline: 028 99 95 95 88
- Email: info@droneservices.vn
- Thời gian làm việc: Thứ 2 - Thứ 6: 8:00 - 18:00

Trân trọng,
Đội ngũ Hitek Flycam

📍 Quận 1, Tp. Hồ Chí Minh
📞 028 99 95 95 88
🌐 droneservices.vn

---
Email tự động, vui lòng không trả lời trực tiếp.
ID: ${Date.now()}
`
    }

    // 4. GỬI EMAILS
    console.log('📤 Starting to send emails with domain:', FROM_EMAIL)
    
    // Gửi email cho admin
    console.log('📧 Sending admin email from:', FROM_EMAIL, 'to:', ADMIN_EMAIL)
    const adminResult = await sgMail.send(adminEmail)
    console.log('✅ Admin email sent:', adminResult[0].statusCode === 202)
    
    // Gửi auto-reply cho khách hàng
    console.log('📧 Sending auto-reply from:', FROM_EMAIL, 'to:', email)
    const userResult = await sgMail.send(userEmail)
    console.log('✅ Auto-reply sent:', userResult[0].statusCode === 202)
    
    console.log('🎉 All emails sent successfully from domain!')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Emails sent successfully!',
        adminEmail: ADMIN_EMAIL,
        customerEmail: email,
        fromDomain: FROM_EMAIL
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