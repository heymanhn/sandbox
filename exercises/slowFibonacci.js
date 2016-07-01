var nums = [];

function fib(n) {
  if (n === 1 || n === 2) {
    var num = 1;
  } else {
    var num = fib(n-1) + fib(n-2);
  }

  return num;
}

console.log(fib(process.argv[2]));
