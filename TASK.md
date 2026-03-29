# TASK: Rewrite /invest page — Host Services Focus

## Overview
Rewrite the `/invest` page at `src/app/invest/page.tsx` and `src/app/invest/InvestClientComponents.tsx`. The page pivots from "investment + management" to "host services for property investors." Management is NOT a featured service — just a one-liner mention.

## CRITICAL RULES
- Do NOT delete any code. Archive the old management card content to `src/app/invest/_archived-management-section.tsx` (not exported, just saved).
- Keep the existing `<Price>` component usage pattern for all KES amounts.
- Keep the existing `lucide-react` icon imports pattern.
- The site uses Tailwind CSS + shadcn/ui (`@/components/ui/button`, etc.)
- Keep all existing schema.org structured data in layout.tsx but update content to match new page.
- Brevo API integration stays the same (List 7), just update the fields sent.

## Page Structure (top to bottom)

### 1. HERO
- Keep investor angle: "Launch Your Airbnb in Nairobi"
- Subtitle: "We help property owners furnish, optimize, and launch high-performing short-term rentals — with proven results and transparent pricing."
- Stats: 85%+ Avg Occupancy, 4.92★ Guest Rating, 4+ Years in Nairobi (keep as-is)
- RIGHT SIDE: Free Listing Audit form (replaces consultation form) — this is the main CTA
- Mobile CTA button scrolls to audit form at bottom

### 2. THE PROBLEM (keep as-is mostly)
- "Buying the Right Property Is Only Half the Equation"
- Keep the 50% higher rates, 15-20% more nights stats
- Change last line from "The right setup and management..." to "The right setup turns a good investment into a great one."

### 3. COMPARISON TABLE (keep, minor tweaks)
- Keep all rows and data as-is
- The "Monthly Net to Owner" row: keep the numbers, they still apply with or without management

### 4. OUR SERVICES — Rewrite this section completely
Title: "Our Services"
Subtitle: "Everything you need to launch, optimize, or refresh your Airbnb property."

#### Card 1: Full Furnishing Package (featured/primary card with border-primary)
Badge: "Most Popular — Empty Unit to First Booking"
Description: "We take your empty unit to a fully bookable, guest-ready property in 4-6 weeks."
Includes:
- Interior design & space planning
- Full furnishing sourcing & purchasing
- Coordinating workmen & installation
- Airbnb & Booking.com account setup
- Professional photography & video
- Hard & soft copy house manuals
- Find and train a dedicated cleaner
- Cleaning checklists & SOPs
- Guest message templates
- Launch pricing strategy
- Listing SEO optimization

Pricing box:
- Estimated furnishing cost: KES 1,200,000 (1-Bed) / KES 1,500,000 (2-Bed)
- Plus our service fee
- Site visit & detailed quote: KES 10,000 — credited if you hire us

Bottom note: "Need ongoing management? We selectively partner with property owners who are the right fit. Ask us during your consultation."

#### Card 2: Photography & Listing Optimization
Badge: "Quick Win — See Results in Days"
Description: "Great furniture with bad photos is invisible. We fix that."
Includes:
- Professional photography & video
- Listing title & description rewrite
- SEO optimization for Airbnb search
- Calendar & pricing settings review
- Competitor positioning analysis

Pricing box: "Starting from KES 35,000" (no specific price component needed, just text)

#### Card 3: Refresh / Restage
Badge: "Boost Revenue — Without Starting Over"
Description: "Your unit is furnished but underperforming. We diagnose why and fix it."
Includes:
- Full property audit & assessment
- Updated soft furnishings & decor
- New professional photography
- Listing rewrite & repositioning
- Pricing strategy reset
- Updated house manuals

Pricing box: "Custom quote based on scope — starts with a KES 10,000 site visit (credited if you hire us)"

### 5. FREE LISTING AUDIT (NEW SECTION — this is the lead magnet)
Background: primary/5 or similar accent
Title: "Free Listing Audit"
Subtitle: "Not sure where to start? Submit your Airbnb link and we'll tell you exactly what's holding your listing back — for free."

Form fields:
- Airbnb Listing URL (text input, required, placeholder: "https://airbnb.com/rooms/...")
- Average bookings per month (select: "0-5", "5-10", "10-15", "15+", "Just getting started")
- Current nightly rate in KES (text input, placeholder: "e.g. 8,000")
- Biggest challenge right now (select: "Not enough bookings", "Rates feel too low", "Bad reviews", "Just getting started", "Other")
- Name (text, required)
- Email (email, required)
- WhatsApp number (tel, optional)

