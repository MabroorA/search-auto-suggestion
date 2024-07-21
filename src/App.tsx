import { ChangeEvent, useState } from "react";
import useSectionToggles from "./use-section-toggles";
import { TOGGLE_SECTIONS } from "./types";
import useSearch from "./use-search";

function App() {
  const [query, setQuery] = useState<string>("");
  const [charectersBeforeSuggest, setCharectersBeforeSuggest] =
    useState<number>(1);

  const {
    isCollectionsOpen,
    isProductsOpen,
    isSuggestionsOpen,
    handleToggleSection,
  } = useSectionToggles();

  const { suggestionResults, collectionResults, productResults, dataResult } =
    useSearch({ input: query, url: "/mockdata.json", charectersBeforeSuggest:charectersBeforeSuggest });

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
    <div className="flex flex-col justify-center max-w-lg p-5 mx-auto ">
      {/* Settings */}
      <div className="flex flex-col justify-center p-2 py-4 space-y-4 border border-gray-700 rounded-lg">
        {/* turn of section */}
        <div className="flex flex-col space-y-2 bg-white rounded-lg ">
          <div className="mb-2 text-lg font-bold text-black">
            Control Settings
          </div>
          <div className="flex flex-col justify-start md:flex-row md:space-x-2 ">
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
            className="px-2 py-1 border-2 rounded-lg "
            type="number"
            value={charectersBeforeSuggest}
            onChange={handleCharecterChange}
          />
        </div>
      </div>
      {/* Search Section */}
      <div className="flex flex-row items-center justify-between mt-8 ">
        <div className="font-bold text-black">Search</div>
        <div className="flex-grow ml-2">
          <input
            className="w-full p-1 border-2 rounded-lg"
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Results Section */}
      {query.trim() && dataResult && (
        <div className="mt-4 border border-gray-300 rounded-lg">
          {/* Suggestions */}
          {isSuggestionsOpen && (
            <div>
              {suggestionResults.length > 0 ? (
                <div className="flex flex-row justify-between p-2 text-gray-700 bg-slate-300">
                  <div className="w-full font-medium">SUGGESTIONS</div>
                  <button
                    onClick={() =>
                      handleToggleSection(TOGGLE_SECTIONS.SUGGESTIONS)
                    }
                  >
                    Close
                  </button>
                </div>
              ) : (
                ""
              )}

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
              {collectionResults.length > 0 ? (
                <div className="flex flex-row justify-between p-2 text-gray-700 bg-slate-300">
                  <div className="w-full font-medium">COLLECTIONS</div>
                  <button
                    onClick={() =>
                      handleToggleSection(TOGGLE_SECTIONS.COLLECTIONS)
                    }
                  >
                    Close
                  </button>
                </div>
              ) : (
                ""
              )}
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
              {productResults.length > 0 ? (
                <div className="flex flex-row justify-between p-2 text-gray-700 bg-slate-300">
                  <div className="w-full font-medium">PRODUCTS</div>
                  <button
                    onClick={() =>
                      handleToggleSection(TOGGLE_SECTIONS.PRODUCTS)
                    }
                  >
                    Close
                  </button>
                </div>
              ) : (
                ""
              )}

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
