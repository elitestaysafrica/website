import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_KEY = process.env.BREVO_API_KEY || ""
const BREVO_INVESTOR_LIST_ID = parseInt(process.env.BREVO_INVESTOR_LIST_ID || "7")
const NOTIFICATION_EMAIL = "hello@elitestaysafrica.com"

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

    if (BREVO_API_KEY) {
      // 1. Add to Brevo
      const attributes: Record<string, string> = {
        FIRSTNAME: name?.split(" ")[0] || "",
        LASTNAME: name?.split(" ").slice(1).join(" ") || "",
      }
      if (phone) attributes.WHATSAPP = phone.replace(/\D/g, "")
      if (subject) attributes.SUBJECT = subject
      if (message) attributes.MESSAGE = message

      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          attributes,
          listIds: [BREVO_INVESTOR_LIST_ID],
          updateEnabled: true,
        }),
      })

      // 2. Send notification email
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Elite Stays Website", email: "hello@elitestaysafrica.com" },
          to: [{ email: NOTIFICATION_EMAIL }],
          subject: `📨 Contact Form: ${name || email}`,
          htmlContent: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Subject:</strong> ${subject || "Not specified"}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p><em>Time: ${new Date().toISOString()}</em></p>
          `,
        }),
      })
    }

    return NextResponse.json({
      success: true,
      message: "Message received! We'll get back to you soon.",
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
