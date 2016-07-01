/*

Use memoization. Keep track of an array of results. memo[0] corresponds to the
first fibonacci number, ..., memo[n]. Calculate and store memo[i] so that the
next recursive iteration can use it.

*/

function fib(n) {
  if (n === 1) {
    return [1];
  } else {
    var memo = fib(n-1);

    if (n === 2) {
      memo[n-1] = 1;
    } else {
      memo[n-1] = memo[n-2] + memo[n-3];
    }

    return memo;
  }
}

console.log(fib(process.argv[2]));
