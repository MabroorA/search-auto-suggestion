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
  const [suggestionResults, setSuggestionResults] = useState<SuggestionTerm[]>(
    []
  );
  const [collectionResults, setCollectionResults] = useState<Collection[]>([]);
  const [productResults, setProductResults] = useState<Product[]>([]);

  const fetchSuggestionResults = async () => {
    try {
      const mockDataUrl = `/mockdata.json`;
      const res = await fetch(mockDataUrl);
      console.log(res);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Data = await res.json();

      setDataResult(data);
      console.log(data);
      await handleDataresults(data);
    } catch (error) {
      console.error("Error Fetching Suggestion Results", error);
    }
  };
  const handleDataresults = async (data: Data) => {
    try {
      // filter suggestions with query only
      const filteredSuggestions = data.suggestion_terms
        .filter((suggestion) =>
          suggestion.term.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      // filter collection
      const filteredCollections = data.collections
        .filter((collection) =>
          collection.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 2);
      // filter Products
      const filteredProducts = data.products
        .filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSuggestionResults(filteredSuggestions);
      setCollectionResults(filteredCollections);
      setProductResults(filteredProducts);
      console.log(suggestionResults);
    } catch (error) {
      console.error("Error Handling Mock Data Results", error);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const query = e.target.value;
    setQuery(query);
    fetchSuggestionResults();
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
    <div className="flex flex-col justify-center items-center mx-auto p-5 w-2/5">
      {/* Search Section */}
      <div className="flex flex-row justify-center items-center space-x-2">
        <div className="text-black font-bold">Search</div>
        <div>
          <input className="rounded-lg border-2" onChange={handleInputChange} />
        </div>
      </div>

      {/* Results Section */}
      {query.trim() && dataResult && (
        <div className="border border-gray-300 rounded-lg mt-4">
          {/* Suggestions */}
          <div className="flex flex-row justify-between bg-slate-300 text-gray-700 p-2">
            <div className="font-medium w-full">SUGGESTIONS</div>
            <div>close</div>
          </div>
          {suggestionResults.map((suggestion) => (
            <div
              key={suggestion.term}
              className="p-2 mb-2 hover:bg-blue-200 hover:rounded-md"
            >
              <a href={suggestion.url} className="text-black-500">
                {boldQueryInTerm(suggestion.term, query)}
              </a>
            </div>
          ))}

          {/* Collections */}
          <div className="flex flex-row justify-between bg-slate-300 text-gray-700 p-2">
            <div className="font-medium w-full">COLLECTIONS</div>
            <div>close</div>
          </div>
          {collectionResults.map((collection) => (
            <div
              key={collection.id}
              className="p-2 mb-2 hover:bg-blue-200 hover:rounded-md"
            >
              <a href={collection.url} className="text-black-500">
                {boldQueryInTerm(collection.title, query)}
              </a>
            </div>
          ))}

          {/* Products */}
          <div className="flex flex-row justify-between bg-slate-300 text-gray-700 p-2">
            <div className="font-medium w-full">PRODUCTS</div>
            <div>close</div>
          </div>
          {productResults.map((product) => (
            <div
              key={product.id}
              className="p-2 mb-2 hover:bg-blue-200 hover:rounded-md"
            >
              <div className="flex flex-row justify-start w-full">
                <div className="w-1/4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="text-black-500"
                  />
                </div>
                <div className="flex flex-col ml-2">
                  <div className="text-lg font-semibold">{product.title}</div>
                  <div>{product.brand}</div>
                  <div className="font-black">£{product.price}</div>
                </div>
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
//  Add Filter feature for limit 
