// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let word = input.question("Enter a word to score: ");
   //console.log(oldScrabbleScorer(word));
   return word;
};

let simpleScore = function(word){return word.length};

let vowelBonusScore = function(word){
    let points = 0;
    word = word.toUpperCase();
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    for (letter of word) {
      if (vowels.includes(letter)) {
        points += 3;
      } else {
        points++;
      }
    }
    return points;
  };

let scrabbleScore = function(word) {
	word = word.toLowerCase();
	let points = 0;
  for (letter of word) {
    points += newPointStructure[letter];
  }
	return points;
 };

let simple = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScore
};

let vowel = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: vowelBonusScore
};

let scrabble = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoringFunction: scrabbleScore
};

const scoringAlgorithms = [simple, vowel, scrabble];

function scorerPrompt() {
  const validInputs = ['0', '1', '2'];
  let scoringAlg = '';
  console.log(`Which scoring algorithm would you like to use?
  
  0 - Simple: One point per character
  1 - Vowel Bonus: Vowels are worth 3 points
  2 - Scrabble: Uses scrabble point system
  `);
  while (!validInputs.includes(scoringAlg)) {
    scoringAlg = input.question("Enter 0, 1, or 2: ");
  }
  return scoringAlgorithms[Number(scoringAlg)];
}

function transform(pointStructure1) {
  let pointStructure2 = {};
  for (score in pointStructure1) {
    for (letter of pointStructure1[score]) {
      pointStructure2[letter.toLowerCase()] = Number(score);
    }
  }
  return pointStructure2;
}

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function runProgram() {
   const word = initialPrompt();
   const selectedScorer = scorerPrompt();
   console.log(`Score for '${word}': ${selectedScorer.scoringFunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

