import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format the message for WhatsApp/notification
    const formattedMessage = `
🔔 New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

---
Sent from elitestaysafrica.com
    `.trim()

    // Log the submission (for debugging)
    console.log('Contact form submission:', formattedMessage)

    // Try to send WhatsApp notification via CallMeBot or similar
    // For now, we'll just log it and return success
    // TODO: Add email notification via SendGrid/Resend/etc when configured

    // Option 1: Store in a local file (simple approach for now)
    // Option 2: Send to webhook
    // Option 3: Email API

    // For production, you'd want to send an email notification
    // Example with Resend (would need API key):
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'website@elitestaysafrica.com',
    //   to: 'hello@elitestaysafrica.com',
    //   subject: `Contact Form: ${subject}`,
    //   text: formattedMessage,
    // })

    return NextResponse.json({ 
      success: true, 
      message: 'Message received! We will get back to you soon.' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
