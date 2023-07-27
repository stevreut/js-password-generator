// Assignment code here

// Global variables
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numerals = "0123456789";
// Note:  These are the special characters as provided by OWASP
// ( https://owasp.org/www-community/password-special-characters ) with
// certain caveats:
//    1. The space character has been elimited from the list.  No good can from having
//         a space in a password.
//    2. The quotation mark indicated as a special character had to be "escaped" in the
//         string below by preceding with it with a backslash.
//    3. The backslash indicated as a special character had to be "escaped" in the
//         string below by preceding with it with another backslash.  Thus, the \\
//         below is for ONE backslash.
let specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
let alphabetUpper = [...alphabet];
let alphabetLower = [...alphabet.toLowerCase()];
let numeralsArray = [...numerals];
let specialArray  = [...specialChars];

// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// Generate random password after prompting user for criteria
function generatePassword() {
  // TODO - confirm() prompts show buttons "cancel" and "OK".  These
  // labels are not ideal for this app.  Can these be changed, or is
  // there an alternative to confirm that serves our purposes?
  let useUpper    = confirm("Use UPPER CASE letters?");
  let useLower    = confirm("Use lower case letters?");
  let useNumerals = confirm("Use decimal numerals?");
  let useSpecial  = confirm("Use special characters?");
  if (!(useUpper || useLower || useNumerals || useSpecial)) {
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
  if (useSpecial) {
    charsForPassword = [...charsForPassword, ...specialArray];
  }
  // // TODO - TEMPORARY code to test correct populate of character arrays:
  // let len = charsForPassword.length;
  // console.log("len = " + len);
  // for (let i=0; i<len; i++) {
  //   console.log ("char " + i + " of " + len + " : " + charsForPassword[i]);
  // }
  // // TODO - TEMPORARY code end
  let desiredCharCountAsStr = prompt("How many characters in password?");
  // TODO - what happens if user presses "cancel" on the 'how many characters' prompt?
  let desiredCharCount = parseInt(desiredCharCountAsStr);
  // TODO - must check for validity - both in terms of being numeric and in terms of range
  let pw = "";  // password to be returned - initially set as empty string
  for (let i=0; i<desiredCharCount; i++) {
    let charIndex = Math.floor(Math.random()*charsForPassword.length);
    pw += charsForPassword[charIndex];
  }
  return pw;
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
