import { useEffect, useState } from "react";
import { Data, SuggestionTerm, Product, Collection } from "../types/types";

type UseSearchProps = {
  input: string;
  url: string;
  charectersBeforeSuggest?: number;
};

const useSearch = ({
  input,
  url,
  charectersBeforeSuggest = 1,
}: UseSearchProps) => {
  const [query, setQuery] = useState<string>(input);
  const [dataResult, setDataResult] = useState<Data | null>(null);
  const [suggestions, setSuggestionResults] = useState<SuggestionTerm[]>([]);
  const [collections, setCollectionResults] = useState<Collection[]>([]);
  const [products, setProductResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.length >= charectersBeforeSuggest) {
      fetchSuggestionResults();
      filterDataresults(query);
    } else {
      setSuggestionResults([]);
      setCollectionResults([]);
      setProductResults([]);
    }
  }, [query, dataResult, charectersBeforeSuggest]);

  useEffect(() => {
    setQuery(input);
  }, [input]);

  const fetchSuggestionResults = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Data = await res.json();
      setDataResult(data);
      filterDataresults(query);
    } catch (error) {
      console.error("Error Fetching Results Data", error);
    }
  };

  const filterDataresults = (query: string) => {
    try {
      if (!dataResult) {
        throw new Error("DataResult is null");
      }
      // filter suggestions with query only
      const filteredSuggestions = dataResult.suggestion_terms.filter(
        (suggestion) =>
          suggestion.term.toLowerCase().includes(query.toLowerCase())
      );
      // filter collections
      const filteredCollections = dataResult.collections.filter((collection) =>
        collection.title.toLowerCase().includes(query.toLowerCase())
      );
      // filter products
      const filteredProducts = dataResult.products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestionResults(filteredSuggestions);
      setCollectionResults(filteredCollections);
      setProductResults(filteredProducts);
    } catch (error) {
      console.error("Error Filtering Data Results", error);
    }
  };

  return { dataResult, suggestions, collections, products };
};
export default useSearch;
