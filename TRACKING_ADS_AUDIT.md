# Elite Stays Africa Tracking + Ads Audience Audit

Date: 2026-05-04  
Scope: GA4, Meta Pixel, ads audience segmentation, lead heat scoring.  
Production changes: none made.  
Local code tightening: applied in repo, not deployed.

## Local Fixes Applied After Audit

- Added `academy-enrol` to academy lead routing so Academy enrol leads go to Brevo Academy list/template.
- Fixed new-host `hasProperty` handling for values `yes-own`, `yes-lease`, and `looking` so Brevo host/investor routing is cleaner.
- Changed market intel lead tracking so Meta/GA4 hard lead fires only after a successful backend capture.
- Added guest page intent tracking to `/properties` with `intentType=properties_list_view`.
- Changed `/properties` “Get in Touch” CTA from plain link to tracked guest intent.
- Fixed contact page WhatsApp/email card classification so generic contact cards do not accidentally become investor contacts.
- Verification: `npm run lint && npx tsc --noEmit` passed. Existing warning only: Meta noscript `<img>` in layout.

## Current Tracking Foundation

### IDs installed
- GA4 measurement ID: `G-K2K44Z6MSN`
- Meta Pixel ID: `981780637838760`

### Implementation locations
- Global GA4 + Meta Pixel script load: `src/app/layout.tsx`
- Meta PageView component: `src/components/MetaPixelPageView.tsx`
- Event helper layer: `src/lib/analytics.ts`
- Page intent tracker: `src/components/IntentTracking.tsx`
- CTA tracking wrapper: `src/components/IntentLink.tsx`

### Live check
- `https://elitestaysafrica.com/invest` has `window.gtag` and `window.fbq` loaded.
- GA4 dataLayer receives custom events. Example confirmed on `/academy`: `academy_interest` with `audience_type=academy`, `intent_type=page_view`, `page_path=/academy`.

## Current Event Inventory

### Global
- Meta `PageView` fires on route/path changes via `MetaPixelPageView`.
- GA4 `config` loads globally.

### Guest / properties
- Property detail page view:
  - GA4: `property_view`
  - Meta standard: `ViewContent`
  - Meta custom: `GuestIntent`
  - Params: property slug, name, location, page path/title.
- Property booking click:
  - GA4: `property_booking_click`
  - Meta custom: `PropertyBookingIntent`
  - Params: property slug/name/location, click source, button text, destination URL, nights, guests, dates when available.
- WhatsApp click from `/properties` CTA:
  - GA4: `guest_contact_click`
  - Meta standard: `Contact`
  - Meta custom: `GuestContactIntent`

### Investor / owner
- `/invest` page view:
  - GA4: `investor_intent`
  - Meta standard: `ViewContent`
  - Meta custom: `InvestorIntent`
- Audit CTA clicks:
  - GA4: `investor_intent`
  - Meta custom: `InvestorIntent`
- Journey selector:
  - GA4: `investor_intent`
  - Meta custom: `InvestorIntent`
  - Params include `journey`.
- Audit/new-host form submit:
  - GA4: `investor_lead`
  - Meta standard: `Lead`
  - Meta custom: `InvestorIntent`
- Investor WhatsApp clicks:
  - GA4: `investor_contact_click`
  - Meta standard: `Contact`
  - Meta custom: `InvestorContactIntent`
- `/market-intel` page view:
  - GA4: `investor_intent`
  - Meta standard: `ViewContent`
  - Meta custom: `InvestorIntent`
- Market intel report form submit:
  - GA4: `investor_lead`
  - Meta standard: `Lead`
  - Meta custom: `InvestorIntent`

### Academy
- `/academy` page view:
  - GA4: `academy_interest`
  - Meta standard: `ViewContent`
  - Meta custom: `AcademyInterest`
- `/academy/enrol` page view:
  - GA4: `academy_interest`
  - Meta standard: `ViewContent`
  - Meta custom: `AcademyInterest`
- Academy CTA clicks:
  - GA4: `academy_interest`
  - Meta custom: `AcademyInterest`
