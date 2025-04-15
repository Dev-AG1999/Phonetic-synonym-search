"use client";

import { useState } from "react";
import { fetcher } from "../../libs/apIData/api-calls";
import { useRouter } from "next/navigation";

export default function AddBookForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setMessage("Please enter a book title.");

    try {
      setLoading(true);
      setMessage("");
      const res = await fetcher("/api/addbooks", {
        method: "POST",
        body: { title },
      });

      if (res.status === 200 && res.success) {
        router.replace("/search-book");
        setMessage(`✅ Book added: ${res.data.book.title}`);
        setTitle("");
      }
    } catch (error: any) {
      setMessage(error.message || "❌ Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddBook} className="space-y-4 p-4 max-w-md mx-auto">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter book title"
        className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        {loading ? "Adding..." : "Add Book"}
      </button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}
