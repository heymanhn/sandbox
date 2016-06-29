/*
 * Calculate n factorial
 */
function fact(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * fact(n-1);
  }
}

console.log(fact(parseInt(process.argv[2])));
