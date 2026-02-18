import React, { useState } from "react";
import axios from "axios";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!word.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // ✅ Using Datamuse API - Completely FREE, no API key needed!
      const [definitionsRes, relatedRes] = await Promise.all([
        // Get word definitions
        axios.get(`https://api.datamuse.com/words?sp=${word.toLowerCase()}&md=dpr&max=1`, {
          withCredentials: false
        }),
        // Get related words (synonyms, similar meaning)
        axios.get(`https://api.datamuse.com/words?ml=${word.toLowerCase()}&max=10`, {
          withCredentials: false
        })
      ]);

      if (definitionsRes.data.length > 0) {
        const wordData = definitionsRes.data[0];
        setResult({
          word: wordData.word,
          definitions: wordData.defs || [],
          pronunciation: wordData.tags?.find(t => t.startsWith("pron:"))?.replace("pron:", "") || null,
          synonyms: relatedRes.data.map(w => w.word).slice(0, 10)
        });
      } else {
        setError("Word not found. Try another one.");
      }
    } catch (err) {
      console.error("Error fetching word:", err);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Parse definition string (format: "pos\tdefinition")
  const parseDefinition = (defString) => {
    if (!defString) return { partOfSpeech: "", definition: "" };
    const parts = defString.split("\t");
    return {
      partOfSpeech: parts[0] || "",
      definition: parts[1] || defString
    };
  };

  return (
    <div style={{ minHeight: 350, maxHeight: 550, overflowY: "auto", overflowX: "hidden" }}>
      <h2 className="text-2xl font-bold mb-4 text-center">Dictionary App</h2>

      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          className="flex-1 p-3 rounded-l-lg text-black focus:outline-none border-2 border-[#0C6F89]"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#0C6F89] text-white px-6 py-3 rounded-r-lg hover:bg-[#0a5a6e] font-semibold"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {result && (
        <div>
          <h3 className="text-3xl font-bold mb-2 capitalize">{result.word}</h3>
          
          {result.pronunciation && (
            <p className="text-gray-400 mb-4">
              Pronunciation: {result.pronunciation}
            </p>
          )}

          {/* Definitions */}
          {result.definitions && result.definitions.length > 0 ? (
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-[#0C6F89] mb-2">Definitions</h4>
              {result.definitions.map((def, i) => {
                const parsed = parseDefinition(def);
                return (
                  <div key={i} className="ml-4 mb-3 border-b border-gray-700 pb-2">
                    {parsed.partOfSpeech && (
                      <span className="text-sm font-semibold text-gray-300 italic">
                        ({parsed.partOfSpeech})
                      </span>
                    )}
                    <p className="mt-1">• {parsed.definition}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-4">
              Full definition not available. Showing related words below.
            </p>
          )}

          {/* Synonyms / Related Words */}
          {result.synonyms && result.synonyms.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-[#0C6F89] mb-2">
                Similar Words & Synonyms
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.synonyms.map((syn, i) => (
                  <span
                    key={i}
                    className="bg-[#0C6F89] text-white px-3 py-1 rounded-full text-sm"
                  >
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}