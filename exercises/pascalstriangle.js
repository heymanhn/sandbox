/***********

        1
      1   1
    1   2   1
  1   3   3   1
1   4   6   4   1

Base case:
- If row 0, answer is 1

For row 1
(1,0) = (0,0)
(1,1) = (0,0)


For row 4
(4,0) = (3,0)
(4,1) = (3,0) + (3,1)
(4,2) = (3,1) + (3,2)
(4,3) = (3,2) + (3,3)
(4,4) = (3,3)

***********/

var pascal = function(rows) {
  if (rows === 1) {
    var row = [1];
  } else {
    var previousRow = pascal(rows - 1);
    var row = [];

    for (var i = 0; i < rows; i++) {
      if (i === 0 || i === rows - 1 ) {
        row.push(1);
      } else {
        row.push(previousRow[i-1] + previousRow[i]);
      }
    }
  }

  console.log('Row ' + rows + ': ' + row);
  return row;
};

pascal(8);
