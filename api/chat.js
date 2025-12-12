export default async function handler(request, response) {
  // 1. Check for POST method
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = request.body;
  const API_KEY = process.env.GEMINI_API_KEY; // Securely load key from server env
  const MODEL = "gemini-2.5-flash-lite";

  if (!API_KEY) {
    return response.status(500).json({ error: 'Server API Key not configured' });
  }

  try {
    // 2. Call Google Gemini from the Server (Hidden from client)
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }]
        })
      }
    );

    const data = await geminiResponse.json();

    // 3. Send result back to frontend
    return response.status(200).json(data);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return response.status(500).json({ error: 'Failed to fetch response' });
  }
}