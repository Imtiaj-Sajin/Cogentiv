import axios from "axios";

const API_KEY = "AIzaSyDpZf7SS7UFLDL-2Hqc2QJdoOpCHP_fRD4"; 
const MODEL = "gemini-2.5-flash-lite";

export const getGeminiResponse = async (query: string) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: query }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    throw error;
  }
};
