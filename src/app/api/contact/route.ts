import { NextRequest, NextResponse } from 'next/server'

// Telegram Bot notification
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || ''

async function sendTelegramNotification(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured, skipping notification')
    return false
  }
  
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    })
    
    if (response.ok) {
      console.log('Telegram notification sent successfully')
      return true
    } else {
      console.error('Failed to send Telegram notification:', await response.text())
      return false
    }
  } catch (error) {
    console.error('Telegram notification error:', error)
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

    // Format the message for notification
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

    // Send Telegram notification
    await sendTelegramNotification(formattedMessage)

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
