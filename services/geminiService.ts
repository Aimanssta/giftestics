import { GoogleGenAI, Type } from "@google/genai";
import { GiftIdea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGiftIdeas = async (
  recipient: string,
  occasion: string,
  interests: string,
  budget: string
): Promise<GiftIdea[]> => {
  const prompt = `Create 4 specific custom gift package ideas for a ${recipient} for ${occasion}. 
  The gifts MUST be available to buy in Lahore, Pakistan.
  The package should ONLY consist of items from these categories: Flowers (Bouquets), Accessories (Jewelry, Watches, Handbags), or Skincare.
  DO NOT include food, sweets, or mithai.
  The user is interested in: ${interests}. 
  The budget is roughly ${budget}.
  Return the result as a JSON array of objects with keys: productName (name of the package), reason (what's inside and why), estimatedPrice (in PKR).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              productName: { type: Type.STRING },
              reason: { type: Type.STRING },
              estimatedPrice: { type: Type.STRING }
            },
            propertyOrdering: ["productName", "reason", "estimatedPrice"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    // Ensure we parse clean JSON
    return JSON.parse(text) as GiftIdea[];
  } catch (error) {
    console.error("Error generating gift ideas:", error);
    return [];
  }
};

export const generateMessage = async (
  recipientName: string,
  occasion: string,
  tone: string
): Promise<string> => {
    const prompt = `Write a short, ${tone} message for ${recipientName} on the occasion of ${occasion}. Keep it under 50 words.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text || "Could not generate message.";
    } catch (error) {
        console.error("Error generating message:", error);
        return "An error occurred while generating the message.";
    }
};