Submit button: "Get My Free Audit"
Success message: "We'll review your listing and send you a detailed audit within 48 hours."

This form should POST to `/api/invest-lead` — update the API route to accept these new fields. Store them in Brevo with attributes: LISTING_URL, AVG_BOOKINGS, NIGHTLY_RATE, BIGGEST_CHALLENGE (plus existing FIRSTNAME, LASTNAME, WHATSAPP). Notification email should include all fields.

### 6. STR ACADEMY (NEW SECTION — teaser)
Background: gray-900 (dark section)
Title: "Elite Stays Academy" with a "Coming Soon" badge
Subtitle: "A complete course series on how to crush it as an STR operator in Nairobi. From finding the right property to maximizing revenue — everything we've learned in 4+ years, packaged for you."

Bullet points (what's included):
- Finding the right property & neighborhood
- Furnishing for maximum bookings
- Pricing strategy & revenue optimization  
- Guest experience & 5-star reviews
- Operations & team management
- Scaling from 1 to 10+ units

Email capture: Simple input (email) + "Notify Me When It Launches" button
This should also POST to `/api/invest-lead` with a flag like `source: "academy-waitlist"` and add to the same Brevo list.

### 7. WHY WE OUTPERFORM (keep as-is)
- Precision Pricing, 5-Star Guest Experience, Listing Optimization, Transparent Reporting

### 8. ROI PROJECTIONS (keep, update footnotes)
- Keep 1-bed and 2-bed cards exactly as-is
- Update footnote: Remove "after... 20% management fee" — change to "after Airbnb platform fees. Management fees apply separately if you opt for ongoing management."

### 9. HOW IT WORKS (update steps)
Title: "From Empty Unit to First Booking"
Steps:
01 - Site Visit & Quote — "We visit your property, assess the space, and provide a detailed furnishing list with costs."
02 - Design & Furnish — "Custom interiors, sourcing, workmen coordination — 4-6 weeks from bare unit to guest-ready."
03 - Launch — "Professional photos, listing optimization, account setup. Your property goes live on Airbnb & Booking.com."
04 - First Booking — "First booking typically within 7-14 days of going live. You get paid directly by Airbnb."

### 10. SOCIAL PROOF (keep as-is)
### 11. TESTIMONIALS (keep as-is)

### 12. FAQ (update)
Keep these questions, update answers to remove management-centric language:
- "Is Airbnb profitable in Nairobi?" — keep
- "How much does it cost to furnish an Airbnb in Nairobi?" — keep, mention service fee includes cleaner training
- Remove: "What does your management fee cover?" 
- "How much can I earn from an Airbnb in Kenya?" — keep, remove "after management fee"
- "What are the best areas for Airbnb in Nairobi?" — keep
- "Do I need to pay taxes on Airbnb income in Kenya?" — keep
- "Can I use my property sometimes?" — remove (management-specific)
- "How long before my property starts earning?" — keep
- "How do I get paid?" — simplify to "Airbnb pays you directly"
- "Can I get furnishing without management?" — reframe to "Do I need to sign a management contract?" answer: "No. All our services are standalone."
- ADD: "What's included in the free listing audit?" — "We review your photos, title, description, pricing, calendar settings, and competitive positioning. You'll receive a detailed report with specific, actionable recommendations — completely free."
- ADD: "Do you only work with new/empty units?" — "No. We work with existing hosts who want to improve their performance too. Our Photography & Optimization and Refresh packages are designed specifically for furnished units that need a boost."

### 13. BOTTOM CTA (update)
- Keep the dark section
- Left side: "Ready to Get Started?" + bullet points updated for services
- Right side: The Listing Audit form again (same component, reuse)
- WhatsApp button stays

### 14. TRUST FOOTER (keep as-is)

## Files to modify:
1. `src/app/invest/page.tsx` — main rewrite
2. `src/app/invest/InvestClientComponents.tsx` — new AuditForm + AcademySignup components (keep LeadForm for reference but it won't be used on page). Rename existing LeadForm or keep it.
3. `src/app/invest/layout.tsx` — update metadata title/description/keywords + schema.org
4. `src/app/api/invest-lead/route.ts` — accept new audit form fields + academy waitlist flag
5. `src/app/invest/_archived-management-section.tsx` — dump old management card JSX here

## Do NOT touch any other files.
