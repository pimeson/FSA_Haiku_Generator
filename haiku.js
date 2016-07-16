console.log("Haiku starting...")
var dictionary = require('./format');
var dict = dictionary.formattedDict;



function createHaiku(structure){
  var storage = ""
  var haikuKeeper= function(structure){
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
      storage+=(chosenWord+' ');
      if(structure[syll]>=5){
        storage+="\n";
      }
      }
    }
  }
  haikuKeeper(structure);
  console.log(storage);
}

module.exports = {
  createHaiku: createHaiku,
};
