
import { GoogleGenAI } from "@google/genai";
import { TransformationConfig } from "../types";

export const transformImage = async (
  base64Image: string,
  mimeType: string,
  config: TransformationConfig
): Promise<string> => {
  // Inicialização limpa conforme as diretrizes
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const cleanedBase64 = base64Image.split(',')[1] || base64Image;

  const prompt = `
    Transform this casual photo into a professional high-end LinkedIn profile portrait.
    
    IDENTITY: Maintain the exact facial features, bone structure, and identity of the person.
    ATTIRE: Change clothing to ${config.style}.
    ENVIRONMENT: Change background to a ${config.background}.
    QUALITY: High-resolution, professional studio lighting, sharp focus on eyes, blurred background (bokeh effect).
    TOUCH-UP: ${config.enhanceLighting ? 'Apply studio lighting.' : ''} ${config.cleanSkin ? 'Subtle skin retouching.' : ''}
    USER REQUEST: ${config.userPrompt || 'N/A'}
    
    OUTPUT: Return ONLY the final transformed image. No text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanedBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      throw new Error("A IA não gerou uma resposta válida. Tente uma foto mais clara.");
    }

    const imagePart = candidate.content.parts.find(part => part.inlineData);
    
    if (imagePart?.inlineData?.data) {
      return `data:image/png;base64,${imagePart.inlineData.data}`;
    } else {
      throw new Error("A API não retornou os dados da imagem. Verifique sua conexão.");
    }
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("429")) throw new Error("Muitas solicitações. Aguarde um momento.");
    throw error;
  }
};
