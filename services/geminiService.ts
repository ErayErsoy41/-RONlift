import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCoachingAdvice = async (
  query: string, 
  userStats: string
): Promise<string> => {
  try {
    const modelId = "gemini-2.5-flash"; // Using flash for speed, supports search
    const systemInstruction = `You are an elite Powerlifting Coach with expertise in biomechanics, periodization (DUP, Block, Linear), and strength psychology. 
    
    YOUR GOALS:
    1. Provide concise, actionable advice tailored to the user's stats.
    2. If asked for a program, generate a structured Weekly Plan (Day 1, Day 2, etc.) based on their level.
    3. ALWAYS prioritize safety.
    4. You have access to Google Search. USE IT to find scientific backing or specific articles when giving advice.
    
    FORMATTING:
    - Use Markdown.
    - Keep responses encouraging but professional.
    - If you used Search, the sources will be appended automatically, but you can reference them in text like "According to recent studies...".`;

    const prompt = `User Stats: ${userStats}\n\nUser Question: ${query}`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }], // Enable Search for sources
      }
    });

    let finalText = response.text || "I couldn't generate advice at the moment. Train hard!";

    // Handle Grounding (Sources)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks && groundingChunks.length > 0) {
      finalText += "\n\n**Sources:**\n";
      groundingChunks.forEach((chunk: any, index: number) => {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          finalText += `- [${chunk.web.title}](${chunk.web.uri})\n`;
        }
      });
    }

    return finalText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Network error. Please try asking your coach again later.";
  }
};