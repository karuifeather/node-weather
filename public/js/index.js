const TypeWriter = function (txtEl, words, interval = 3000) {
  this.txtEl = txtEl;
  this.words = words;
  this.alphabets = "";
  this.wordsIndex = 0;
  this.interval = parseInt(interval, 10);
  this.type();
  this.isDeleting = false;
};

// Type method
TypeWriter.prototype.type = function () {
  // Current index of word
  const index = this.wordsIndex % this.words.length;
  // Get alphabets of the current word
  const fullWord = this.words[index];
  console.log(fullWord);

  // check if deleting
  if (this.isDeleting) {
    // Remove a char
    this.alphabets = fullWord.substring(0, this.alphabets.length - 1);
  } else {
    // Add a char
    this.alphabets = fullWord.substring(0, this.alphabets.length + 1);
  }

  // insert alphabets into txtEl
  this.txtEl.innerHTML = `<span class='txt'>&nbsp;${this.alphabets}</span>`;

  let speed = 300;

  if (this.isDeleting) {
    speed /= 2;
  }

  // check for word completition
  if (!this.isDeleting && this.alphabets === fullWord) {
    // make a pause at the end
    speed = this.interval;
    this.isDeleting = true;
  } else if (this.isDeleting && this.alphabets === "") {
    this.isDeleting = false;
    this.wordsIndex++;

    speed = 500;
  }

  setTimeout(() => this.type(), speed);
};

// Init on DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init app
function init() {
  const txtEl = document.querySelector(".txt-type");
  const words = JSON.parse(txtEl.getAttribute("data-words"));
  const interval = txtEl.getAttribute("data-wait");

  // init type writer
  new TypeWriter(txtEl, words, interval);
}
