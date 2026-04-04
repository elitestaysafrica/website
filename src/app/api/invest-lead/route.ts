import { NextRequest, NextResponse } from "next/server"

const BREVO_API_KEY = process.env.BREVO_API_KEY || ""
// Brevo list IDs: 3=Guests, 10=Hosts, 11=Investors, 12=Academy, 13=Newsletter
const BREVO_HOSTS_LIST = 10
const BREVO_INVESTORS_LIST = 11
const BREVO_ACADEMY_LIST = 12
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
      // New host inquiry fields
      hasProperty,
      neighborhood,
      unitSize,
      interestedIn,
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
      if (phone) attributes.WHATSAPP = phone.replace(/\D/g, "")
      if (listingUrl) attributes.LISTING_URL = listingUrl
      if (avgBookings) attributes.AVG_BOOKINGS = avgBookings
      if (nightlyRate) attributes.NIGHTLY_RATE = nightlyRate
      if (biggestChallenge) attributes.BIGGEST_CHALLENGE = biggestChallenge
      if (hasProperty) attributes.HAS_PROPERTY = hasProperty
      if (neighborhood) attributes.NEIGHBORHOOD = neighborhood
      if (unitSize) attributes.UNIT_SIZE = unitSize
      if (interestedIn) attributes.INTERESTED_IN = interestedIn

      // Tag the lead source via LEAD_SOURCE attribute
      const leadSource =
        source === "listing-audit" ? "Listing Audit" :
        source === "new-host-inquiry" ? (hasProperty === "yes" ? "New Host - Has Property" : "New Host - No Property") :
        source === "academy-waitlist" || source === "academy-notify" ? "Academy" :
        "Consultation"
      attributes.LEAD_SOURCE = leadSource

      // Route to correct list based on source
      const listId =
        source === "listing-audit" ? BREVO_HOSTS_LIST :
        source === "new-host-inquiry" ? (hasProperty === "no" ? BREVO_INVESTORS_LIST : BREVO_HOSTS_LIST) :
        source === "academy-waitlist" || source === "academy-notify" ? BREVO_ACADEMY_LIST :
        BREVO_INVESTORS_LIST  // default consultation = investor

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
          listIds: [listId],
          updateEnabled: true,
        }),
      })

      // 2. Send notification email (different format per source)
      let subject = ""
      let htmlContent = ""

      if (source === "new-host-inquiry") {
        subject = `🏠 New Host Inquiry: ${name || email}`
        htmlContent = `
          <h2>New Host Inquiry — Looking to Start</h2>
          <p><strong>Name:</strong> ${name || "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${phone || "Not provided"}</p>
          <hr>
          <p><strong>Has Property:</strong> ${hasProperty || "Not specified"}</p>
          <p><strong>Neighborhood:</strong> ${neighborhood || "Not specified"}</p>
          <p><strong>Unit Size:</strong> ${unitSize || "Not specified"}</p>
          <p><strong>Interested In:</strong> ${interestedIn || "Not specified"}</p>
          <hr>
          <p><strong>Source:</strong> elitestaysafrica.com/invest (New Host Form)</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <p><em>Reply within 48 hours.</em></p>
        `
      } else if (source === "listing-audit") {
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
      } else if (source === "academy-waitlist" || source === "academy-notify") {
        subject = `🎓 Academy Pre-Sale Signup: ${name || phone || email}`
        htmlContent = `
          <h2>New Academy Pre-Sale Signup</h2>
          <p><strong>Name:</strong> ${name || "Not provided"}</p>
          <p><strong>WhatsApp:</strong> ${phone || "Not provided"}</p>
          <p><strong>Tier Interest:</strong> ${interestedIn || "Not specified"}</p>
          <hr>
          <p><strong>Source:</strong> elitestaysafrica.com/academy</p>
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
