// Global variables

const MIN_LEN = 8;    // minimum allowed length of password
const MAX_LEN = 128;  // maximum allowed length of password
let charsForPassword = [];  // array of all candidate characters to be chosen from when generating password
let alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numerals = "0123456789";
let specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";  // from OWASP 
// ( https://owasp.org/www-community/password-special-characters )
// Some caveats re the specialChars variable above:
//    1. The space character has been eliminated from the list.  No good can come from
//         having a space in a password.
//    2. The quotation mark indicated as a special character had to be "escaped" in the
//         string below by preceding with it with a backslash.
//    3. The backslash indicated as a special character had to be "escaped" in the
//         string below by preceding with it with another backslash.  Thus, the \\
//         below is for ONE backslash.


// Get references to the #generate element, which is the "Generate Password" button.
let generateBtn = document.querySelector("#generate");


// Prompts for whether a given set of characters (as a string) is to be used and,
// if accepted by user, add to charsForPassword
function promptAndAddSubstring(question, substr) {
  // Parameters:
  //   question - verbiage displayed at prompt() call
  //   substr - string to be converted to array of characters if used
  //   returns:  boolean - true iff user opts to use substr based on response to prompt()
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


// Prompts the user for a desired password length and validates that the provided result 
// is both numeric and within the required range - no less than MIN_LEN nor more than MAX_LEN.
// Allows up to three total tries.
function promptForLength() {
  let retryCount = 0;
  let isValidCount = false;
  let length = 0;  // length to be returned, provided a valid length is provided
  let countAsString;
  while (!isValidCount && retryCount < 3) {
    isValidCount = false;
    let basePrompt = "How many characters in password?\n(must be at least " + MIN_LEN +
      " and no more than " + MAX_LEN + ")";
    if (retryCount === 0) {
      countAsString = prompt(basePrompt);
    } else {
      countAsString= prompt("INVALID RESPONSE. TRY AGAIN.\n" + basePrompt);
    }
    // Attempt conversion of string value to numeric value
    length = parseInt(countAsString);
    if (length !== null) {
      // null return from parseInt indicates failed conversion, so non-null
      // means we have a numeric value to validate
      if (length >= MIN_LEN && length <= MAX_LEN) {
        // Response is only valid if BOTH numeric AND in-range
        isValidCount = true;
      }
    }
    retryCount++;
  }
  if (isValidCount) {
    return length;
  } else {
    return null;  // signals caller that no valid response was provided
  }
}

// Hides the alert message (a sometimes visible and sometimes hidden paragraph).  Used to reset the
// state of the screen upon starting a new user dialog. 
function hideUserAlert() {
  // As initial state before processing, use script to hide alert box
  // and blank out content.
  let alertParagraph = document.getElementById("alert-msg");
  // Single place holder character (never visible) keeps the page elements from migration, which
  // the sometimes seem to do if alertParagraph.textContent is valued as "".
  alertParagraph.textContent = "X";
  alertParagraph.style.visibility = "hidden";
  // Unfortunately, the change of visibility upon hiding herein does not get rendered on the page
  // until all user responses are entered despited this function being executed immediately upon
  // pressing the button.  This appears to be a known side effect of the use of the prompt() function.
}


function alertUser(message) {
  let alertParagraph = document.getElementById("alert-msg");
  alertParagraph.textContent = message;
  alertParagraph.style.visibility = "visible";
}


// Generate random password after prompting user for criteria or, if user responses are invalid,
// sets password to empty string and sets an alert message on the page.
function generatePassword() {
  // Reset alert message on page to hidden/blank
  hideUserAlert();
  // Array to hold all characters from which random selections are to be made
  // when building password (pw), first initialized as empty array.
  charsForPassword = [];
  // hideUserAlert();  TODO - remove this line eventually
  // Build charsForPassword (the array of candidate characters) based on user responses for
  // each of the four categories of characters.
  let useUpper = promptAndAddSubstring ("Use UPPER CASE letters?", alphabetUpper);
  let useLower = promptAndAddSubstring ("Use lower case letters?", alphabetUpper.toLowerCase());
  let useNumerals = promptAndAddSubstring ("User decimal numerals?", numerals);
  let useSpecial = promptAndAddSubstring ("Use special characters?", specialChars);
  // If NO selections are made then we cannot generate a password
  if (!(useUpper || useLower || useNumerals || useSpecial)) {
    alertUser("No character types were selected");
    return "";
  }
  // Get the desired password length and validate.  Null is returned from
  // promptForLength() of no valid length was entered after multiple retries.
  let desiredCharCount = promptForLength();
  if (desiredCharCount === null) {
    alertUser("No valid length was selected.  Length must be between " +
      MIN_LEN + " and " + MAX_LEN + " inclusive.");
    return "";
  }
  let pw = "";  // password to be returned - initially set as empty string
  // Select desiredCharCount random characters from array charsForPassword and
  // append each to pw, thus creating a string of random characters of the
  // desired length.
  for (let i=0; i<desiredCharCount; i++) {
    let charIndex = Math.floor(Math.random()*charsForPassword.length);
    pw += charsForPassword[charIndex];
  }
  return pw;
}


// Write password to the #password text area on page if possible, or
// write an alert to on the page.
function writePassword() {
  generateBtn.disabled = true;
  let passwordText = document.querySelector("#password");
  passwordText.style.backgroundColor = "#a0a0a0";
  passwordText.style.color = "#808080";
  let password = generatePassword();  // Note that generatePassword() returns an empty string when an error occurs.
  passwordText.value = password;
  if (password !== "") {
    passwordText.style.backgroundColor = "#00ff00";
    passwordText.style.color = "#00A000";
  } else {
    passwordText.value = "No password generated";
  }
  generateBtn.disabled = false;
}


// Add event listener to Generate Password button
generateBtn.addEventListener("click", writePassword);
