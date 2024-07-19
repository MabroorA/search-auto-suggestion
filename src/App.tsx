// import './App.css';

import { ChangeEvent, useState } from "react";
import useSectionToggles, { TOGGLE_SECTIONS } from "./use-section-toggles";

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
  const [charectersBeforeSuggest, setCharectersBeforeSuggest] =
    useState<number>(1);

  const {
    isCollectionsOpen,
    isProductsOpen,
    isSuggestionsOpen,
    handleToggleSection,
  } = useSectionToggles();

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

    if (query.length >= charectersBeforeSuggest) {
      fetchSuggestionResults();
    }
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

  const handleCharecterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCharectersBeforeSuggest(Number(e.target.value));
  };
  return (
    <div className="flex flex-col justify-center  mx-auto p-5 w-2/5  max-w-lg">
      {/* Settings */}
      <div className="flex flex-col justify-center py-4 space-y-4 ">
        {/* turn of section */}
        <div className="flex flex-row justify-between space-x-2 bg-white rounded-lg ">
          <div className="text-black font-bold text-lg mb-2">Turn Off</div>
          <div className="flex flex-row space-x-2">
            <button
              className={`border rounded-md ${
                isSuggestionsOpen
                  ? "bg-black text-white"
                  : "bg-red-800 text-white"
              } p-1`}
              onClick={() => handleToggleSection(TOGGLE_SECTIONS.SUGGESTIONS)}
            >
              Suggestions
            </button>
            <button
              className={`border rounded-md ${
                isCollectionsOpen
                  ? "bg-black text-white"
                  : "bg-red-800 text-white"
              } p-1`}
              onClick={() => handleToggleSection(TOGGLE_SECTIONS.COLLECTIONS)}
            >
              Collections
            </button>
            <button
              className={`border rounded-md ${
                isProductsOpen ? "bg-black text-white" : "bg-red-800 text-white"
              } p-1`}
              onClick={() => handleToggleSection(TOGGLE_SECTIONS.PRODUCTS)}
            >
              Products
            </button>
          </div>
        </div>
        {/* Letters before suggestion */}
        <div className="flex flex-row justify-between ">
          <div>Characters needed for suggestion</div>
          <input
            className="rounded-lg border-2"
            type="number"
            value={charectersBeforeSuggest}
            onChange={handleCharecterChange}
          />
        </div>
        <div className="mt-2">
          <span>Current value: </span>
          <span className="font-bold">{charectersBeforeSuggest}</span>
        </div>
      </div>
      {/* Search Section */}
      <div className="flex flex-row items-center justify-between  ">
        <div className="text-black font-bold">Search</div>
        <div className="flex-grow ml-2">
          <input
            className="rounded-lg border-2 w-full p-1"
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Results Section */}
      {query.trim() && dataResult && (
        <div className="border border-gray-300 rounded-lg mt-4">
          {/* Suggestions */}
          {isSuggestionsOpen && (
            <div>
              <div className="flex flex-row justify-between bg-slate-300 text-gray-700 p-2">
                <div className="font-medium w-full">SUGGESTIONS</div>
                <button
                  onClick={() =>
                    handleToggleSection(TOGGLE_SECTIONS.SUGGESTIONS)
                  }
                >
                  Close
                </button>
              </div>
              {suggestionResults.length > 0
                ? suggestionResults.map((suggestion) => (
                    <div
                      key={suggestion.term}
                      className="p-2 mb-2 hover:bg-blue-200 hover:rounded-md"
                    >
                      <a href={suggestion.url} className="text-black-500">
                        {boldQueryInTerm(suggestion.term, query)}
                      </a>
                    </div>
                  ))
                : ""}
            </div>
          )}

          {/* Collections */}
          {isCollectionsOpen && (
            <div>
              <div className="flex flex-row justify-between bg-slate-300 text-gray-700 p-2">
                <div className="font-medium w-full">COLLECTIONS</div>
                <button
                  onClick={() =>
                    handleToggleSection(TOGGLE_SECTIONS.COLLECTIONS)
                  }
                >
                  Close
                </button>
              </div>
              {collectionResults.length > 0
                ? collectionResults.map((collection) => (
                    <div
                      key={collection.id}
                      className="p-2 mb-2 hover:bg-blue-200 hover:rounded-md"
                    >
                      <a href={collection.url} className="text-black-500">
                        {boldQueryInTerm(collection.title, query)}
                      </a>
                    </div>
                  ))
                : ""}
            </div>
          )}
          {/* Products */}
          {isProductsOpen && (
            <div>
              <div className="flex flex-row justify-between bg-slate-300 text-gray-700 p-2">
                <div className="font-medium w-full">PRODUCTS</div>
                <button
                  onClick={() => handleToggleSection(TOGGLE_SECTIONS.PRODUCTS)}
                >
                  Close
                </button>
              </div>
              {productResults.length > 0
                ? productResults.map((product) => (
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
                          <div className="text-lg font-semibold">
                            {product.title}
                          </div>
                          <div>{product.brand}</div>
                          <div className="font-black">£{product.price}</div>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
