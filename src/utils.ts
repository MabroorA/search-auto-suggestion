import { Data } from "./types";

export const filterDataresults = (data: Data, searchValue: string) => {
  if (data) {
    // filter suggestions with query only
    const filteredSuggestions = data.suggestion_terms.filter((suggestion) =>
      suggestion.term.toLowerCase().includes(searchValue.toLowerCase())
    );
    // filter collections
    const filteredCollections = data.collections.filter((collection) =>
      collection.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    // filter products
    const filteredProducts = data.products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return {
      suggestion_terms: filteredSuggestions,
      collections: filteredCollections,
      products: filteredProducts,
    };
  } else
    return {
      suggestion_terms: [],
      collections: [],
      products: [],
    };
};
