// values() function
const arr = ['cherry','banana','apple']
const iterator = arr.values();

// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());


for (const value of iterator) {
    console.log(value);
}



console.log(`\n${'#'.repeat(100)}\n`);



// length property
console.log(`Array length is : ${arr.length}`);


//reverse() function

const numbers = [1,2,30,4,5,6,7,10]
console.log(`Array of numbers in the reversed order : ${numbers.reverse()}`);



//sort() function

console.log(arr.sort());
console.log(numbers.sort((a,b)=> a-b ));


//at(parameter: index of wanted element) function

console.log(arr.at(2));



// fill(value to fill with, start index, end index[not included]) function


arr.fill('avocado',1,3)
console.log(arr);


arr.fill('orange',1,2)
console.log(arr);


// from() function
console.log(Array.from('sabah'));
console.log(Array.from({0:'apple',1: 'banana',2: 'cherry',length: 3}));



