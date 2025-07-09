//All javascripts methods used Frequently

//foreach => doesn't creates a new array
const myArr = [1, 2, 3];
myArr.forEach(num => (num * 2));

//map => creates a new array
const my2Arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const my2doubleArr = my2Arr.map(a => a * 2);

//filter => return a new array that matches the condition
const nums = [1, 2, 3, 4, 5];
const evenNums = nums.filter(x => x % 2 === 0);

//reduce => reduces the array to a single value (sum, object, array, etc.)
const numbers = [1, 2, 3, 4];
const sumNums = numbers.reduce((acc, curr) => acc + curr, 0);

//find => returns the first element that matches the condition
const found = [1, 2, 3, 4].find(x => x > 2);

//findIndex => returns the index of the first match. return -1 if not found
const idx = ['a', 'b', 'c'].findIndex(x => x === 'b');

//some => return true if atleast one element satisfies the condition
const hasNegative = [1, 2, -3, 4, 5].some(x => x < 0);

//every => return true if all elements satisfies the condition.
const allPositive = [1, 2, 3].every(x => x > 0);

//sort => sorts the array in place 
const sortNum = [3, 53, 0, 2, 4, 3].sort();
const sortLetters = ['b', 'e', 'a', 'd'].sort()

//reverse => reverse the array in place
const reverseArr = [1, 2, 3].reverse();

//flat => flattens nested array to a single level 
const flatNestedArr = [1, [2, [3]]].flat(2);

//flatMap => combination of map followed by flat()
const flatMapArr = [1, 2, 3].flatMap(x => [x, x * 2]);

// // creating and converting arrays

//Array.from() => Converts array-like or iterable objects to real arrays
const newArr = Array.from('avcfad');

//Array.of() => Creates a new array from arguments
const letArr = Array.of(1, 2, 3)

// // other useful methods

//includes => check if an element exist in the array
const checkElement = [1, 2, 3].includes(2);

//splice() => add/remove item in place modifies original array
let tempArr = [1, 2, 3];
tempArr.splice(1, 1)

//slice() => return a shallow copy of a portion of an array
const tArr = [1, 2, 3, 4].slice(1, 3);

//Create an array of numbers from 1 to 10 and return a new array with each number doubled using map.
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const doubleArr = arr.map(a => a * 2);

//From an array of student objects (with name and marks), filter out the students who scored more than 90.
const student = [{ name: 'Aman', marks: 88 }, { name: 'Ayush', marks: 90 }, { name: 'Om', marks: 92 }, { name: 'Nikhil', marks: 95 }]
const scoredStudents = student.filter(s => s.marks > 90);

//Reduce an array of expenses to calculate the total
const expenses = [200, 300, 150, 400, 250];
const totalExpenses = expenses.reduce((acc, expense) => acc + expense, 0);


// objects(creation, property access, destructuring)

// q1: Create an object for a user with properties name, semester, and course. Access and print each value.
const obj = {
  name: 'Aman',
  semester: 3,
  course: 'Bsc.Computer Science'
}
// //uncomment this to see answer
//console.log(`User name is ${obj.name}. persuing ${obj.course} and currently in ${obj.semester} semester`);

// q2:Use object destructuring to extract the name and semester from a user object. // using the previous object
const name = obj.name;
const semester = obj.semester;
// or
// const {name, semester} = obj;

// q3:Create a nested object representing a company and access the name of the CEO inside it.
const company = {
  companyName: 'D-mart',
  location: 'New York',
  ceo: {
    name: 'Aman Singh',
    age: 20,
    experience: '1 year'
  },
  departments: {
    engineering: {
      head: "Bob Smith",
      employees: 100
    },
    marketing: {
      head: "Sara Lee",
      employees: 40
    }
  }
}

const ceoName = company.ceo.name;


// this Keyword 

// q1: Create an object with a method that logs this.name. Call the method and explain what this refers to.
const newObj = {
  name: 'Aman',
  age: 20,
  greet() {
    // console.log('hi, I am '+ this.name);    
  }
}
// newObj.greet();

// q2: Create a function using this inside a regular function and then the same using arrow function — what’s the difference?
//ans = inside a regular function this works normal and log the answer but in arrow function they don't have their own this they use this from surrounding (lexical) scopes

// q3: Inside an event listener on a button, what does this refer to?


// ES6+ Features 

// q1:Use the spread operator to combine two arrays and remove duplicate elements.
const arr1 = [1, 2, 3]
const arr2 = [3, 4, 5]
const combinedUniqueArr = [...new Set([...arr1, ...arr2])];

// q2:Use rest parameters to create a function that takes any number of arguments and returns their sum.
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
// console.log(sum(1,2,3,4,5));

// q3:Write a template literal that embeds variables inside a sentence.
const fullName = "Aman Singh";
// console.log(`Hello, ${fullName}!`);


//Callback functions

// q1: Write a function that takes another function as an argument and calls it after 2 seconds.
function callAfter2sec(callback) {
  setTimeout(() => {
    callback();
  }, 2000);
}
function hello() {
  // console.log('hello after 2 sec');  
}
callAfter2sec(hello)

// q2: Simulate a basic loading process using a callback that is called once loading is "done".
function loading() {
  // console.log('loading....');
  setTimeout(() => {
    // console.log('loading complete !!');
  }, 2000);
};
loading()

// q3: Use a callback inside a loop to greet each user in an array one by one.
usersArr = ['Om', 'Nikhil', 'Anurag', 'Sayak', 'Yuvraj', 'Ashutosh', 'Priyanshu'];

function greetEveryone(name) {
  // console.log(`hello ${name}, welcome!!`);
}

function sayHello2users(users, callback) {
  for (let i = 0; i < usersArr.length; i++) {
    callback(users[i])
  }
}

sayHello2users(usersArr, greetEveryone);


// Promises
//q1: Create a fake getUserData function that returns a Promise which resolves after 2 seconds.
function getUserData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Aman',
        email: 'ajk@gmail.com'
      })
    }, 2000);
  })
}
getUserData().then(user => {
  // console.log('user data: ',user);
});

//q2: Chain .then() to a promise and log multiple stages like "Fetching...", "Received", and "Processed".


//q3: Handle a failed Promise using .catch() and show a custom error message.
// function func() {
//   return new Promise((resolve, reject) => {
//     const shouldFail = Math.random() < 0.5

//     if (shouldFail) {
//       reject(new Error('Filed to fetch user data..'))
//     } else {
//       resolve({
//         id: 1,
//         name: 'John Doe',
//         email: 'john.doe@example.com'
//       });
//     }
//   })
//     .then(console.log('hello'))
//     .catch(error => {
//       console.error("❌ Error: Unable to retrieve user data. Please try again later.")
//     })
// }


//