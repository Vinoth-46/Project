// Civil Engineering Knowledge Engine & AI Service for Kitchaa's Enterprise

const SYSTEM_PROMPT = `You are the official Civil Engineering AI Assistant for KITCHAA'S ENTERPRISE — a premium civil engineering consultancy based in Namakkal, Tamil Nadu, India.
OWNER: Er. V. Nirmal, B.E (Civil) — Licensed Civil Engineer & Proprietor
LOCATION: Namakkal, Tamil Nadu, India
PHONE / WHATSAPP: +91 83440 51846
EMAIL: kitchaasenterprise@gmail.com
GSTIN: 33FKGPP3797C1ZX

FEES & PRICING:
- 2D Architectural Plan: ₹2 – ₹6 per sq.ft
- 3D Design / Elevation: ₹10 – ₹20 per sq.ft
- Residential Building Approval: ₹15,000 – ₹20,000 (Govt. fees extra)
- Commercial Building Approval: Depends on total built-up area
- Bank Loan Estimate / Valuation: ₹2,000 – ₹10,000
- Construction Benchmarks: Standard build ₹1,800 – ₹2,100/sq.ft (base ₹2,000), Luxury build ₹2,800 – ₹4,000+/sq.ft (base ₹3,400)
- Consultancy Packages: Standard Plan 3%, Premium Plan 6%, Luxury Plan 9% of project value.

Always be polite, professional, concise, and show full math when calculating estimates.`;

/**
 * Format currency in Indian Numbering System (Lakhs, Crores)
 */
function formatINR(val: number): string {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Crores (₹${val.toLocaleString('en-IN')})`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakhs (₹${val.toLocaleString('en-IN')})`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}

/**
 * Intelligent Local Fallback Engine
 * Accurately answers questions using Kitchaa's Enterprise pricing, guidelines & math
 */
