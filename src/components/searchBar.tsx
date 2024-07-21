import { useState } from "react";
import { TOGGLE_SECTIONS } from "../types";
import useSearch from "../hooks/use-search";
import useSectionToggles from "../hooks/use-section-toggles";

function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [charectersBeforeSuggest, setCharectersBeforeSuggest] =
    useState<number>(1);

  const { searchResults } = useSearch({
    searchValue: query,
    url: "/mockdata.json",
    charectersBeforeSuggest: charectersBeforeSuggest,
  });

  const {
    collections,
    products,
    suggestion_terms: suggestions,
  } = searchResults;

  const boldQueryInTerm = (term: string, query: string) => {
    if (!query.trim()) return term;

    const lowerTerm = term.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const startIndex = lowerTerm.indexOf(lowerQuery);

    if (startIndex === -1) {
      return term;
    }

    const beforeMatch = term.slice(0, startIndex);
    const match = term.slice(startIndex, startIndex + query.length);
    const afterMatch = term.slice(startIndex + query.length);

    return (
      <>
        <span>{beforeMatch}</span>
        <strong className="font-bold">{match}</strong>
        <span>{afterMatch}</span>
      </>
    );
  };
  const {
    isCollectionsOpen,
    isProductsOpen,
    isSuggestionsOpen,
    handleToggleSection,
  } = useSectionToggles();

  const renderSuggestions = isSuggestionsOpen && suggestions.length > 0;
  const renderProducts = isProductsOpen && products.length > 0;
  const renderCollections = isCollectionsOpen && collections.length > 0;

  return (
    <>
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
              <span className="font-bold">
                {charectersBeforeSuggest || "Enter a number"}
              </span>
            </div>
          </div>

          <input
            className="px-2 py-1 border-2 rounded-lg "
            type="number"
            value={charectersBeforeSuggest}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (!isNaN(value) && value > 0) setCharectersBeforeSuggest(value);
            }}
          />
        </div>
      </div>
      {/* Search Section */}
      <div className="flex flex-row items-center justify-between mt-8 ">
        <div className="font-bold text-black">Search</div>
        <div className="flex-grow ml-2">
          <input
            className="w-full p-1 border-2 rounded-lg"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-4 rounded-lg">
        {/* Suggestions */}
        {renderSuggestions && (
          <div>
            <div className="flex flex-row justify-between p-2 text-gray-700 bg-slate-300">
              <div className="w-full font-medium">SUGGESTIONS</div>
              <button
                onClick={() => handleToggleSection(TOGGLE_SECTIONS.SUGGESTIONS)}
              >
                Close
              </button>
            </div>

            {suggestions.map((suggestion) => (
              <a
                key={suggestion.term}
                href={suggestion.url}
                className="block p-2 hover:bg-blue-200"
              >
                <div className="w-full text-black-500">
                  {boldQueryInTerm(suggestion.term, query)}
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Collections */}
        {renderCollections && (
          <div>
            <div className="flex flex-row justify-between p-2 text-gray-700 bg-slate-300">
              <div className="w-full font-medium">COLLECTIONS</div>
              <button
                onClick={() => handleToggleSection(TOGGLE_SECTIONS.COLLECTIONS)}
              >
                Close
              </button>
            </div>
            {collections.map((collection) => (
              <a
                key={collection.id}
                href={collection.url}
                className="block p-2 hover:bg-blue-200"
              >
                <div className="w-full text-black-500">
                  {boldQueryInTerm(collection.title, query)}
                </div>
              </a>
            ))}
          </div>
        )}
        {/* Products */}
        {renderProducts && (
          <div>
            <div className="flex flex-row justify-between p-2 text-gray-700 bg-slate-300">
              <div className="w-full font-medium">PRODUCTS</div>
              <button
                onClick={() => handleToggleSection(TOGGLE_SECTIONS.PRODUCTS)}
              >
                Close
              </button>
            </div>

            {products.map((product) => (
              <div
                key={product.id}
                className="p-2 mb-2 hover:bg-blue-200 hover:rounded-md"
              >
                <div className="flex flex-row justify-start w-full">
                  <div className="w-1/4 border rounded-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="text-center"
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
    </>
  );
}

export default SearchBar;
