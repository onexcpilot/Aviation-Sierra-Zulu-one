import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question, Category } from '../types';

// Initialize the client with the API key from the environment.
// Per guidelines, we assume process.env.API_KEY is pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const explainAnswerWithAI = async (question: string, correctOption: string, userOption: string): Promise<string> => {
    try {
        const prompt = `
        Jesteś instruktorem szybownictwa. Uczeń odpowiedział źle na pytanie egzaminacyjne.
        Pytanie: "${question}"
        Poprawna odpowiedź: "${correctOption}"
        Odpowiedź ucznia: "${userOption}"
        
        Wyjaśnij krótko (max 3 zdania), dlaczego odpowiedź ucznia jest błędna i dlaczego poprawna jest właściwa. Używaj fachowego języka lotniczego.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text || "Nie udało się wygenerować wyjaśnienia.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "System AI chwilowo niedostępny.";
    }
};

export const generateNewQuestionAI = async (category: Category): Promise<Question | null> => {
    try {
        const schema: Schema = {
            type: Type.OBJECT,
            properties: {
                text: { type: Type.STRING, description: "Treść pytania egzaminacyjnego SPL" },
                options: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "Lista 4 możliwych odpowiedzi"
                },
                correctAnswerIndex: { type: Type.INTEGER, description: "Indeks poprawnej odpowiedzi (0-3)" }
            },
            required: ["text", "options", "correctAnswerIndex"]
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Wygeneruj trudne pytanie egzaminacyjne na licencję szybowcową (SPL) z kategorii: ${category}. Pytanie musi być zgodne z wymaganiami EASA/ULC.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });

        const jsonText = response.text;
        if (!jsonText) return null;

        const data = JSON.parse(jsonText);
        
        return {
            id: `GEN-${Date.now()}`,
            category: category,
            text: data.text,
            options: data.options,
            correctAnswerIndex: data.correctAnswerIndex
        };

    } catch (error) {
        console.error("Gemini Generation Error:", error);
        return null;
    }
};