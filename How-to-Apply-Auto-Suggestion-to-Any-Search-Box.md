# How to Apply This Auto Suggestion to any Search Box 

In this file, you will find instructions on how to apply auto-suggestion to any search box. The information is split into the Usage and Props sections.

## Usage

To apply auto-suggestion functionality, use the `useSearch` hook as shown below. This hook integrates auto-suggestion with a search input field and provides suggestions based on user input and external data.

```javascript
const {
    dataResult, 
    suggestions, 
    collections, 
    products
} = useSearch({
    searchValue,         
    url: fetchUrl,               
    charactersBeforeSuggest: 1  
});
```
### Description of Returned Values
- `suggestions`: An array of suggestions based on the user's input.
- `collections`: Grouped data or categories related to the suggestions.
- `products`: Specific product suggestions if your data source includes products.
- `dataResult`: Raw data fetched from the server, useful for debugging or additional processing.
### Parameters
- `searchValue`: The query string used to search the database. This should be tied to your search input field.
- `url`: The URL endpoint from which suggestions are fetched based on the input.
- `charactersBeforeSuggest?`(optional): The minimum number of characters that must be typed before suggestions are displayed.This is an optional and the Default is 1.


# Props
```useSearch```

| Propname | Type   | Default | Description| 
|-------------------------|--------|---------|--------------------------------------------------------------------------|
| searchValue             | string | -       | The Query used to search the database                                    |
| url                     | string | -       | The URL string to fetch data                                             |
| charactersBeforeSuggest | number | 1       | The number of characters before auto suggestion is displayed to the user | 

# Turn on/off the display of each block in the Data Result

To get setting to turn off the display of each block of in the suggestion results use the "use-section-Toggles" hook.
```use-section-Toggles```
## Usage
``` javascript
const {
    isCollectionsOpen,
    isProductsOpen,
    isSuggestionsOpen,
    handleToggleSection,
  } = useSectionToggles();
```

### Description of Returned Values
- `handleToggleSection`: Function that toggles the visibility of a specified section.
- `isCollectionsOpen`: Boolean indicating whether the collections section is open (`true`) or closed (`false`).
- `isProductsOpen`: Boolean indicating whether the products section is open (`true`) or closed (`false`).
- `isSuggestionsOpen`: Boolean indicating whether the suggestions section is open (`true`) or closed (`false`).

### Parameters
- `handleToggleSection` accepts a single parameter:
  - `section`: A value of the `TOGGLE_SECTIONS` enum, which specifies which section to toggle.



