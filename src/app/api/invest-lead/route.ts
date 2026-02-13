import { NextRequest, NextResponse } from "next/server"

const BREVO_API_KEY = process.env.BREVO_API_KEY || ""
const BREVO_LIST_ID = parseInt(process.env.BREVO_INVESTOR_LIST_ID || "2") // Default list ID 2 for investors
const NOTIFICATION_EMAIL = "hello@elitestaysafrica.com"

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, units } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    // 1. Add contact to Brevo investors list
    if (BREVO_API_KEY) {
      // Create/update contact
      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          attributes: {
            FIRSTNAME: name?.split(" ")[0] || "",
            LASTNAME: name?.split(" ").slice(1).join(" ") || "",
            SMS: phone || "",
          },
          listIds: [BREVO_LIST_ID],
          updateEnabled: true,
        }),
      })

      // 2. Send notification email to ESA team
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Elite Stays Website", email: "noreply@elitestaysafrica.com" },
          to: [{ email: NOTIFICATION_EMAIL }],
          subject: `🏠 New Investor Lead: ${name || email}`,
          htmlContent: `
            <h2>New Investment Inquiry</h2>
            <p><strong>Name:</strong> ${name || "Not provided"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Units Interested:</strong> ${units || "Not specified"}</p>
            <p><strong>Source:</strong> elitestaysafrica.com/invest</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            <hr>
            <p><em>Reply directly to this email or reach out via WhatsApp.</em></p>
          `,
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Lead capture error:", error)
    return NextResponse.json({ ok: true }) // Don't expose errors to client
  }
}
