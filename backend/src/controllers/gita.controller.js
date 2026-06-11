import { retrieveRelevantVerses } from "../services/retriever.service.js";
import { generateAnswer } from "../services/gemini.service.js";

export const chatWithGitaGPT = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const verses = retrieveRelevantVerses(question);

    const answer = await generateAnswer(
      question,
      verses
    );

    return res.status(200).json({
      success: true,
      answer,
      references: verses.map((v) => ({
        chapter: v.chapter_number,
        verse: v.verse_number,
      })),
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};