export function getLocalAIResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Detect Square Footage Calculation requests
  const sqftMatch = q.match(/(\d{3,5})\s*(sq\.?\s*ft|sqft|square\s*feet|sq\s*feet|feet|ft)/i) ||
                    q.match(/(estimate|cost|budget|calculate|plan for|house for)\s+(\d{3,5})/i);

  const directNumberMatch = !sqftMatch && q.match(/\b(\d{3,5})\b/);
  const area = sqftMatch 
    ? parseInt(sqftMatch[1] || sqftMatch[2], 10) 
    : (directNumberMatch && (q.includes('sq') || q.includes('cost') || q.includes('house') || q.includes('build')) ? parseInt(directNumberMatch[1], 10) : null);

  if (area && area >= 200 && area <= 50000) {
    const stdConst = area * 2000;
    const luxConst = area * 3400;

    const stdConsult = Math.round(stdConst * 0.03);
    const premConsult = Math.round(stdConst * 0.06);
    const luxConsult = Math.round(luxConst * 0.09);

    const plan2D = area * 4;
    const plan3D = area * 15;

    return `### 📐 Engineering Cost Estimation for **${area.toLocaleString('en-IN')} sq.ft**:

---

#### 1. Construction Cost Benchmark
* **Standard Quality Build** (@ ₹2,000/sq.ft):  
  **${formatINR(stdConst)}**
* **Luxury / Premium Build** (@ ₹3,400/sq.ft):  
  **${formatINR(luxConst)}**

---

#### 2. Professional Consultancy Packages
*(Engineering guidance, quality control & stage-by-stage supervision)*
* **Standard Plan (3%)**: ${formatINR(stdConsult)}
* **Premium Plan (6%)**: ${formatINR(premConsult)}
* **Luxury Plan (9%)**: ${formatINR(luxConsult)}

---

#### 3. Architectural Design Fees (Approx.)
* **2D Floor Plan** (@ ₹4/sq.ft): ${formatINR(plan2D)}
* **3D Elevation** (@ ₹15/sq.ft): ${formatINR(plan3D)}
* **Residential Building Approval**: ₹15,000 – ₹20,000 (Govt. fees extra)

---

⚠️ *This is a standard civil engineering approximation. Final costs depend on site conditions, soil type, and custom finishes. For a verified drawing & site inspection, contact **Er. Nirmal** at **+91 83440 51846**.*`;
  }

  // 2. Normal vs Luxury House
  if (q.includes('normal') || q.includes('luxury') || q.includes('difference') || q.includes('compare quality')) {
    return `### 🏠 Normal vs. Luxury House Construction Comparison:

| Feature | Standard / Normal Build | Luxury / Premium Build |
| :--- | :--- | :--- |
| **Cost Benchmark** | **₹1,800 – ₹2,100 / sq.ft** | **₹2,800 – ₹4,000+ / sq.ft** |
| **Structure** | Standard Fe550 TMT & OPC/PPC Cement | Reinforced Seismic-resistant design, tested materials |
| **Flooring** | Premium Vitrified Tiles (₹50-₹80/sq.ft) | Italian Marble, Granite, or Wooden Flooring |
| **Doors & Windows** | Teak main door, flush internal doors, UPVC windows | 100% First-quality Teakwood, premium thermal UPVC |
| **Sanitary & Bath** | Jaguar / Parryware standard fittings | Kohler / Grohe concealed sensor fittings, shower enclosures |
| **Finishing** | Tractor Emulsion interior, weather coat exterior | Royale Luxury Emulsion, texture walls, false ceilings |

💡 *Consultancy fees are added separately depending on your desired supervision package.*`;
  }

  // 3. Building Approval & DTCP
  if (q.includes('dtcp') || q.includes('approval') || q.includes('permit') || q.includes('license') || q.includes('plan approval')) {
    return `### 📋 Building Approval & DTCP Process in Tamil Nadu:

As a **Licensed Civil Engineer & Surveyor in Namakkal**, Er. Nirmal handles end-to-end building and layout approvals.

#### Mandatory Documents Needed:
1. **Registered Sale Deed** / Title Deed
2. **Patta** & Latest **Chitta** in owner's name
3. **FMB Sketch** (Field Measurement Book)
4. **Encumbrance Certificate (EC)** (min. 13 to 30 years)
5. **Site Plan & Proposed Architectural Drawings** (prepared by Er. Nirmal)

#### Fee Structure:
* **Residential Approval Liaison**: ₹15,000 – ₹20,000 *(Govt. charges extra based on square footage)*
* **Commercial Approval**: Quoted based on total built-up area and zone classification.

Want us to verify your land documents? Call or WhatsApp **Er. Nirmal** directly at **+91 83440 51846**.`;
  }

  // 4. Consultation Packages
  if (q.includes('package') || q.includes('plan') || q.includes('consultation') || q.includes('fee') || q.includes('charges')) {
    return `### 💼 Kitchaa's Enterprise Consultation Packages:

Unlike contractors with hidden markups, we work as **independent engineering consultants** to protect your quality and budget:

1. **Standard Plan (3% of Project Value)**:
   * Professional engineering drawings review
   * Technical guidance & contractor clarification
   * *Best for: Experienced owners with trusted contractors.*

2. **Premium Plan (6% of Project Value)**:
   * Weekly scheduled site visits & stage inspections
   * Structural advice & on-site issue resolution
   * Material quality checks
   * *Best for: Owners wanting regular engineer oversight.*

3. **Luxury Plan (9% of Project Value)** ⭐ *Most Popular*:
   * End-to-end site supervision & quality control
   * Every-stage critical inspection (Foundation, Lintels, Slab, Curing)
   * Vetting contractor bills to prevent overcharging
   * *Best for: Stress-free, defect-free construction.*`;
  }

  // 5. Contact & Location
  if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('address') || q.includes('where') || q.includes('location') || q.includes('office') || q.includes('nirmal')) {
    return `### 📞 Contact Er. V. Nirmal, B.E (Civil)

* **Consultancy**: Kitchaa's Enterprise
* **Proprietor**: Er. V. Nirmal, Licensed Civil Engineer
* **Phone / WhatsApp**: [+91 83440 51846](tel:+918344051846)
* **Email**: kitchaasenterprise@gmail.com
* **Location**: Namakkal, Tamil Nadu, India
* **Service Areas**: Namakkal, Salem, Karur, Trichy & surrounding districts
* **Hours**: Monday – Sunday, 9:00 AM – 8:00 PM`;
  }

  // 6. 2BHK / 3BHK / House guidelines
  if (q.includes('2bhk') || q.includes('3bhk') || q.includes('villa') || q.includes('plot size')) {
    return `### 📐 Standard Area Guidelines for Homes:

* **2BHK Residential House**: 800 – 1,200 sq.ft (Approx. construction cost: ₹16L – ₹24L)
* **3BHK Residential House**: 1,300 – 2,000 sq.ft (Approx. construction cost: ₹26L – ₹40L)
* **Luxury Villa / Duplex**: 2,500 – 5,000+ sq.ft
* **Minimum comfortable plot size**: 1,200 sq.ft (30 × 40 ft)

Tell me your expected built-up area (e.g. *1200 sqft*) and I will generate your complete cost breakdown instantly!`;
  }

  // Default fallback
  return `Vanakkam! 🙏 I am Er. Nirmal's Civil Engineering Assistant at **Kitchaa's Enterprise**, Namakkal.

I can immediately assist you with:
1. 📐 **Cost Estimation**: Tell me your built-up area (e.g., *"1500 sqft cost"*).
2. 📋 **Building Approvals & DTCP**: Document checklist and government permit guidelines.
3. 🏠 **Normal vs Luxury House**: Material and price differences.
4. 💼 **Consultation Packages**: 3%, 6%, and 9% supervision options.

What would you like to know, or share your built-up area in sq.ft!`;
}

/**
 * Main chat handler: tries live Gemini API if available, then Netlify function, then local engine
 */
export async function sendChatMessage(messages: { role: string; content: string }[]): Promise<string> {
  const latestMessage = messages[messages.length - 1]?.content || '';
  const geminiApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;

  // 1. Try Gemini API directly from client if valid key exists
  if (geminiApiKey && (geminiApiKey.startsWith('AQ.') || geminiApiKey.startsWith('AIza')) && geminiApiKey.length > 15) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiApiKey}`;
      
      const contents = [
        {
          role: 'user',
          parts: [{ text: `SYSTEM INSTRUCTIONS:\n${SYSTEM_PROMPT}\n\nUSER QUESTION:\n${latestMessage}` }]
        }
      ];

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        // Fallback to flash-lite if needed
        const liteEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${geminiApiKey}`;
        const liteRes = await fetch(liteEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents }),
        });
        if (liteRes.ok) {
          const liteData = await liteRes.json();
          const liteText = liteData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (liteText) return liteText;
        }
      }
    } catch (e) {
      console.warn('Gemini client call failed, checking fallback...', e);
    }
  }

  // 2. Try Netlify Functions if deployed on Netlify
  try {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (res.ok) {
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) return reply;
    }
  } catch (e) {
    // Expected to fail in pure Vite dev without netlify dev
  }

  // 3. Instant, reliable Local Engine Fallback (Guaranteed to always work)
  return getLocalAIResponse(latestMessage);
}

