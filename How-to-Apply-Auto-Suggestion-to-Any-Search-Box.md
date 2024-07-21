## How to Apply This Auto Suggestion to any Search Box 

In this file will be an instructions to apply auto suggestion to any search box.
The information will be split into the Usage and Props section

## Usage
const { 
    suggestions, 
    collections, 
    products, 
    dataResult 
    } = useSearch({input: string, url: string,charectersBeforeSuggest: string,
  });


## Props

- useSearch
Propname                Type    Default Description
input                   string  -       The Query used to search the database
url                     string  -       The Url string to fetch data
charectersBeforeSuggest number  1       The number of charecters before auto
                                        suggestion is displayed to the user

- use-Search
Propname                Type    Default Description
input                   string  -       The Query used to search the database
url                     string  -       The Url string to fetch data
charectersBeforeSuggest number  1       The number of charecters before auto
                                        suggestion is displayed to the user

- use-section-Toggles

Propname                Type    Default Description
TOGGLE_SECTIONS         object  -       The Toggle section object which includes the
                                        sectionsof the auto suggestion menu to be displayed

useSearch

Propname	Type	Default	Description
input	string	-	The Query used to search the database
url	string	-	The URL string to fetch data
charactersBeforeSuggest	number	1	The number of characters before auto suggestion is displayed to the user
use-Search

Propname	Type	Default	Description
input	string	-	The Query used to search the database
url	string	-	The URL string to fetch data
charactersBeforeSuggest	number	1	The number of characters before auto suggestion is displayed to the user
use-section-Toggles

Propname	Type	Default	Description
TOGGLE_SECTIONS	object	-	The Toggle section object which includes the sections of the auto suggestion menu to be displayed
