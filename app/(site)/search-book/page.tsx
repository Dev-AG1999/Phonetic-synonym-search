"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetcher } from "../../libs/apIData/api-calls";
import { searchBooksByPhonetics } from "../../libs/phoneticSearch";

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [bookList, setBookList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from API on mount
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetcher("/api/booklist");
        if (res.status === 200 && res.success) {
          setBookList(res.data.map((b) => b.title));
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  // Search on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      const matched = searchBooksByPhonetics(val, bookList);

      setResults(matched);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 space-y-4 px-4">
      <h1 className="text-3xl font-bold text-center">
        📚 Phonetic Book Search
      </h1>
      <input
        placeholder="Search for a book..."
        value={query}
        onChange={handleChange}
        className="text-lg p-6 shadow-xl rounded-2xl w-full"
      />

      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading books...</p>
      ) : (
        <div className="space-y-2">
          {results.map((book, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-4">{book}</CardContent>
              </Card>
            </motion.div>
          ))}

          {query && results.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No phonetic or synonym match 😞
            </p>
          )}
        </div>
      )}
    </div>
  );
}
