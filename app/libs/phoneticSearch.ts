// lib/phoneticSearch.ts

// Simple synonym map — expand as needed
const synonymMap: Record<string, string[]> = {
  novel: ["book", "story", "tale"],
  car: ["automobile", "vehicle", "ride"],
  journey: ["trip", "voyage", "expedition"],
  // Add more as needed
};

function phoneticEncode(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z]/g, "") // remove non-letters
    .replace(/[aeiouhwy]/g, "") // remove vowels & soft letters
    .replace(/b/g, "1")
    .replace(/f/g, "1")
    .replace(/p/g, "1")
    .replace(/v/g, "1")
    .replace(/c/g, "2")
    .replace(/g/g, "2")
    .replace(/j/g, "2")
    .replace(/k/g, "2")
    .replace(/q/g, "2")
    .replace(/s/g, "2")
    .replace(/x/g, "2")
    .replace(/z/g, "2")
    .replace(/d/g, "3")
    .replace(/t/g, "3")
    .replace(/l/g, "4")
    .replace(/m/g, "5")
    .replace(/n/g, "5")
    .replace(/r/g, "6")
    .slice(0, 6); // Limit to first few chars
}

// Get all synonyms for a word including the word itself
function getSynonymsWithSelf(word: string): string[] {
  const lowerWord = word.toLowerCase();

  const synonyms = synonymMap[lowerWord] || [];

  return [lowerWord, ...synonyms];
}

export function searchBooksByPhonetics(
  query: string,
  books: string[]
): string[] {
  const queryVariants = getSynonymsWithSelf(query);
  const encodedVariants = queryVariants.map(phoneticEncode);

  return books.filter((book) => {
    const bookWords = book.split(/\s+/); // break into words

    const encodedBookWords = bookWords.map(phoneticEncode);
    return encodedBookWords.some((wordCode) =>
      encodedVariants.includes(wordCode)
    );
  });
}
