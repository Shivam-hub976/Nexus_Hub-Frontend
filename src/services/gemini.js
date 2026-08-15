import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_KEY;

// Initialize the Gemini SDK
const genAI = new GoogleGenerativeAI(apiKey);

export const getMovieByMood = async (moodQuery) => {
  if (!apiKey) {
    throw new Error("Gemini API key is missing from environment variables.");
  }

  try {
    // gemini-2.5-flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Strict Prompt Engineering
    const prompt = `Suggest ONE movie based on this mood: "${moodQuery}". Return ONLY the movie title as a plaintext string. Do not include quotes, years, punctuation, or any conversational text.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    
    // Sanitize the output to ensure it is just a clean string for OMDB to search
    const cleanMovieTitle = response.text().replace(/["'\n]/g, "").trim();
    
    return cleanMovieTitle;
  } catch (error) {
    console.error("Error with Gemini AI integration:", error);
    throw new Error("Failed to generate an AI recommendation. Please try again.");
  }
};