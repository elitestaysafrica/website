import { NextRequest, NextResponse } from "next/server"

const BREVO_API_KEY = process.env.BREVO_API_KEY || ""
const BREVO_LIST_ID = parseInt(process.env.BREVO_INVESTOR_LIST_ID || "7") // List ID 7 = Investors
const NOTIFICATION_EMAIL = "hello@elitestaysafrica.com"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      source = "consultation",
      name,
      email,
      phone,
      // Legacy fields
      units,
      // Audit form fields
      listingUrl,
      avgBookings,
      nightlyRate,
      biggestChallenge,
    } = body

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    if (BREVO_API_KEY) {
      // 1. Create/update contact in Brevo
      const attributes: Record<string, string> = {
        FIRSTNAME: name?.split(" ")[0] || "",
        LASTNAME: name?.split(" ").slice(1).join(" ") || "",
      }
      if (phone) attributes.WHATSAPP = phone
      if (listingUrl) attributes.LISTING_URL = listingUrl
      if (avgBookings) attributes.AVG_BOOKINGS = avgBookings
      if (nightlyRate) attributes.NIGHTLY_RATE = nightlyRate
      if (biggestChallenge) attributes.BIGGEST_CHALLENGE = biggestChallenge

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
          listIds: [BREVO_LIST_ID],
          updateEnabled: true,
        }),
      })

      // 2. Send notification email (different format per source)
      let subject = ""
      let htmlContent = ""

      if (source === "listing-audit") {
        subject = `🔍 Free Listing Audit Request: ${name || email}`
        htmlContent = `
          <h2>New Listing Audit Request</h2>
          <p><strong>Name:</strong> ${name || "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${phone || "Not provided"}</p>
          <hr>
          <p><strong>Listing URL:</strong> <a href="${listingUrl}">${listingUrl || "Not provided"}</a></p>
          <p><strong>Avg Bookings/Month:</strong> ${avgBookings || "Not specified"}</p>
          <p><strong>Nightly Rate:</strong> ${nightlyRate ? `KES ${nightlyRate}` : "Not specified"}</p>
          <p><strong>Biggest Challenge:</strong> ${biggestChallenge || "Not specified"}</p>
          <hr>
          <p><strong>Source:</strong> elitestaysafrica.com/invest (Free Audit Form)</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <p><em>Reply within 48 hours with the audit report.</em></p>
        `
      } else if (source === "academy-waitlist") {
        subject = `🎓 Academy Waitlist Signup: ${email}`
        htmlContent = `
          <h2>New Academy Waitlist Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Source:</strong> elitestaysafrica.com/invest (Academy Waitlist)</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `
      } else {
        subject = `🏠 New Consultation Request: ${name || email}`
        htmlContent = `
          <h2>New Consultation Request</h2>
          <p><strong>Name:</strong> ${name || "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Units Interested:</strong> ${units || "Not specified"}</p>
          <p><strong>Source:</strong> elitestaysafrica.com/invest</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <hr>
          <p><em>Reply directly to this email or reach out via WhatsApp.</em></p>
        `
      }

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
          subject,
          htmlContent,
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Lead capture error:", error)
    return NextResponse.json({ ok: true }) // Don't expose errors to client
  }
}
