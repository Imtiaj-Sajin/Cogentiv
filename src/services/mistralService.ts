
import axios from 'axios';

const API_KEY = "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";
const MODEL = "mistralai/Mistral-7B-Instruct-v0.3";

export const getMistralResponse = async (query: string) => {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        inputs: query
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching from Mistral:", error);
    throw error;
  }
};