- Academy notify/enrol form submit:
  - GA4: `academy_lead`
  - Meta standard: `Lead`
  - Meta custom: `AcademyInterest`
- Invest page academy cross-sell:
  - GA4: `academy_interest`
  - Meta custom: `AcademyInterest`

## Recommended Audience Architecture

Use one Meta Pixel and one GA4 property. Split audiences by page path + event params.

### Meta audiences

#### Guests
- Cold: broad/location/interests/video viewers.
- Warm guest: visited `/properties` OR `/properties/*` in last 30/60/180 days.
- Hot guest: triggered `PropertyBookingIntent` OR `GuestContactIntent` OR `Contact` where `audience_type=guest`.
- Exclusion: investor/academy leads when running guest booking ads.

#### Investors / property owners
- Warm investor: visited `/invest` OR `/market-intel` OR triggered `InvestorIntent` with `ViewContent`.
- Engaged investor: clicked audit CTA, selected journey, clicked investor WhatsApp.
- Hot investor: triggered Meta `Lead` with `audience_type=investor` OR custom `InvestorIntent` where `intent_type=lead_submit`.
- Suggested split:
  - Owners/hosts: `lead_type=listing-audit` or `journey=have-listing`.
  - New investors/owners: `lead_type=new-host-inquiry` or `journey=looking-to-start`.
  - Data/research leads: `/market-intel` lead submit.

#### Academy
- Warm academy: visited `/academy` OR `/academy/enrol`.
- Engaged academy: clicked enrol/apply CTA.
- Hot academy: triggered Meta `Lead` with `audience_type=academy` OR `AcademyInterest` where `intent_type=lead_submit`.
- Suggested split by `tier`: self-starter / guided-launch / done-with-you / not-sure.

### GA4 audiences

Create audiences with matching rules:
- `Guest - all property viewers`: page path starts with `/properties` OR event `property_view`.
- `Guest - hot booking intent`: event `property_booking_click` OR `guest_contact_click`.
- `Investor - all`: page path `/invest` or `/market-intel` OR event `investor_intent`.
- `Investor - hot leads`: event `investor_lead`.
- `Academy - all`: page path starts with `/academy` OR event `academy_interest`.
- `Academy - hot leads`: event `academy_lead`.

Mark as GA4 key events:
- `property_booking_click`
- `guest_lead`
- `investor_lead`
- `academy_lead`
- Recommended add/confirm: `guest_contact_click`, `investor_contact_click`, `academy_contact_click` if we want WhatsApp/contact as hard conversion events.

## Lead Heat Scoring Model

### Cold
- Video views / ad engagement only.
- Website `PageView` only.

### Warm
- Visited branch landing page:
  - `/properties`
  - `/invest`
  - `/academy`
  - `/market-intel`
- Viewed individual property detail.
- Read relevant blog/resources.

### Engaged / medium intent
- Clicked CTA but did not submit:
  - guest WhatsApp/contact click
  - investor audit CTA click
  - investor journey selected
  - academy enrol/apply CTA click
- Returned to same branch multiple times.

### Hot
- Submitted form.
- Clicked booking button to Airbnb.
- Clicked WhatsApp/contact CTA with clear branch intent.
- Market intel report request.

### Sales priority
1. Hot investor leads: form submit + phone/WhatsApp + `journey=have-listing` or `listing-audit`.
2. Hot academy leads: enrol form + tier selected, especially `guided-launch` or `done-with-you`.
3. Hot guest leads: booking click with dates/guests or WhatsApp from property page.
4. Warm retargeting pools: page viewers and CTA clickers without lead submit.

## Gaps / Risks Found

### P0 — Fix before ad spend

These were found during the audit and fixed locally after this report was created. They still need deployment approval before they affect production.

1. **Academy enrol leads may route incorrectly in Brevo.**
   - Frontend sends `source: academy-enrol`.
   - API route only treats `academy-waitlist` and `academy-notify` as academy sources.
   - Risk: academy enrol leads land in investor/default path instead of Academy list and email template.

