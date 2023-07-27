// Global variables

let charsForPassword = [];
let alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numerals = "0123456789";
// Note:  These are the special characters as provided by OWASP
// ( https://owasp.org/www-community/password-special-characters ) with
// certain caveats:
//    1. The space character has been eliminated from the list.  No good can come from
//         having a space in a password.
//    2. The quotation mark indicated as a special character had to be "escaped" in the
//         string below by preceding with it with a backslash.
//    3. The backslash indicated as a special character had to be "escaped" in the
//         string below by preceding with it with another backslash.  Thus, the \\
//         below is for ONE backslash.
let specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";


// Get references to the #generate element
let generateBtn = document.querySelector("#generate");


// Prompts for whether a given set of characters (as a string) is to be used and,
// if accepted by user, add to charsForPassword
function promptAndAddSubstring(question, substr) {
  // TODO - confirm() prompts show buttons "cancel" and "OK".  These
  // labels are not ideal for this app.  Can these be changed, or is
  // there an alternative to confirm that serves our purposes?
  let response = confirm(question);
  if (response) {
    let charArray = [...substr];
    charsForPassword = [...charsForPassword, ...substr];
  }
  return response;
}


function promptForLength() {
  let retryCount = 0;
  let validCount = false;
  let length = 0;
  let countAsString;
  while (!validCount && retryCount < 3) {
    validCount = false;
    if (retryCount === 0) {
      countAsString = prompt("How many characters in password?");
    } else {
      countAsString= prompt("Invalid response. Try again. How many characters in password?");
    }
    length = parseInt(countAsString);
    if (length !== null) {
      if (length >= 8 && length <= 128) {
        validCount = true;
      }
    }
    retryCount++;
  }
  if (validCount) {
    return length;
  } else {
    return null;
  }
}


function hideUserAlert() {
  // TODO - not yet implemented
  // As initial state before processing, use script to hide alert box
  // and blank out content.
  console.log("alert box reset");
}


function alertUser(message) {
  // TODO - net yet implemented
  console.log("messsage would be '" + message + "'");
  // TODO - ultimately, unhide box on screen (CSS) and place message there.
}


// Generate random password after prompting user for criteria
function generatePassword() {
  charsForPassword = [];
  hideUserAlert();
  let useUpper = promptAndAddSubstring ("Use UPPER CASE letters?", alphabetUpper);
  let useLower = promptAndAddSubstring ("Use lower case letters?", alphabetUpper.toLowerCase());
  let useNumerals = promptAndAddSubstring ("User decimal numerals?", numerals);
  let useSpecial = promptAndAddSubstring ("Use special characters?", specialChars);
  if (!(useUpper || useLower || useNumerals || useSpecial)) {
    alertUser("No character types were selected");
    return "";
  }
  // // TODO - TEMPORARY code to test correct populate of character arrays:
  // let len = charsForPassword.length;
  // console.log("len = " + len);
  // for (let i=0; i<len; i++) {
  //   console.log ("char " + i + " of " + len + " : " + charsForPassword[i]);
  // }
  // // TODO - TEMPORARY code end
  let desiredCharCount = promptForLength();
  if (desiredCharCount === null) {
    alertUser("No valid length was selected.");
    return "";
  }
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
  let passwordText = document.querySelector("#password");
  passwordText.value = password;
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
