import gitaData from "../data/gita.json" assert { type: "json" };

export const retrieveRelevantVerses = (query) => {
  const queryWords = query.toLowerCase().split(" ");

  const scoredVerses = gitaData.map((verse) => {
    const verseText = verse.text.toLowerCase();

    let score = 0;

    queryWords.forEach((word) => {
      if (verseText.includes(word)) {
        score++;
      }
    });

    return {
      ...verse,
      score,
    };
  });

  return scoredVerses
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};