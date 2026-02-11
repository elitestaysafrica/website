import { NextRequest, NextResponse } from 'next/server'

// WhatsApp notification via CallMeBot
// To activate: Send "I allow callmebot to send me messages" to +34 644 71 81 99 on WhatsApp
const WHATSAPP_NUMBER = '254111695444'
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY || ''

async function sendWhatsAppNotification(message: string) {
  if (!CALLMEBOT_APIKEY) {
    console.log('CallMeBot API key not configured, skipping WhatsApp notification')
    return false
  }
  
  try {
    const encodedMessage = encodeURIComponent(message)
    const url = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}&apikey=${CALLMEBOT_APIKEY}`
    
    const response = await fetch(url)
    if (response.ok) {
      console.log('WhatsApp notification sent successfully')
      return true
    } else {
      console.error('Failed to send WhatsApp notification:', await response.text())
      return false
    }
  } catch (error) {
    console.error('WhatsApp notification error:', error)
    return false
  }
}

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

    // Format the message for WhatsApp
    const formattedMessage = `🔔 *New Website Inquiry*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone || 'Not provided'}
*Subject:* ${subject}

*Message:*
${message}

---
_elitestaysafrica.com_`

    // Log the submission
    console.log('Contact form submission:', { name, email, phone, subject, message })

    // Send WhatsApp notification
    await sendWhatsAppNotification(formattedMessage)

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
