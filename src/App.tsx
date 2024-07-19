// import './App.css';

import { ChangeEvent, useState } from "react";

interface SuggestionTerm {
  term: string;
  url: string;
}

interface Collection {
  id: string;
  title: string;
  url: string;
}

interface Product {
  id: string;
  title: string;
  url: string;
  brand: string;
  price: number;
  image: string;
}

interface Data {
  suggestion_terms: SuggestionTerm[];
  collections: Collection[];
  products: Product[];
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [dataResult, setDataResult] = useState<Data | null>(null);
  const [suggestionResults, setSuggestionResults] = useState<SuggestionTerm[]>([]);
  const [collectionResults, setCollectionResults] = useState<Collection[]>([]);
  const [productResults, setProductResults] = useState<Product[]>([]);
  

  const fetchSuggestionResults = async (query: string) => {
    try {
      const mockDataUrl = `/mockdata.json`;
      const res = await fetch(mockDataUrl);
      console.log(res);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Data = await res.json();
      
      setDataResult(data);
      console.log(data)
      // const suggestionsResult: SuggestionTerm[] = await res.json()
      setSuggestionResults(data.suggestion_terms);
      setCollectionResults(data.collections);
      setProductResults(data.products);
      console.log(suggestionResults)
    } catch (error) {
      console.error("Error Fetching Suggestion Results", error);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const query = e.target.value;
    setQuery(query);
    fetchSuggestionResults(query);
  };

  const boldQueryInTerm = (term: string, query: string) => {
    if (!query.trim()) return term;

    // Split where query matches bold
    const parts = term.split(new RegExp(`(${query})`, "gi"));

    return parts.map((part, index) =>
      new RegExp(query, "i").test(part) ? (
        <strong key={index} className="font-bold">
          {part}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };
  // const handleCloseSuggestionterm = {
  //   // To be implemented
  // }
  return (
    <div className="  flex flex-col justify-center align-middle p-5  ">
      {/* Search Section */}
      <div className="flex flex-row justify-center align-middle space-x-2">
        <div className="text-black font-bold">Search</div>
        <input className="rounded-lg border-2" onChange={handleInputChange} />
      </div>

      {/* Results Section  */}
      {query.trim() && suggestionResults.length > 0 && (
        <div className="border border-gray-300 rounded-lg mt-4 ">
          <div className="flex flex-row justify-between bg-slate-300 text-gray-700 p-2">
            <div className=" font-medium  w-full">SUGGESTIONS</div>
            <div className="">close</div>
          </div>
          {suggestionResults.map((suggestion) => (
            <div className="p-2">
              <div
                key={suggestion.term}
                className="mb-2 hover:bg-blue-200 hover:rounded-md"
              >
                <a href={suggestion.url} className="text-black-500 ">
                  {boldQueryInTerm(suggestion.term, query)}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

// Suggestion result
//  three blocks: Suggestion term, Collection and Product.
