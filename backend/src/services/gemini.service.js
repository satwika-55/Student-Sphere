import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generateAnswer = async (
  question,
  verses
) => {

  const context = verses
    .map(
      (v) =>
        `Chapter ${v.chapter_number}
Verse ${v.verse_number}
${v.text}`
    )
    .join("\n\n");

  const prompt = `
You are GitaGPT.

Answer ONLY using the provided Bhagavad Gita verses.

Context:

${context}

Question:

${question}
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
};