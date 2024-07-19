// import './App.css';

import { ChangeEvent, useEffect, useState } from "react";
import useSectionToggles from "./use-section-toggles";
import {
  Collection,
  Data,
  Product,
  SuggestionTerm,
  TOGGLE_SECTIONS,
} from "./types";

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

  useEffect(() => {
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
        handleDataresults();
      } catch (error) {
        console.error("Error Fetching Suggestion Results", error);
      }
    };
    fetchSuggestionResults();

  },[])

  // if query ,dataresult or charecters before suggest are changed,rest of the suggestion data is reset. 
  useEffect(() => {
    if (dataResult && query.length >= charectersBeforeSuggest) {
      // if data result is avalible and query length meets the charectersBeforeSuggest or higher than data is fetched
      handleDataresults();
    } else {
      setSuggestionResults([]);
      setCollectionResults([]);
      setProductResults([]);
    }
  }, [query, dataResult, charectersBeforeSuggest]);
  
  const handleDataresults =  () => {
    try {
      if (!dataResult) return;
      // filter suggestions with query only
      const filteredSuggestions = dataResult.suggestion_terms
        .filter((suggestion) =>
          suggestion.term.toLowerCase().includes(query.toLowerCase())
        )
      // filter collection
      const filteredCollections = dataResult.collections
        .filter((collection) =>
          collection.title.toLowerCase().includes(query.toLowerCase())
        )
      // filter Products
      const filteredProducts = dataResult.products
        .filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      setSuggestionResults(filteredSuggestions);
      setCollectionResults(filteredCollections);
      setProductResults(filteredProducts);
      console.log(suggestionResults);
    } catch (error) {
      console.error("Error Handling Mock Data Results", error);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
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
    <div className="flex flex-col justify-center  mx-auto p-5  max-w-lg ">
      {/* Settings */}
      <div className="flex flex-col justify-center py-4 space-y-4 border border-gray-700 rounded-lg p-2">
        {/* turn of section */}
        <div className="flex flex-col  space-y-2 bg-white rounded-lg ">
          <div className="text-black font-bold text-lg mb-2">
            Control Settings
          </div>
          <div className="flex flex-col md:flex-row justify-start md:space-x-2 ">
            <button
              className={`border rounded-md ${
                isSuggestionsOpen ? "bg-green-500 " : "bg-red-500  "
              } py-2 px-4 `}
              onClick={() => handleToggleSection(TOGGLE_SECTIONS.SUGGESTIONS)}
            >
              Suggestions
            </button>
            <button
              className={`border rounded-md ${
                isCollectionsOpen ? "bg-green-500 " : "bg-red-500 "
              } py-2 px-4`}
              onClick={() => handleToggleSection(TOGGLE_SECTIONS.COLLECTIONS)}
            >
              Collections
            </button>
            <button
              className={`border rounded-md ${
                isProductsOpen ? "bg-green-500 " : "bg-red-500 "
              } py-2 px-4`}
              onClick={() => handleToggleSection(TOGGLE_SECTIONS.PRODUCTS)}
            >
              Products
            </button>
          </div>
        </div>
        {/* Letters before suggestion */}
        <div className="flex flex-col ">
          <div className="flex flex-row justify-between">
            <div className="py-2">Characters needed for suggestion</div>
            <div className="mt-2">
              <span>Current value: </span>
              <span className="font-bold">{charectersBeforeSuggest}</span>
            </div>
          </div>

          <input
            className="rounded-lg border-2 py-1 px-2 "
            type="number"
            value={charectersBeforeSuggest}
            onChange={handleCharecterChange}
          />
        </div>
      </div>
      {/* Search Section */}
      <div className="flex flex-row items-center justify-between mt-8  ">
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
