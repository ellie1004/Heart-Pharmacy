
import { GoogleGenAI, Type } from "@google/genai";
import { Prescription, UserInput } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export async function generatePrescription(input: UserInput): Promise<Prescription> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const rules = [
    { keywords: ['죽음', '자살', '외로움', '외톨이'], label: '깊은 슬픔' },
    { keywords: ['위로', '일상', '평온'], label: '위로와 일상' },
    { keywords: ['용기', '도전', '자신감'], label: '용기' },
    { keywords: ['지치고', '힘들', '번아웃', '휴식'], label: '지치고 힘들 때' }
  ];

  const matchedRule = rules.find(r => r.keywords.some(k => input.content.includes(k)));
  const promptSuffix = matchedRule ? `\n(참고: 이 고민은 '${matchedRule.label}' 특별 처방 규칙 대상입니다. 지정된 음악 링크를 우선적으로 사용해 주세요.)` : "";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `닉네임: ${input.nickname}, 고민 내용: ${input.content}${promptSuffix}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          empathy: { type: Type.STRING },
          nvcScript: {
            type: Type.OBJECT,
            properties: {
              observation: { type: Type.STRING },
              feeling: { type: Type.STRING },
              need: { type: Type.STRING },
              request: { type: Type.STRING },
              fullMessage: { type: Type.STRING }
            },
            required: ["observation", "feeling", "need", "request", "fullMessage"]
          },
          vitaminQuote: { type: Type.STRING },
          musicPrescription: { type: Type.STRING },
          musicYoutubeUrl: { type: Type.STRING }
        },
        required: ["empathy", "nvcScript", "vitaminQuote", "musicPrescription", "musicYoutubeUrl"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || "{}");
    return data as Prescription;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("처방전을 작성하는 중에 문제가 생겼어요. 다시 한 번 말씀해 주시겠어요?");
  }
}
