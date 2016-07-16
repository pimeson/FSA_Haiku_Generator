console.log("Haiku starting...")
var dictionary = require('./format');
var dict = dictionary.formattedDict;

var lines = []

var createHaiku= function(structure){
  var words = [];
  var finalHaiku = "";
  for(var syll in structure){
    //Use recursion to allow for multinested arrays-> polysyllabic structures, even though it would
    //only ever be at most 2 arrays deep.
    if(Array.isArray(structure[syll])){
      createHaiku(structure[syll])
    } else {
    //find appropriate words by # of structure[syll] dictated by the array
    var candidates = dict[structure[syll]].length;
    //generates random number dictated by length of the array, which can be used to access word
    var wordSelection = Math.floor((Math.random()*candidates)+1);
    var chosenWord = dict[structure[syll]][wordSelection];
    words.push(chosenWord);
    lines.push(chosenWord);
    finalHaiku+=' '+chosenWord;
    }
    finalHaiku+="\n";
  }
  console.log(words);
}

function haikuKeeper(structure){
  createHaiku(structure);
  console.log(lines);
}

haikuKeeper([[2,3],7,5]);

module.exports = {
  createHaiku: createHaiku,
};
