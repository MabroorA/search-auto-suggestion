import { useState } from "react";
import { TOGGLE_SECTIONS } from "../types/types";

const useSectionToggles = () => {
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(true);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState<boolean>(true);
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(true);

  const handleToggleSection = (section: TOGGLE_SECTIONS) => {
    switch (section) {
      case TOGGLE_SECTIONS.SUGGESTIONS:
        setIsSuggestionsOpen(!isSuggestionsOpen);
        break;
      case TOGGLE_SECTIONS.COLLECTIONS:
        setIsCollectionsOpen(!isCollectionsOpen);
        break;
      case TOGGLE_SECTIONS.PRODUCTS:
        setIsProductsOpen(!isProductsOpen);
        break;
      default:
        break;
    }
  };

  return {
    isCollectionsOpen,
    isProductsOpen,
    isSuggestionsOpen,
    handleToggleSection,
  };
};

export default useSectionToggles;
