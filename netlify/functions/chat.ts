/// <reference types="node" />
import type { Handler } from '@netlify/functions';

const SYSTEM_PROMPT = `You are the official AI assistant for KITCHAA'S ENTERPRISE, a premium civil engineering and construction company based in Namakkal, Tamil Nadu, India.

Owner: Er. V. Nirmal, B.E (Civil)
Tagline: "Sacred Values. Solid Foundations."
Location: Namakkal, Tamil Nadu, India

Services offered:
1. Building Approvals - Help with CMDA/DTCP approvals, government permits and documentation
2. Complete Construction & Consulting - End-to-end construction management and expert consulting
3. Building Plans & Bank Estimates - Detailed architectural plans and valuation reports for bank loans
4. Bank Loan Assistance & Finance - Guidance and support through the home loan process

Your behavior:
- Be professional, warm, and helpful
- Answer questions about construction, civil engineering, building approvals in Tamil Nadu
- Guide users to the right service based on their need
- If a user asks for contact details, provide the exact real contact info: Phone/WhatsApp: +91 83440 51846 | Email: kitchaasenterprise@gmail.com
- Do NOT make up or hallucinate random phone numbers or emails.
- For specific quotes or site visits, ask for their name and phone number and say the team will contact them
- Keep responses concise (2-4 sentences max)
- Never use emojis
- If asked something outside civil engineering or this company, politely redirect
- Always end with a helpful follow-up question or next step`;

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body || '{}');
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('Missing OPENROUTER_API_KEY');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'AI Service configuration error.' }),
      };
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://kitchaasenterprise.com', // Optional but good for OpenRouter
        'X-Title': "Kitchaa's Enterprise Assistant",
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku', // Using a fast, cost-effective model for the web
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: 400,
      }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to connect to AI service.' }),
    };
  }
};
