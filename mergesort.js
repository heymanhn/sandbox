'use strict';

function mergeSort(input, cb) {
  if (input.length === 1) {
    return cb(input);
  } else {
    return cb(merge(input));
  }
}

function merge(input) {
  if (input.length === 1) {
    return input;
  }

  var left = merge(input.slice(0, input.length / 2));
  var right = merge(input.slice(input.length / 2));

  // Combine the two sorted subarrays
  var leftIndex = 0;
  var rightIndex = 0;
  var combined = [];
  for (var i = 0; i < input.length; i++) {
    var leftValue = left[leftIndex];
    var rightValue = right[rightIndex];

    if (!leftValue) {
      combined = combined.concat(right.slice(rightIndex));
      break;
    }
    if (!rightValue) {
      combined = combined.concat(left.slice(leftIndex));
      break;
    }

    if (leftValue <= rightValue) {
      combined.push(leftValue);
      leftIndex++;
    } else {
      combined.push(rightValue);
      rightIndex++;
    }
  }

  return combined;
}

var inputArray = [51,2,18,10,86,3,15,63,9,44,27,56,31];
mergeSort(inputArray, function(result) { console.log("Result: " + result); });
