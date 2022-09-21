const secretPhrases = ["never", "you", "that", "bullet", "break"];

let randomItem = "";
let clicked = [];
let result = "";

let mistakes = 0;

function selectRandomItem() {
  randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
  document.getElementById("letters").addEventListener("click", buttonHandler);
  console.log(randomItem);
}

function setUnderScores() {
  let splitedWord = randomItem.split("");
  let mappedWord = splitedWord.map(
    letter => (clicked.indexOf(letter) >= 0 ? letter : "_")
  );
  result = mappedWord.join("");
  document.getElementById("clue").innerHTML = `<p>${result}</p>`;
}

function checkIfWin() {
  if (randomItem === result) {
    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document.getElementById("image").querySelector("img").src =
      "./assets/winner.png";
  }
}

function checkIfLose() {
  if (mistakes === 6) {
    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document.getElementById(
      "clue"
    ).innerHTML = `<p>Random Word is: ${randomItem}</p>`;
  }
}

function updateHangmanPicture() {
    const image = document.getElementById("image").querySelector("img")
    image.src = `./assets/hangman${mistakes}.png`
}

function letterHandler(letter) {
  letter = letter.toLowerCase();
  clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
  document.getElementById(letter.toUpperCase()).className = "used";
  if (randomItem.indexOf(letter) >= 0) {
    setUnderScores();
    checkIfWin();
  } else if (randomItem.indexOf(letter) === -1) {
    mistakes++;
    checkIfLose();
    updateHangmanPicture();
  }
}

function buttonHandler(e) {
  letterHandler(e.target.id);
}

selectRandomItem();
setUnderScores();
