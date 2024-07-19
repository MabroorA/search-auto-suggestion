export interface SuggestionTerm {
  term: string;
  url: string;
}

export interface Collection {
  id: string;
  title: string;
  url: string;
}

export interface Product {
  id: string;
  title: string;
  url: string;
  brand: string;
  price: number;
  image: string;
}

export interface Data {
  suggestion_terms: SuggestionTerm[];
  collections: Collection[];
  products: Product[];
}

export enum TOGGLE_SECTIONS {
    SUGGESTIONS = "suggestions",
    PRODUCTS = "products",
    COLLECTIONS = "collections",
  }