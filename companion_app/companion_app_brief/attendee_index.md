# FinMa Family Reunion 2026 — Companion App Data Package

**Event:** FinMa Family Reunion | Westin Resort & Spa, Whistler BC  
**Dates:** March 10-13, 2026  
**Presentation Slot:** Thursday, March 12, 2026 | ~45 minutes  

---

## Data Package Contents

```
companion_app/
├── attendee_index.md          ← This file (master overview)
├── attendees_data.json        ← Structured JSON for app consumption
├── attendees/                 ← Individual markdown profiles (21 files)
│   ├── shane_leech_porter.md
│   ├── charl_laubscher.md
│   ├── ... (one per attendee)
│   └── finn_sebastian.md
└── images/                    ← Profile photos (18 of 21)
    ├── shane_leech_porter.jpg
    ├── charl_laubscher.jpg
    └── ... 
```

---

## Attendee Roster

### Sebastian Family & Office

| Name | Title | Image | LinkedIn |
|------|-------|-------|----------|
| **Mark Nelson** | CEO at Sebastian Brothers | ✓ `mark_nelson.jpg` | [Profile](https://www.linkedin.com/in/mark-nelson-50192041) |
| **Dirk Lothar Sebastian** | Managing Director at FinMa VV GmbH & FinMa Immobilien GmbH; Owner, Seb | ✗ Missing | [Profile](https://www.linkedin.com/in/dirk-sebastian-a253942a) |
| **Finn Sebastian** | Principal / Sebastian Brothers (assumed based on family office context | ✗ Missing | Private |
| **Jonathan Cooper** | COO, Sebastian Brothers (Properties); SVP Operations, Strand | ✓ `jonathan_cooper.jpg` | [Profile](https://www.linkedin.com/in/jonathantscooper) |
| **Christiane Sebastian** | Managing Director at FinMa VV GmbH (possibly also family office co-lea | ✗ Missing | Private |
| **Wali Mahmood** | Director Corporate Finance M&A at Bankhaus Metzler | ✓ `wali_mahmood.jpg` | [Profile](https://www.linkedin.com/in/wali-m-a20877a0) |

### German Contingent

| Name | Title | Image | LinkedIn |
|------|-------|-------|----------|
| **Benjamin Kromayer** | Founder & CEO at Vanbruben GmbH (digital agency) and TodaVida (fair-tr | ✓ `benjamin_kromayer.jpg` | [Profile](https://www.linkedin.com/in/benjamin-kromayer-8242589) |
| **Martin Jannsen** | Managing Director (Geschäftsführer) – REAL Sailing Unternehmensgruppe  | ✓ `martin_jannsen.jpg` | [Profile]([LinkedIn profile](https://www.linkedin.com/in/martin-jannsen-11811ba5)) |
| **Alexei Niemeyer** | Co-CEO (Geschäftsführer), Blue Sky Operations GmbH (Neetze, Lower Saxo | ✓ `alexei_niemeyer.jpg` | [Profile]([LinkedIn profile](https://www.linkedin.com/in/alexei-niemeyer-6289a0286)) |
| **Lukas Lange** | Co-CEO (Geschäftsführer), Blue Sky Operations GmbH (IT Services & Cons | ✓ `lukas_lange.jpg` | Private |

### Victoria Professional Services

| Name | Title | Image | LinkedIn |
|------|-------|-------|----------|
| **Mark Salter** | Founder MaxHQ PropTech, Managing Broker Alexandrite Real Estate Ltd.,  | ✓ `mark_salter.jpg` | [Profile](https://www.linkedin.com/in/mark-salter-4213a920) |
| **Eric A. Kerr** | Partner at Johns Southward LLP | ✓ `eric_a_kerr.jpg` | [Profile]([LinkedIn](https://www.linkedin.com/in/eric-kerr-01997910)) |
| **Stephen (Steve) Chatelain** | Senior Wealth Advisor, Portfolio Manager at ScotiaMcLeod - Greyell Por | ✓ `stephen_chatelain.jpg` | [Profile](Not publicly found) |
| **Patrick Robbins** | Associate Director & Team Lead (Market Lead), Victoria Commercial Bank | ✓ `patrick_robbins.jpg` | [Profile]([Patrick Robbins | LinkedIn](https://www.linkedin.com/in/patrick-robbins-0104921b)) |
| **Emma Miller** | Partner, Private Enterprise, MNP LLP | ✓ `emma_miller.jpg` | [Profile](https://www.linkedin.com/in/emma-miller-065666112) |
| **Troy McGinnis** | Founder & CEO, Gearbox Development Inc. (Victoria, British Columbia, C | ✓ `troy_mcginnis.jpg` | [Profile]([Troy McGinnis LinkedIn](https://www.linkedin.com/in/troymcginnis)) |

### Fibre Infrastructure (Kurnl)

| Name | Title | Image | LinkedIn |
|------|-------|-------|----------|
| **Frank Hobbs** | Chief Operating Officer at Kurnl | ✓ `frank_hobbs.jpg` | [Profile](https://www.linkedin.com/in/frank-hobbs-845b1a3) |
| **Carreen Unguran** | Principal Consultant, WynConsult | ✓ `carreen_unguran.jpg` | [Profile]([Carreen U LinkedIn](https://www.linkedin.com/in/cunguran)) |
| **Shane Leech-Porter, CFA** | Chief Executive Officer (CEO), Kurnl | ✓ `shane_leech_porter.jpg` | [Profile]([LinkedIn](https://www.linkedin.com/in/sl-p)) |

### Creative / Brand (Love + Money)

| Name | Title | Image | LinkedIn |
|------|-------|-------|----------|
| **Jesse Campbell** | Director of Partnerships, Love + Money Agency (Partner) | ✓ `jesse_campbell.jpg` | [Profile]([LinkedIn – Jesse Campbell](https://www.linkedin.com/in/jesselcampbell)) |
| **Charl Laubscher** | Co-founder & CEO, Telepathic Instruments; Founder/Executive Creative D | ✓ `charl_laubscher.jpg` | [Profile]([Charl Laubscher on LinkedIn](https://www.linkedin.com/in/charllaubscher)) |

---

## Per-Attendee Resource Guide Structure

Each attendee's markdown file contains:

1. **Overview** — Name, title, company, LinkedIn
2. **Detailed Profile** — Full career history, education, achievements, personal interests
3. **AI Impact Analysis** — How AI/exponential tech specifically affects their role and industry
4. **Personalized AI Resource Guide**
   - **AI Tools** — Specific product recommendations with relevance to their role
   - **Agentic Frameworks** — Multi-agent systems, workflow automation relevant to their industry
   - **Role Transformation** — Which parts of their daily work are being disrupted/enhanced
   - **Learning Resources** — Podcasts, newsletters, courses, books for AI in their field
   - **Industry Use Cases** — Concrete examples of peers/competitors using AI

---

## App Concept (To Be Built)

### User Flow
1. Attendee scans QR code shown during presentation
2. Enters their name (autocomplete as they type from roster of 21)
3. Confirms identity ("Yes, this is me")
4. Hits "Check In" → main screen shows them checking in
5. Gets access to personalized mobile site with:
   - Their AI resource guide
   - Personalized relevance notes tied to presentation sections
   - Link to presentation (enabled after talk concludes)

### Main Screen (Presenter's View)
- Shows attendees checking in as they scan
- Creative portrait for each attendee (style TBD — they pick during onboarding)
- Live count of check-ins

---

## Image Status

| Status | Count |
|--------|-------|
| Downloaded | 18 |
| Missing (private) | 3 |

**Missing:** Dirk Sebastian, Christiane Sebastian, Finn Sebastian — all are private family members with minimal public online presence. You may want to source these directly from Mark Nelson or the family.

---

*Compiled: March 2026 | Data layer for companion app*
