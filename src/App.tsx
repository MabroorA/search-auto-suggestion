// import './App.css';

import { ChangeEvent, useState } from "react";

type Suggestions = {
  term: string;
  url: string;
};

function App() {
  const [suggestionsResult, setSuggestionsResult] = useState<Suggestions[]>(
    []
  );

  const fetchSuggestionResults = async (query: string) => {
    try {
      const mockDataUrl = `https://66999d7d2069c438cd72b848.mockapi.io/suggestionTerm?search=${query}`;
      const res = await fetch(mockDataUrl, { method: "get", mode:"cors" });
      console.log(res)
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Suggestions[]= await res.json();
      setSuggestionsResult(data);
    } catch (error) {
      console.error("Error Fetching Suggestion Results", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const query = e.target.value;
    fetchSuggestionResults(query);
  };
  return (
    <div className="  flex flex-col justify-center align-middle p-5  ">
      {/* Search Section */}
      <div className="flex flex-row align-middle space-x-2">
        <div className="text-black font-bold">Search</div>
        <input className="rounded-lg border-2" onChange={handleInputChange} />
      </div>
      <div className="border-2 border-black rounded-lg">
      {suggestionsResult.map((suggestion) => (
        <div key={suggestion.term}>
          <a href={suggestion.url}>{suggestion.term}</a>
        </div>
      ))}
      </div>
      
    </div>
  );
}

export default App;

// Suggestion result
//  three blocks: Suggestion term, Collection and Product.
