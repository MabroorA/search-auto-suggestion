import { ChangeEvent, useEffect, useState } from "react";
import { Data, SuggestionTerm, Product, Collection } from "./types";

type UseSearchProps = {
  input:string
  url: string
  charectersBeforeSuggest: number
};

const useSearch = ({input, url, charectersBeforeSuggest = 1 }: UseSearchProps) => {
  const [query, setQuery] = useState<string>(input);
  const [dataResult, setDataResult] = useState<Data | null>(null);
  const [suggestionResults, setSuggestionResults] = useState<SuggestionTerm[]>(
    []
  );
  const [collectionResults, setCollectionResults] = useState<Collection[]>([]);
  const [productResults, setProductResults] = useState<Product[]>([]);

  
  useEffect(() => {
    if (query.length >= charectersBeforeSuggest) {
      fetchSuggestionResults();
      handleDataresults( query);
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
      handleDataresults(query);
    } catch (error) {
      console.error("Error Fetching Suggestion Results", error);
    }
  };

  const handleDataresults = ( query: string) => {
    try {
        if (!dataResult) {
            throw new Error("dataResult is null");
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
      console.error("Error Handling Mock Data Results", error);
    }
  };

  return { dataResult,suggestionResults, collectionResults, productResults };
};
export default useSearch;
