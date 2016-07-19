var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){
   //Make an object of arrays, with keys being the number of syllables present on array
   var syllableDict = {};
   var lines = data.toString().split("\n"),
       lineSplit
   lines.forEach(function(line){
    //cmuDicts seperates the word from its phonetics with a unique double space, can split
    //creating an array of ['word','phonetics'];
    lineSplit = line.split("  ");
    //Eliminate bogus values, regex excludes duplicates and weird ^ words
    if(lineSplit!=null&&lineSplit[1]!=undefined&&(lineSplit[0].match(/\d/)===null)){
    //Can count the number by using regex finding phonetics with numbers on them
    var syllableArray = lineSplit[1].match(/\d/g);
    if(syllableArray!=null){
      var syllableCount = syllableArray.length
      //Need to populate syllableDict with keys, checks if any previous word triggered a new key
      if(syllableDict[syllableCount]===undefined){
        syllableDict[syllableCount] = [lineSplit[0]];
      } else {
        //If key exists, add word to existing array
        syllableDict[syllableCount].push(lineSplit[0]);
      }
    }
  }
  });
  return syllableDict;
}

var formattedDict = formatData(cmudictFile);

module.exports = {
  formattedDict : formattedDict
};
