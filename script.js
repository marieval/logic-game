// TODO - CORRECT!! - if two colors are same and the second one is put correctly, it answers with white (instead of black)!!!
// TODO: announce that player won
// TODO: info about the rules

let templateColorArray = Array.from(document.querySelectorAll(".template")); // Get the template-color-elements
const pickColorArray = Array.from(document.querySelectorAll(".color")); // Get the pick-colors-elements as an array
const attemptsArray = Array.from(document.querySelectorAll(".attempt")); // Get the attempt-rows as an array
const checkBtn = document.querySelector("#check-btn");

let templateColorCodes;
let previousColorElement;
let pickedColorCode;
let guessActiveArray; // Get the guess-elements as an array
let guessColorCodes;
let answerActiveArray; // The answer-points of current attempt
let answerColorCodes = [0, 0, 0, 0, 0];
let activeRowNo = 1;

// Set randomly the template-colors
const setTemplateColors = () => {
  let randomPickedColor;

  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * pickColorArray.length);
    randomPickedColor = pickColorArray[randomIndex];
    randomPickedColorCode =
      window.getComputedStyle(randomPickedColor).backgroundColor;

    templateColorArray[i].style.backgroundColor = randomPickedColorCode;

    //templateColors.push(pickColorArray[randomIndex]);
  }
  //console.log("templateColors", templateColors);
  //templateColorCode;

  /* templateColorArray.forEach((templatePlace) => {
    templatePlace.style.backgroundColor =  
  })*/
  templateColorCodes = templateColorArray.map((color) => {
    return window.getComputedStyle(color).backgroundColor;
  });

  templateColorArray.forEach((tempPlace) => {
    tempPlace.style.backgroundColor = randomPickedColor;
  });
};

// Handle the click on chosen color and get its rgb-code, show/hide the highlight
pickColorArray.forEach((colToPick) => {
  colToPick.addEventListener("click", () => {
    pickedColorCode = window.getComputedStyle(colToPick).backgroundColor;
    colToPick.classList.add("activeColor");
    if (previousColorElement && previousColorElement !== colToPick) {
      previousColorElement.classList.remove("activeColor");
    }
    previousColorElement = colToPick;
  });
});

// Pick the guess-element and change its color:
const startGuess = () => {
  answerColorCodes = [0, 0, 0, 0, 0];
  guessActiveArray = Array.from(
    document.querySelector(".guesses-active").children
  );
  guessActiveArray.forEach((guessPlace) => {
    guessPlace.addEventListener("click", () => {
      guessPlace.parentElement.classList.contains("guesses-active")
        ? (guessPlace.style.backgroundColor = pickedColorCode)
        : console.log("parent nema active tridu!");
    });
  });
};

// Compare the color codes of the template and the guess:
const compareColorCodes = (template, guess) => {
  // check the matching color on the same position
  for (let i = 0; i < template.length; i++) {
    if (template[i] === guess[i]) {
      answerColorCodes[i] = 1;
    }
  }
  // check the matching color on different position
  for (let i = 0; i < template.length; i++) {
    if (answerColorCodes[i] !== 1) {
      for (let j = 0; j < guess.length; j++) {
        if (template[i] === guess[j]) {
          answerColorCodes[j] = 2;
          console.log(`No${j + 1} je na jiném místě`); // TODO: alert!
          break;
        }
      }
    }
  }

  // Target the answer-points of current attempt:
  answerActiveArray = Array.from(
    document.querySelector(".answers-active").children
  );

  // Transfer the match-codes 0-1-2 to null-black-white:
  for (let i = 0; i < answerColorCodes.length; i++) {
    if (answerColorCodes[i] === 1) {
      answerActiveArray[i].style.backgroundColor = "black";
    } else if (answerColorCodes[i] === 2) {
      answerActiveArray[i].style.backgroundColor = "white";
    }
  }
};

const changeActiveRow = (actRowNo) => {
  // Get the index of the active row/attempt and the folowing row/attempt in the array
  let activeAttemptPosition = attemptsArray.length - actRowNo;
  let newActiveAttemptPosition = activeAttemptPosition - 1;

  // Get the active divs of guesses and answers as arrays
  let activeAttemptDivs = Array.from(
    attemptsArray[activeAttemptPosition].children
  );
  let newActiveAttemptDivs = Array.from(
    attemptsArray[newActiveAttemptPosition].children
  );

  activeAttemptDivs[1].classList.remove("answers-active");
  activeAttemptDivs[2].classList.remove("guesses-active");
  newActiveAttemptDivs[1].classList.add("answers-active");
  newActiveAttemptDivs[2].classList.add("guesses-active");
  activeRowNo++;
  startGuess();
};

// Event after pressing the Check-button:
checkBtn.addEventListener("click", () => {
  guessColorCodes = guessActiveArray.map((color) => {
    return window.getComputedStyle(color).backgroundColor;
  });

  console.log("templateColorCodes", templateColorCodes);
  console.log("guessColorCodes", guessColorCodes);
  compareColorCodes(templateColorCodes, guessColorCodes);
  changeActiveRow(activeRowNo);
});

setTemplateColors();
startGuess();
