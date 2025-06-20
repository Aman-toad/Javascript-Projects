let randomtext = [
  "it is a long established fact that a reader will be distracted by the readable",

  "it has a more or less normal distribution of letters as opposed to using content",

  "classical latin literature from making it over years old richard mcclintock help",

  "if you use this site regularly and would like to help keep the site on the internet",

  "there are many variations of passages of lorem ipsum available but the majority",

  "form by injected humour or randomised words which don't look They help readers understand ",

  "a paragraph is a group of sentences that support a single main idea paragraphs are",

  "hello i am aman the developer of this project if you like this speed type page give a like and also you can follow me"
]

let i = Math.floor(Math.random() * randomtext.length);

const generatedText = document.querySelector('.random-text').innerHTML = randomtext[i];

const inpBox = document.getElementById('user-text');

inpBox.addEventListener('input', () => {
  startTimer();
})

let timer;
let startTime;

function startTimer(){
  if (!startTime){
    startTime = new Date().getTime();
    timer = setInterval(updateTimer, 1000);
  }
}

function updateTimer(){
  const currentTime = new Date().getTime();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  document.querySelector('.js-timer').innerHTML = 'Time: ' +  elapsedTime + ' s';

  
  // let myArray = generatedText.split(' ');
  // const lastWordNum = myArray.length - 1;
  // const lastword = myArray[lastWordNum];
  // const lastLetter = lastword.split('')
  // const finalLetter = lastLetter.length - 1;
  // const last = lastLetter[finalLetter];

  // let userArray = inpBox.value;
  // const userLastWord = userArray.length - 1;
  // const userLastLetter = userArray[userLastWord];
  // let result = Array.of(userLastLetter)
   
  if (generatedText === inpBox.value){
    calculateWPM(inpBox.value, elapsedTime);
    inpBox.value = '' ;   
    stopTimer();   
  } 
}

function stopTimer(){
  clearInterval(timer);
  startTime = null
}

function restart(){
  location.reload();
}

function calculateWPM(typedtext, timeInSec){
  const wordsTyped = typedtext.length / 5;
  const timeInmin = timeInSec / 60;
  const wpm = Math.round(wordsTyped / timeInmin);

  document.querySelector('.js-show-speed').innerHTML = 'Speed:  ' + wpm + " WPM"

  accuracy();
}

//Accuracy

function accuracy(){
  const usertext = document.getElementById('user-text').value

  const displayedwords = randomtext[i].split(' ');
  const typedWords = usertext.split(' ');

  let correctWords = 0;
  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === displayedwords[i]) {
      correctWords++;

      const accuracyPercent = (correctWords / displayedwords.length) * 100; 
      
      document.querySelector('.js-show-accuracy').innerHTML =  `Accuracy: ${accuracyPercent} %`     
    }
  } 
}
