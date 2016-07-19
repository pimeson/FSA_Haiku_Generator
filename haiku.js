console.log("Haiku starting...")
var dictionary = require('./format');
var dict = dictionary.formattedDict;



function createHaiku(structure){
  var syllableCount = 0;
  var haiku = ""
  var haikuKeeper= function(structure){
    for(var syll in structure){
      // //Use recursion to allow for multinested arrays-> polysyllabic structures, even though it would
      // //only ever be at most 2 arrays deep.
      // if(Array.isArray(structure[syll])){
      //   createHaiku(structure[syll])
      // } else {
      //find appropriate words by # of structure[syll] dictated by the array
      var candidates = dict[structure[syll]].length;
      syllableCount += structure[syll];
      //generates random number dictated by length of the array, which can be used to access word
      var wordSelection = Math.floor((Math.random()*candidates)+1);
      haiku+=dict[structure[syll]][wordSelection]+' ';
      if(syllableCount===5||syllableCount===12){
        haiku+="\n"
      }
    }
    return haiku
  }
  console.log(haikuKeeper(structure));
}

createHaiku([5,7,5]);

module.exports = {
  createHaiku: createHaiku,
};
