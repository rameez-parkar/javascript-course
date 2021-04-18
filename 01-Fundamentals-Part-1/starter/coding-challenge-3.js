// Coding Challenge #3

// There are two gymnastics teams, Dolphins and Koalas. They compete against each
// other 3 times. The winner with the highest average score wins a trophy!

// Your tasks:
// 1. Calculate the average score for each team, using the test data below
// 2. Compare the team's average scores to determine the winner of the competition,
// and print it to the console. Don't forget that there can be a draw, so test for that
// as well (draw means they have the same average score)
// 3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
// team only wins if it has a higher score than the other team, and the same time a
// score of at least 100 points. Hint: Use a logical operator to test for minimum
// score, as well as multiple else-if blocks 😉
// 4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
// both teams have the same score and both have a score greater or equal 100
// points. Otherwise, no team wins the trophy

// Test data:
// - Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
// - Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
// - Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106


// HIGHER AVG SCORE WINS

console.log('-----------HIGHER AVG SCORE WINS-----------');

let dolphins1 = 96;
let dolphins2 = 108;
let dolphins3 = 89;

let koalas1 = 88;
let koalas2 = 91;
let koalas3 = 110;

let dolphinsAvg = (dolphins1 + dolphins2 + dolphins3) / 3;
let koalasAvg =  (koalas1 + koalas2 + koalas3) / 3;

console.log(`DOLPHINS: ${dolphins1} | ${dolphins2} | ${dolphins3} : ${dolphinsAvg}
KOALAS: ${koalas1} | ${koalas2} | ${koalas3} : ${koalasAvg}`);
if(dolphinsAvg > koalasAvg) {
  console.log(`DOLPHINS WIN!!🎊`);
}
else if(dolphinsAvg < koalasAvg) {
  console.log('KOALAS WIN!!🎊');
}
else {
  console.log(`IT'S A DRAW!!😐`);
}

// HIGHER AVG SCORE AND A MINIMUM OF 100 POINTS WINS

console.log('-----------HIGHER AVG SCORE AND A MINIMUM OF 100 POINTS WINS-----------');

dolphins1 = 97;
dolphins2 = 112;
dolphins3 = 101;

koalas1 = 109;
koalas2 = 95;
koalas3 = 123;

dolphinsAvg = (dolphins1 + dolphins2 + dolphins3) / 3;
koalasAvg =  (koalas1 + koalas2 + koalas3) / 3;

console.log(`DOLPHINS: ${dolphins1} | ${dolphins2} | ${dolphins3} : ${dolphinsAvg}
KOALAS: ${koalas1} | ${koalas2} | ${koalas3} : ${koalasAvg}`);

if(dolphinsAvg > koalasAvg && dolphinsAvg >= 100) {
  console.log(`DOLPHINS WIN!!🎊`);
}
else if(dolphinsAvg < koalasAvg && koalasAvg >= 100) {
  console.log('KOALAS WIN!!🎊');
}
else if(dolphinsAvg === koalasAvg){
  console.log(`IT'S A DRAW!!😐`);
}


// HIGHER AVG SCORE AND ONLY IF BOTH TEAMS WITH MINIMUM OF 100 POINTS

console.log('-----------HIGHER AVG SCORE AND ONLY IF BOTH TEAMS WITH MINIMUM OF 100 POINTS-----------');

dolphins1 = 97;
dolphins2 = 112;
dolphins3 = 101;

koalas1 = 109;
koalas2 = 95;
koalas3 = 106;

dolphinsAvg = (dolphins1 + dolphins2 + dolphins3) / 3;
koalasAvg =  (koalas1 + koalas2 + koalas3) / 3;

console.log(`DOLPHINS: ${dolphins1} | ${dolphins2} | ${dolphins3} : ${dolphinsAvg}
KOALAS: ${koalas1} | ${koalas2} | ${koalas3} : ${koalasAvg}`);

if(dolphinsAvg > koalasAvg && dolphinsAvg >= 100) {
  console.log(`DOLPHINS WIN!!🎊`);
}
else if(dolphinsAvg < koalasAvg && koalasAvg >= 100) {
  console.log('KOALAS WIN!!🎊');
}
else if(dolphinsAvg === koalasAvg && dolphinsAvg >= 100 && koalasAvg >= 100) {
  console.log(`BOTH WIN THE TROPHY!!🏆`);
}
else {
  console.log(`NO ONE WINS THE TROPHY!!😢`);
}