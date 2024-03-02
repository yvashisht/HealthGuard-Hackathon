import React from "react";
import { useState } from "react";
import { Text, View, TextInput} from 'react-native'; 

export const SearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const [submittedText, setSubmittedText] = useState("");
    
    return (
        <View>
          <TextInput
           id="search-form"
           className="search-input"
           onChangeText={(newText) => setSearchText(newText)}
           onSubmitEditing={() => setSubmittedText(searchText)}
           value={searchText}
           placeholder="Enter Search Input"
          />
          <Text>{"https://www.google.com/search?q=" + submittedText}</Text>

        </View>
    );

    //  async function googleSearch (text)
    //  {
    //      fetch(
    //         "https://www.googleapis.com/customsearch/v1?key=AIzaSyBuOj_WaPETx_PiX25Ey0YyYWzrqwMdfr4&cx=00af6d2a1db314a35&q=" +
    //         text
    //       ).then(async response => {
    //         setResults(await response.json());
    //          console.log(response.json()['Items'][0]['Title'].toString);
    //        });
    //  }
}

/* <script async src="https://cse.google.com/cse.js?cx=00af6d2a1db314a35">
</script>
<div class="gcse-search"></div> */