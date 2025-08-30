import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY
})

const geminiText = async (prompt) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    })
    const res = response.text;
    return res
}
const geminiImage = async (prompt) => {
    const response = await ai.models.generateImages({
        model: "gemini-2.5-flash",
        contents: prompt
    })
    const res = response.text;
    console.log('res in gemini func: ', res)
    return res
}

export { geminiText, geminiImage }