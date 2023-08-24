const sentences = [
  "The beautiful sunset painted the sky in hues of orange, pink, and gold, creating a breathtaking scene, As the waves gently lapped the shore, the seagulls soared overhead, their cries mingling with the sound of the ocean.",
  "The bustling city streets were alive with the rhythm of life, as people hurried to their destinations and cars honked in the distance,Amidst the lush greenery of the forest, a winding path led to a hidden waterfall, its cascading waters creating a soothing melody.",
  "The aroma of freshly baked bread wafted through the air, enticing passersby to step into the quaint bakery on the corner, with a canvas in hand, the artist began to translate the beauty of nature onto the blank surface, strokes of color bringing the scene to life.",
];

let buttonStart = document.getElementById("start");
let conntent = document.getElementById("quote");
let result = document.getElementById("result");
let inputText = document.getElementById("text-input");
let wrong = document.getElementById("wrong")

let interval;
let seconds = 0;

buttonStart.addEventListener("click", function () {
  if (seconds >= 60) return;
  let randomIndex = Math.floor(Math.random() * sentences.length);
  conntent.textContent = sentences[randomIndex];
  seconds = 0;
  inputText.value = "";
  inputText.disabled = false;
  startTimer();
});

inputText.addEventListener("input", function (event) {
  if (seconds >= 60) {
    event.target.value = "";
    return;
  }
  let typedText = event.target.value;
  let coloredContent = "";

  for (let i = 0; i < conntent.textContent.length; ++i) {
    if (i < typedText.length) {
      if (typedText[i] === conntent.textContent[i]) {
        coloredContent += `<span style="color: green;">${conntent.textContent[i]}</span>`;
      } else {
        coloredContent += `<span style="color: red;">${conntent.textContent[i]}</span>`;
      }
    } else {
      coloredContent += conntent.textContent[i];
    }
  }
  conntent.innerHTML = coloredContent;

  if (seconds >= 60) {
    inputText.disabled = true;
  }

  countCorrectWords();
});

function startTimer() {
  clearInterval(interval);
  seconds = 0;
  timer.textContent = "0s";

  interval = setInterval(function () {
    ++seconds;
    if (seconds === 60) {
      clearInterval(interval);
    }
    timer.textContent = seconds + "s";
  }, 1000);
}

function countCorrectWords() {
  let typedText = inputText.value.trim();
  let typedWords = typedText.split(/\s+/);
  let contentWords = conntent.textContent.trim().split(/\s+/);
  let correctWordsCount = 0;

  for (let i = 0; i < contentWords.length; ++i) {
    if (i < typedWords.length && typedWords[i] === contentWords[i]) {
      ++correctWordsCount;
    } 
  }

  result.textContent = correctWordsCount;

}
