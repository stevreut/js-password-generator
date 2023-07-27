// Assignment code here

// Global variables
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let alphabetUpper = [...alphabet];
let alphabetLower = [...alphabet.toLowerCase()];
let numerals = "0123456789";
let numeralsArray = [...numerals];

// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// Generate random password after prompting user for criteria
function generatePassword() {
  let useUpper    = confirm("Use UPPER CASE letters?");
  let useLower    = confirm("Use lower case letters?");
  let useNumerals = confirm("Use decimal numerals");
  if (!(useUpper || useLower || userNumerals)) {
    // TODO - also alert, or just let calling function handle?
    return null;  
  }
  let charsForPassword = [];
  if (useUpper) {
    charsForPassword = [...charsForPassword, ...alphabetUpper];
  }
  if (useLower) {
    charsForPassword = [...charsForPassword, ...alphabetLower];
  }
  if (useNumerals) {
    charsForPassword = [...charsForPassword, ...numeralsArray];
  }
  // TODO - must also accommodate special characters
}

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  // TODO - can we test for null here?
  let passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
