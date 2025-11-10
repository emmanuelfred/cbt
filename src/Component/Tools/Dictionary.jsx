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
      const res = await axios.get(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
        )}`
      );

      const data = JSON.parse(JSON.stringify(res.data));
      if (Array.isArray(data) && data.length > 0) {
        setResult(data[0]);
      } else {
        setError("No definitions found for this word.");
      }
    } catch (err) {
      console.error("Error fetching word:", err);
      if (err.response && err.response.status === 404) {
        setError("Word not found. Try another one.");
      } else {
        setError("An error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="" style={{minHeight:350,maxHeight:550, overflowX:'hidden'}}>
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
          className="bg-[#0C6F89] text-white px-6 py-3 rounded-r-lg hover:bg-[#0C6F89]-600 font-semibold"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {result && (
        <div>
          <h3 className="text-3xl font-bold mb-2 capitalize">{result.word}</h3>
          {result.phonetic && (
            <p className="text-gray-400 mb-4">Phonetic: {result.phonetic}</p>
          )}

          {result.meanings?.map((meaning, i) => (
            <div key={i} className="mb-4">
              <h4 className="text-lg font-semibold text-[#0C6F89]">
                {meaning.partOfSpeech}
              </h4>
              {meaning.definitions.map((def, j) => (
                <div key={j} className="ml-4 mb-2">
                  <p>• {def.definition}</p>
                  {def.example && (
                    <p className="text-gray-400 italic">
                      Example: {def.example}
                    </p>
                  )}
                  {def.synonyms?.length > 0 && (
                    <p className="text-gray-300">
                      <span className="font-semibold">Synonyms:</span>{" "}
                      {def.synonyms.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}

          {result.phonetics?.[0]?.audio && (
            <audio controls className="mt-4">
              <source src={result.phonetics[0].audio} type="audio/mp3" />
            </audio>
          )}
        </div>
      )}
    </div>
  );
}
