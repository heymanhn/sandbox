function mostCommonString(strings) {
  // Iterate through `strings` and count occurrences of each string, store
  // in a separate object
  var commonStrings = {};

  strings.forEach(function(string) {
    if (commonStrings[string] === undefined) {
      commonStrings[string] = 1;
    } else {
      commonStrings[string]++;
    }
  });

  // Find the max entry in the new object, return the key
  var maxEntry, maxValue = 0;
  for (commonString in commonStrings) {
    if (commonStrings[commonString] > maxValue) {
      maxValue = commonStrings[commonString];
      maxEntry = commonString;
    }
  }

  return maxEntry;
}

var strings = [
  'Herman',
  'Mochi',
  'Herman',
  'Bee',
  'Bee',
  'Virginia',
  'Amelia',
  'Jeff',
  'Amelia',
  'Virginia',
  'Virginia',
  'Herman',
  'Mochi',
  'Virginia'
];

console.log(mostCommonString(strings));
