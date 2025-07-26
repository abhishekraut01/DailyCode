const number = 10000000000;

let sum = 0;
const startTime = new Date().getTime();
for (let i = 0; i < number; i++) {
  sum += i;
}
const endTime = new Date().getTime();

console.log(sum);
console.log(`Total time: ${(endTime - startTime) / 1000} seconds`);
