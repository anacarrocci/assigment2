/*
 SENG-513 WINTER 2018
 Assignment 2
 Carrocci, Ana
 
 The following program implements getStats(txt) which computes information from a provided text
 */
function getStats(txt) {
    
    return {
        
        nChars: charCount(txt),
        nWords: wordCount(txt),
        nLines: linesCount(txt),
        nNonEmptyLines: nonEmptyLines(txt),
        maxLineLength: maxLength(txt),
        averageWordLength: average(txt),
        palindromes: findPalindromes(txt),
        longestWords: findLongestWord(txt),
        mostFrequentWords: mostFrequent(txt),
    };
}

// Description: Computes the number of chars in the text
// Parameter: txt
// Returns: number of chars in the text
function charCount(txt){
    return txt.length;
}

// Description: Computes the number of words in the text
// Parameter: txt
// Returns: number of words in the txt, unless txt is empty then it returns 0

function wordCount(txt) {
    if (txt.length === 0){
        return 0;
    } else{
        let str = cleanTxt(txt);
        return str.length;
    }
}

// Description: Computes the number of lines in the text
// Parameter: txt
// Returns: number of lines in the txt, unless txt is empty then it returns 0

function linesCount(txt){
    if (txt.length === 0){
        return 0;
    } else{
        return txt.split('\n').length;
    }
}

// Description: Computes the number of empty lines in the text
// Parameter: txt
// Returns: number of empty lines in the txt

function nonEmptyLines(txt){
    let count = (txt.match(/^\s*\S/gm) || "").length;
    return count;
}

// Description: Computes the max line length in the text
// Parameter: txt
// Returns: max line length in the txt
function maxLength(txt){
    let nLines = txt.split('\n');
    let i = 0;
    let max = nLines[0];
    
    while(i < nLines.length){
        if(max.length < nLines[i].length){
            max = nLines[i];
        }
        i++;
    }
    return max.length;
}

// Description: Computes the average word length in the text
// Parameter: txt
// Returns: average word length in the txt, unless txt is empty then it returns 0
function average(txt){
    if (txt.length === 0){
        return 0;
    } else{
        let strNoPunctuation = txtNoPunctuation(txt);
        let nWords = wordCount(strNoPunctuation);
        let wordArray = cleanTxt(strNoPunctuation);
        let wordAvg = 0;
        for (let i = 0; i < nWords; i++){
            wordAvg = wordAvg + wordArray[i].length;
        }
        let averageLenth = wordAvg / nWords;
        return averageLenth;
    }
}

// Description: Finds all the palindrome words in the text
// Parameter: txt
// Returns: array with all palindromes
function findPalindromes(txt){
    let originalArrayA = txtNoPunctuation(txt);
    let originalArrayB = cleanTxt(originalArrayA);
    
    let reverseArrayA = txt.split("").reverse().join("").split(" ").reverse().join(" ");
    let reverseArrayB = txtNoPunctuation(reverseArrayA);
    let reverseArrayC = cleanTxt(reverseArrayB);
    
    let palindrome = [];
    
    for (let i = 0; i < reverseArrayC.length; i++){
        for (let j = 0; j < originalArrayB.length; j++){
            if ((reverseArrayC[i] === originalArrayB[j]) && (originalArrayB[j].length > 1)){
                palindrome.push(originalArrayB[j]);
            }
        }
    }
    return palindrome;
}

// Description: Finds the first 10 longest words in the text
// Parameter: txt
// Returns: array with the 10 longest words
function findLongestWord(txt) {
    let strArrayA = txtNoPunctuation(txt);
    let strArrayB = cleanTxt(strArrayA);
    
    let orderedArray = strArrayB.sort(function (wordA, wordB){
           return  wordB.length - wordA.length || wordA.localeCompare(wordB);
    });
   
    let filterArray = orderedArray.filter((item, pos, ary) => {
           return !pos || item != ary[pos - 1];
    });

    return filterArray.filter((i, index) => (index < 10));
}

// Description: Finds most frequent words in the text
// Parameter: txt
// Returns: array with the forst 10 most frequent words + number of times it appears
function mostFrequent(txt){
    let dictionary = {};
    let wordLengths = [];
    let uniqueWords = [];
    let strArray = [];
    let word = "";
    let c;
   
    if(txt.length !== 0) {
        for (c of txt) {
            if (c.match(/^[0-9a-zA-Z]+$/)) {
                word += c;
            }else {
                if (word.length > 0) {
                    addToDictionary();
                }
            }
        }
        if (c.match(/^[0-9a-zA-Z]+$/)) {
            addToDictionary();
        }
    }

    let uniques = Object.keys(dictionary).map(function(key) {
         return [key, dictionary[key]];
    });
    
    uniques.sort(function(a, b) {
            return b[1] - a[1] || a[0].localeCompare(b[0]);
    });
    
    for (let i = 0; i < uniques.length; i++) {
        strArray.push(uniques[i][0] + "(" + uniques[i][1] + ")");
    }
    
    return strArray.filter((i, index) => (index < 10));
    
    function addToDictionary() {
        wordLengths.push(word.length);
        let wordCounter = wordCount(txt);
        wordCounter++;
        word = word.toLowerCase();
        if (uniqueWords.indexOf(word) === -1) {
            uniqueWords.push(word);
        }
        if (isNaN(dictionary[word])) {
            dictionary[word] = 1;
        }
        else {
            dictionary[word]++;
        }
        word = "";
    }
}

// Description: Helper function, that eliminates all punctuation from the text
// Parameter: txt
// Returns: txt without symbols
function txtNoPunctuation (txt){
    let strA = txt.toLowerCase();
    let strB = strA.replace(/[+]/g, " ");
    let strC = strB.replace(/[-]/g, "");
    let strD = strC.replace(/[:;.,!@#$%^&*()''""]/g, "");
    return strD;
}

// Description: Helper function, that eliminates regex from the text
// Parameter: txt
// Returns: txt without regex
function cleanTxt(txt){
    let str = txt.trim();
    let re = /\s+/g;
    return str.replace(re, " ").split(" ");
}
