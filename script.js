const passwordGenerated = document.querySelector(".generated__password");

const characterLengthLabel = document.querySelector(".ch__count");
const range = document.querySelector(".count__range");

const includeLower = document.querySelector("#includeLower");
const includeUpper = document.querySelector("#includeUpper");
const includeNumber = document.querySelector("#includeNumber");
const includeSpecial = document.querySelector("#includeSpecial");

const copyBtn = document.querySelector(".copy__img");
const generateBtn = document.querySelector(".generate__btn");

let characterLength,
  codeArray = [];

const createCodeArray = function (newArray, lower, upper) {
  for (let i = lower; i <= upper; i++) {
    newArray.push(i);
  }
};

const generatePassword = function (
  length,
  lowerCase,
  upperCase,
  digits,
  symbols
) {
  codeArray = [];
  let password = "";
  if (lowerCase.checked) createCodeArray(codeArray, 97, 122);
  if (upperCase.checked) createCodeArray(codeArray, 65, 90);
  if (digits.checked) createCodeArray(codeArray, 48, 57);
  if (symbols.checked) {
    createCodeArray(codeArray, 33, 47);
    createCodeArray(codeArray, 58, 64);
    createCodeArray(codeArray, 91, 96);
    createCodeArray(codeArray, 123, 126);
  }

  if (
    length > 0 &&
    (lowerCase.checked ||
      upperCase.checked ||
      digits.checked ||
      symbols.checked)
  ) {
    for (let i = 0; i < length; i++) {
      const randomCode = Math.floor(Math.random() * codeArray.length);
      password += String.fromCharCode(codeArray.at(randomCode));
    }
  }
  return password;
};

generateBtn.addEventListener("click", function () {
  const password = generatePassword(
    characterLength,
    includeLower,
    includeUpper,
    includeNumber,
    includeSpecial
  );
  passwordGenerated.textContent = password;
});

range.addEventListener("input", function () {
  characterLengthLabel.textContent = range.value;
  characterLength = range.value;
});

copyBtn.addEventListener("click", function () {
  const textCopied = passwordGenerated.textContent;
  navigator.clipboard.writeText(textCopied);
});
