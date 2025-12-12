import axios from "axios";

// No API Key here anymore! 
// It points to your own Vercel route
export const getGeminiResponse = async (query: string) => {
  try {
    const response = await axios.post(
      '/api/chat', 
      { query }, // We send just the query, the backend handles the rest
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching from Proxy:", error);
    throw error;
  }
};