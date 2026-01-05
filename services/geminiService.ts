import { GoogleGenAI, Type } from "@google/genai";
import { Unit, LessonStatus } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStudyPlan = async (goal: string): Promise<Unit[]> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    O usuário tem o seguinte objetivo de vida ou aprendizado: "${goal}".
    Crie um plano de ação gamificado dividido em 3 "Unidades" (Units).
    Cada unidade deve representar uma fase de progresso.
    Cada unidade deve conter exatamente 4 a 6 "Lições" (Lessons) que são tarefas práticas e acionáveis.
    
    A primeira lição da primeira unidade deve ser muito fácil para começar.
    Use emojis para os ícones das lições.
    
    Retorne APENAS o JSON seguindo o esquema solicitado.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              color: { type: Type.STRING, description: "Color name like 'green', 'blue', 'purple', 'rose', 'yellow'" },
              lessons: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    icon: { type: Type.STRING },
                    xp: { type: Type.INTEGER },
                  },
                  required: ["id", "title", "description", "icon", "xp"]
                }
              }
            },
            required: ["id", "title", "description", "color", "lessons"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      
      // Post-processing to set initial statuses
      // The first lesson of the first unit is ACTIVE, rest are LOCKED
      return data.map((unit: any, uIndex: number) => ({
        ...unit,
        lessons: unit.lessons.map((lesson: any, lIndex: number) => ({
          ...lesson,
          status: uIndex === 0 && lIndex === 0 ? LessonStatus.ACTIVE : LessonStatus.LOCKED
        }))
      }));
    }
    return [];
  } catch (error) {
    console.error("Error generating plan:", error);
    throw new Error("Falha ao criar o plano de metas.");
  }
};

export const getMotivations = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Dê uma frase curta, motivacional e engraçada estilo Duolingo (mas amigável) para alguém que acabou de completar uma tarefa difícil."
        });
        return response.text || "Bom trabalho!";
    } catch (e) {
        return "Continue assim!";
    }
}