2. **New-host lead routing has value mismatch.**
   - Form sends `hasProperty`: `yes-own`, `yes-lease`, `looking`.
   - API checks `hasProperty === "yes"` or `hasProperty === "no"`.
   - Risk: wrong lead source label/list routing inside Brevo.

3. **Market intel form tracks a lead even if backend capture fails.**
   - The fetch error is swallowed and `trackInvestorIntent(... Lead)` always runs.
   - Risk: Meta/GA4 count leads that may not exist in CRM/email.

### P1 — Tighten before scaling
4. **`/properties` listing page lacks a specific guest page-intent event.**
   - Global Meta PageView fires, but no GA4 `guest_intent` / Meta `GuestIntent` for property listing page view.
   - Add `TrackPageIntent` for `/properties` with `intentType=properties_list_view`.

5. **Plain links to contact are not always tracked.**
   - Example: `/properties` “Get in Touch” is a plain `Link`.
   - Add `IntentLink` or explicit event so guest contact intent is clear.

6. **Contact page WhatsApp/email audience classification is too loose.**
   - Current logic uses card description text; WhatsApp card becomes investor because description does not include “booking”.
   - Better: classify by selected subject or use neutral contact intent with source/page context.

7. **Hard leads depend on browser-side tracking only.**
   - Ad blockers/iOS privacy can block Meta/GA4 client events.
   - Once spend increases, add server-side Meta Conversions API and Google Measurement Protocol/enhanced conversions for submitted leads.

### P2 — Nice to improve
8. Standardize event names/params with a written taxonomy.
9. Add UTM preservation into lead submissions so Brevo/emails include campaign/source/content.
10. Add test pages/procedure for Meta Events Manager and GA4 DebugView before every campaign launch.

## GA4 Data in Ads

### Meta/Facebook/Instagram
- Meta does not optimize directly from GA4.
- Meta ads should optimize from Meta Pixel events/audiences.
- GA4 is used as independent reporting and landing-page/campaign analysis.

### Google/YouTube
- GA4 can feed Google Ads if linked.
- Import GA4 key events into Google Ads.
- Share GA4 audiences to Google Ads for remarketing.

### Reporting role
GA4 should be the neutral truth layer for comparing:
- Meta ads
- Google/YouTube ads
- organic social
- SEO/blog
- direct/referral

## Required Setup Checklist Before Launching Ads

### Website/code
- [x] Fix academy enrol source routing in `/api/invest-lead` locally.
- [x] Fix new-host `hasProperty` source/list routing locally.
- [x] Make market intel lead tracking fire only after successful capture locally.
- [x] Add `/properties` page intent event locally.
- [x] Track major `/properties` contact/WhatsApp links with audience context locally.
- [ ] Add UTM fields to lead submission payloads.

### Meta Events Manager
- [ ] Verify domain.
- [ ] Confirm Pixel ID `981780637838760`.
- [ ] Test `/properties`, `/invest`, `/academy`, `/market-intel`.
- [ ] Test `PropertyBookingIntent`.
- [ ] Test investor lead submit.
- [ ] Test academy lead submit.
- [ ] Create custom conversions for guest booking intent, investor lead, academy lead.
- [ ] Create saved audiences by branch + heat.

### GA4
- [ ] Confirm property `G-K2K44Z6MSN` collecting live traffic.
- [ ] Mark key events.
- [ ] Create GA4 audiences by branch + heat.
- [ ] Link GA4 to Google Ads if/when Google/YouTube ads start.
- [ ] Import GA4 conversions into Google Ads.

### Ads/UTMs
- [ ] Every ad URL uses UTMs.
- [ ] Naming convention: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, optional `utm_term`.
- [ ] Campaigns separated by audience: guest / investor / academy.
- [ ] Retargeting exclusions set so guests do not get investor ads unless intentionally cross-sold.

## Recommended Next Move

Do a small local code tightening pass before ad launch:
1. Fix Brevo lead routing bugs.
2. Add missing guest list/contact events.
3. Add UTM capture into all lead APIs/emails.
4. Re-run lint/typecheck.
5. Only then deploy after explicit approval.
