/*
===========
  GLOBALS
===========
*/
// input 
const userInput = document.querySelector(".user-input");
let results = [];
const minLength = document.querySelector(".user-input-min-length"); 

// parts of speech
let includeArticles = false; 
let includeCoordinatingConjunctions = false; 
let includePronouns = false; 
let includePrepositions = false; 
let includeLinkingVerbs = false; 

const articlesRegex = /^a|an|the$/
const coordinatingConjunctionsRegex = /^and|but|or|not|for|so|yet$/; 
const subordinatingConjunctions = [];
const pronounsRegex = /^my|he|him|his|she|her|you|your|this|that|it|they|their$/;
const prepositionsRegex = /^to|in|into|at|of|with|on$/
const linkingVerbsRegex = /^was|were|is|are$/

// buttons 
const translateButton = document.querySelector(".translate-button"); 

//output
const resultOverlay = document.querySelector(".result-overlay"); 
const resultOverlayContainer = document.querySelector(".result-overlay-container"); 

// helpers
const regex = /^[a-zA-Z ]+$/

/*
========
  DATA
========
*/

function validate(){
  const userPartsOfSpeech = document.querySelectorAll(".parts-of-speech-checkbox"); 
  userPartsOfSpeech.forEach(cat => {
    if(cat.checked === true && cat.value === "articles"){
      includeArticles = true; 
    } else if (cat.checked === false && cat.value === "articles"){
      includeArticles = false; 
    };

    if(cat.checked === true && cat.value === "coordinating-conjunctions"){
      includeCoordinatingConjunctions = true; 
    } else if (cat.checked === false && cat.value === "coordinating-conjunctions"){
      includeCoordinatingConjunctions = false; 
    };

    if(cat.checked === true && cat.value === "pronouns"){
      includePronouns = true; 
    } else if (cat.checked === false && cat.value === "pronouns"){
      includePronouns = false; 
    };

    if(cat.checked === true && cat.value === "prepositions"){
      includePrepositions = true; 
    } else if (cat.checked === false && cat.value === "prepositions"){
      includePrepositions = false; 
    };

    if(cat.checked === true && cat.value === "linking-verbs"){
      includeLinkingVerbs = true; 
    } else if (cat.checked === false && cat.value === "linking-verbs"){
      includeLinkingVerbs = false; 
    };
  });
}

function countWordFrequency(){
  if(userInput.value === ""){
    resultOverlay.innerText = "Please enter text"; 
    return 
  }
  resetOverlay(); 
  let words = userInput.value.split(""); 

  //removes non-letter characters 
  for(let i = 0; i < words.length; i++){
    if(!words[i].match(regex)){ 
      words.splice(i, 1);
      i-- // since an element is removed, the array is shortened, causing an index to be skipped 
    }; 
  };

  words = words.join('').split(' ');

  for(let i = 0; i < words.length; i++){
    words[i] = words[i].toLowerCase(); 
    const result = words.filter(word => word === words[i]); 
    results.push(result); 
  };
}

function removeDuplicates(arr){
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr.length; j++){
      if(i === j){ // to prevent deleting the original (only want to delete duplicate) 
        //
      } else if (arr[i][0] === arr[j][0]){
        arr.splice(j, 1);  
      };
    };
  };
}

function removePartsOfSpeech(arr){
  validate()
  for(let i = 0; i < arr.length; i++){
    if(includeArticles === false && arr[i][0].match(articlesRegex)){
      arr.splice(i, 1);
      i--; 
    } else if(includeCoordinatingConjunctions === false && arr[i][0].match(coordinatingConjunctionsRegex)){
      arr.splice(i, 1); 
      i--; 
    } else if(includePronouns === false && arr[i][0].match(pronounsRegex)){
      arr.splice(i, 1); 
      i--; 
    } else if(includePrepositions === false && arr[i][0].match(prepositionsRegex)){
      arr.splice(i, 1); 
      i--; 
    } else if(includeLinkingVerbs === false && arr[i][0].match(linkingVerbsRegex)){
      arr.splice(i, 1); 
      i--; 
    };
  };
}

//sort arrays in array by length 
function sortArr(arr){
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr.length; j++){
      if(arr[i].length > arr[j].length){
        const holder = arr[i];
        arr[i] = arr[j];
        arr[j] = holder; 
      };
    };
  };
}

function reset(){
  results = []; 
}

/*
===========
  DISPLAY  
===========
*/

function displayResults(){
  const userSpecifiedLength = minLength.value; 
  results.forEach(result => {
    const resultEl = document.createElement("div");
    resultEl.classList.add("result-element")

    if(result.length >= userSpecifiedLength && result[0] !== ""){
      const element = document.createElement("p");
      element.classList.add("result-element-word")
      element.setHTML(`${result[0]}: `); 

      const freqEl = document.createElement('p');
      freqEl.classList.add("result-element-freq"); 
      freqEl.setHTML(`${result.length}`)

      resultEl.appendChild(element); 
      resultEl.appendChild(freqEl); 
      resultOverlay.appendChild(resultEl); 
    };
  });
}

function resetOverlay(){
  resultOverlay.innerText = ""; 
}

/*
=================
  INTERACTIVITY
=================
*/

translateButton.addEventListener("click", e => {
  e.preventDefault(); 
  reset(); 
  resultOverlayContainer.classList.remove("hidden"); 
  countWordFrequency();
  removeDuplicates(results); 
  removePartsOfSpeech(results); 
  sortArr(results); 
  displayResults();
});

resultOverlayContainer.addEventListener("click", () =>{
  resultOverlayContainer.classList.add("hidden"); 
})

