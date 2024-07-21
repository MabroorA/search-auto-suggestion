import { useEffect, useState } from "react";
import { Data } from "../types";
import { filterDataresults } from "../utils";

type UseSearchProps = {
  searchValue: string;
  url: string;
  charectersBeforeSuggest?: number;
};

const searchResultsDefaultValue: Data = {
  suggestion_terms: [],
  collections: [],
  products: [],
};

const useSearch = ({
  searchValue,
  url,
  charectersBeforeSuggest = 1,
}: UseSearchProps) => {
  const [searchResults, setSearchResults] = useState<Data>(
    searchResultsDefaultValue
  );

  useEffect(() => {
    if (searchValue.length >= charectersBeforeSuggest) {
      fetchSuggestionResults();
    } else {
      setSearchResults(searchResultsDefaultValue);
    }
  }, [searchValue, url, charectersBeforeSuggest]);

  const fetchSuggestionResults = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Data = await res.json();

      const filteredData = filterDataresults(data, searchValue);
      setSearchResults(filteredData);
    } catch (error) {
      console.error("Error Fetching Results Data", error);
    }
  };

  return { searchResults };
};
export default useSearch;
