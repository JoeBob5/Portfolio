/*
====================
  GLOBAL VARIABLES
====================
*/

// inputs //
const countryInput = document.querySelector(".country-input");
// outputs //
const dropdownMenu = document.querySelector(".country-dropdown-menu");
const countryInfoOutput = document.querySelector(".country-information-output"); 
// buttons //
const countrySubmitButton = document.querySelector(".country-submit-button"); 
// data //
const myData= []; 

/*
========
  DATA
========
*/ 

function getData(resource, dataVar){ 
  // param1: API url 
  // param2: variable to store data (must be an empty array)
  fetch(resource)
    .then(response => response.json())
    .then(data => {
      dataVar.push(...data); 
    });
}

/*
===========
  DISPLAY
===========
*/

function createDropdownMenuElement(id){
  if(countryInput.value !== ""){
    dropdownMenu.classList.remove("hidden"); 
  } else {
    dropdownMenu.classList.add("hidden"); 
  };

  const countryDropdownEl = document.createElement("div");
  countryDropdownEl.classList.add("country-dropdown-button");
  countryDropdownEl.onclick = function(){
    clearCountryInput(); 
    displayCountry(id); 
  };

  const countryDropdownName = document.createElement("p");
  countryDropdownName.innerText = myData[id].name.common; 

  const countryDropdownImg = document.createElement("img");
  countryDropdownImg.setAttribute("src", myData[id].flags.png);
  countryDropdownImg.setAttribute("alt", myData[id].name.common);
  countryDropdownImg.classList.add("country-dropdown-image"); 

  countryDropdownEl.appendChild(countryDropdownName);
  countryDropdownEl.appendChild(countryDropdownImg);

  dropdownMenu.appendChild(countryDropdownEl); 
}

// Outputs country name and flag 
function displayCountry(index){
  if(!dropdownMenu.classList.contains("hidden")){     // be cognizant of NOT symbol at beginning of statement
    toggleDropdownMenu();
  };

  const countryNameEl = document.createElement("h3");
  countryNameEl.innerText = myData[index].name.common; 

  const countryFlagEl = document.createElement("img");
  countryFlagEl.setAttribute("src", myData[index].flags.png); 
  countryFlagEl.setAttribute("alt", myData[index].name.common); 
  countryFlagEl.onclick = function(){
    clearCountryDisplay(); 
  }
  
  countryInfoOutput.appendChild(countryNameEl); 
  countryInfoOutput.appendChild(countryFlagEl); 
}

function toggleDropdownMenu(){
  dropdownMenu.classList.toggle("hidden"); 
}

function clearDropdownMenu(){
  dropdownMenu.innerText = ""; 
}

function clearCountryDisplay(){
  countryInfoOutput.innerText = ""; 
}

function clearCountryInput(){
  countryInput.value = ""; 
}

/*
============
  CONTROLS
============
*/

function getCountryInformation(){
  const regex = new RegExp(`^${countryInput.value}`, "gi"); 
  myData.forEach(country => {
    if(country.name.common.match(regex)){
      createDropdownMenuElement(myData.indexOf(country)); 
    };
  });
}

document.addEventListener("keyup", () => {
  clearCountryDisplay(); 
  clearDropdownMenu(); 
  getCountryInformation(); 
}); 

/* 
===================
  EXECUTE PROGRAM
===================
*/

getData("https://restcountries.com/v3.1/all", myData); 