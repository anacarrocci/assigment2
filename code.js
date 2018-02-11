//
// this is just a stub for a function you need to implement
//
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

function charCount(txt){
    return txt.length;
}

function linesCount(txt){
    return txt.split('\n').length;
}

function wordCount(txt) {
    let str = cleanTxt(txt);
    return str.length;
}

function nonEmptyLines(txt){
    let count = (txt.match(/^\s*\S/gm) || "").length;
    return count;
}

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

function average(txt){
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

function findLongestWord(txt) {
    let strArrayA = txtNoPunctuation(txt);
    let strArrayB = cleanTxt(strArrayA);
    
    let orderedArray = strArrayB.sort((wordA, wordB) => {
           return wordA.length < wordB.length;
    });
   
    let filterArray = orderedArray.filter((item, pos, ary) => {
           return !pos || item != ary[pos - 1];
    });
   
    return filterArray.filter((i, index) => (index <= 10));
}

function mostFrequent(txt){
//    var obj = {}, mostFreq = 0, which = [];


    let wordCounts = { };
    let wordsA = txtNoPunctuation(txt);
    let wordsB = cleanTxt(wordsA);
    let arr = [];
    for(let i = 0; i < wordsB.length; i++){
        wordCounts[wordsB[i]] = (wordCounts[wordsB[i]] || 0) + 1;
    }
//        for(let j in wordCounts[wordsB[i]]) {
//            if (wordCounts.hasOwnProperty(j)){
//                arr.push(wordCounts[wordsB[j]]|| 0) + 1;
//            }
//        }
//    }

    return wordCounts.from(); //filter((i, index) => (index <= 10));
}

//    wordsB.forEach(ea => {
//        if (!obj[ea]) {
//            obj[ea] = 1;
//        } else {
//            obj[ea]++;
//        }
//        if (obj[ea] > mostFreq) {
//            mostFreq = obj[ea];
//            which = [ea];
//        } else if (obj[ea] === mostFreq) {
//            which.push(ea);
//        }
//    });
//
//    return which;
//}


function txtNoPunctuation (txt){
    let strA = txt.toLowerCase();
    let strB = strA.replace(/[+]/g, " ");
    let strC = strB.replace(/[-]/g, "");
    let strD = strC.replace(/[:;.,!@#$%^&*()''""]/g, "");
    return strD;
}

function cleanTxt(txt){
    let str = txt.trim();
    let re = /\s+/g;
    return str.replace(re, " ").split(" ");
}
