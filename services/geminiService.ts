
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, BRAND } from "../constants";

export async function getChatResponse(history: { role: 'user' | 'model', text: string }[], userMessage: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const productContext = JSON.stringify(PRODUCTS.map(p => ({
      name: p.name,
      category: p.category,
      price: `£${p.price}`,
      desc: p.description
    })));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are ${BRAND.name} AI Sales Assistant. ${BRAND.name} is a premium UK-based electronics and home appliance retailer. 
          Use British English. Prices are in GBP (£).
          Product Catalog: ${productContext}
          Always be polite, helpful, and try to suggest specific products from the catalog if relevant.
          Keep answers concise and professional.
          If the user needs human help, direct them to our support line at ${BRAND.supportPhone}.`,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `I'm having a bit of trouble connecting to my brain right now. Please try again or contact our UK support team directly at ${BRAND.supportPhone}.`;
  }
}
