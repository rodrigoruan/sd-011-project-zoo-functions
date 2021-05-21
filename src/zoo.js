/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { employees } = require('./data');
const data = require('./data');

// Task 1
// References:
// JS filter: https://www.w3schools.com/jsref/jsref_filter.asp
// JS includes: https://www.w3schools.com/jsref/jsref_includes.asp
// JS rest parameter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// JS arrow function: https://www.w3schools.com/js/js_arrow_function.asp
// Working with Objects: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

function getSpeciesByIds(...id) { // rest is used cause is various IDs
  // filter items that includes object.id key
  return data.species.filter((items) => id.includes(items.id));
}

// Task 2
// References:
// JS find: https://www.w3schools.com/jsref/jsref_find.asp
// JS every: https://www.w3schools.com/jsref/jsref_every.asp

function getAnimalsOlderThan(animals, age) {
  // finds the items that includes object.name key, which contains every residents (animals residents) with age >= especific age (as requisited parameter)
  return data.species.find((items) => animals.includes(items.name)).residents.every((items) => (items.age >= age));
}

// Task 3

function getEmployeeByName(employeeName) {
  if (employeeName) { // test if has a parameter passed
    // find the items that's has key FirstName and LastName equal to employeeName (which is a full name)
    return data.employees.find((items) => (items.firstName === employeeName || items.lastName === employeeName));
  } return {}; // otherwise, returns empty object
}

// Task 4
// References:
// JS Object.assign: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// ES6 Object.assign: https://googlechrome.github.io/samples/object-assign-es6/
// Obj Spread vs Obj Assign: https://stackoverflow.com/questions/32925460/object-spread-vs-object-assign

function createEmployee(personalInfo, associatedWith) {
  // passing the personalInfo and associatedWith, create employee's register
  // personalInfo contains Id, First Name and Last Name
  // associatedWith contains managers and responsibleFor
  // could be made as Object Spread too, like *return { ...personalInfo", ...associatedWith };
  return Object.assign(personalInfo, associatedWith);
}

// Task 5
// References:
// JS some: https://www.w3schools.com/jsref/jsref_some.asp
// Simplify your JavaScript: https://medium.com/poka-techblog/simplify-your-javascript-use-some-and-find-f9fb9826ddfd

function isManager(id) {
  // the some method checks if any element in the array pass a test
  // in this case, if employees contains the string managers including the ID
  // then return the managers's IDs
  // it's can't use method find, cause it's just returns the first item
  return data.employees.some(({ managers }) => managers.includes(id));
}

// Task 6
// References:
// Js push: https://www.w3schools.com/jsref/jsref_push.asp

// gets all info for employees needs as parameters
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // managers and resposibleFor has too many values, so it's declared as empty arrays
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// Task 7
// References:
// ForEach: https://www.w3schools.com/jsref/jsref_foreach.asp
// Ternary Operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
// How to use T.O.: https://www.programiz.com/javascript/ternary-operator

function countAnimals(species, aux) {
  let AllAnimals = {}; // just create a empty object

  // ForEach pass-through all animals by name key and count it based on residents.length
  aux = data.species.forEach((items) => { AllAnimals[items.name] = items.residents.length; });

  return species
    // if has a name in species parameter, find the quantity of this species
    // based on finding the items by name key equal to the species declared
    ? data.species.find((items) => items.name === species).residents.length
    // otherwise return all animals and his quantities
    : AllAnimals;
}

// Task 8
// References:
// JS reduce: https://www.w3schools.com/jsref/jsref_reduce.asp
// Reduce syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

function calculateEntry(entrants) {
  return entrants
    // acc = accumulator
    // if has entrants parameter, get all Object keys, reduce it a single value, which is the total price
    // where the accumulator recieves each prices from data.prices multiplies by number of entraces
    // which starts at value 0, and returns 0 if entrants is false
    ? Object.keys(entrants).reduce((acc, item) => (acc + (data.prices[item] * entrants[item])), 0)
    : 0;
}

// Task 9
// References:
// JS concat (array.prototype): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
// JS sort: https://www.w3schools.com/js/js_array_sort.asp
// Thanks to Rodolfo Resende - Team 11's explanation

const animalInfo = (residents, sorted, sex) => {
  // animal sex validation
  const names = residents.reduce((acc, item) => ((sex && item.sex !== sex)
    ? acc : acc.concat(item.name)), []);
  // if sorted is true, return names sorted, otherwise just return the name
  return sorted ? names.sort() : names;
};

// Objects as function argument: https://stackoverflow.com/questions/46224895/javascript-pass-object-as-function-argument
function getAnimalMap(options = {}) {
  let result = {};
  const locationSymbols = ['NE', 'NW', 'SE', 'SW'];

  // just a way to pass the locationSymbols to an object
  locationSymbols.forEach((item) => { result[item] = []; });

  // Thanks to Rodolfo Resend and Julio Filizzola from Team 11
  data.species.map((animal) => (options.includeNames
    // if includeNames is true
    // result recieves animal's name plus animalInfo
    ? result[animal.location].push({ [animal.name]: animalInfo(animal.residents, options.sorted, options.sex) })
    // if includeNames is false
    // otherwise result just recieves animal name
    : result[animal.location].push(animal.name)));

  return result;
}

// Task 10
// Obj entries: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
// lint prefer-destructuring: https://github.com/airbnb/javascript/issues/1791

function getSchedule(dayName) {
  let schedule = {};

  // conditional to get day and the data to set the schedule
  Object.entries(data.hours).forEach((items) => {
    // set the only day closed
    if (items[0] === 'Monday') schedule[items[0]] = 'CLOSED';
    // then set the days Open and the schedule
    else (schedule[items[0]] = `Open from ${items[1].open}am until ${items[1].close - 12}pm`);
  });

  // getDay
  // based on schedule, Object.entries makes a loop to find items relative to dayName declared in the parameter
  let getDay = Object.entries(schedule).find((items) => items[0] === dayName);

  // returns
  // if no dayName was declared, returns the entire schedule
  if (!dayName) return schedule;

  // return in a object the day and the message about the schedule
  return { [getDay[0]]: getDay[1] };
}

// Task 11
// Obj values: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values

function getOldestFromFirstSpecies(id) {
  // Find animals by the employees who are responsible for by ID
  let idAnimals = data.employees.find((items) => items.id === id).responsibleFor[0];

  // 1) find the idAnimals in data.species, 2) reduce the search for olders animals
  // running through species in Object values find id equal to animals filtered above
  const OlderAnimals = Object.values(data.species.find((items) => items.id === idAnimals)
    // and then, reduce the search above, making a ternary conditional to get the older animal by age (obviously)
    .residents.reduce((acc, item) => (acc.age > item.age ? acc : item)));

  return OlderAnimals;
}

// Task 12
// Obj keys: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

function increasePrices(percentage) {
  // get prices by keys
  const prices = Object.keys(data.prices);

  // add percentage to prices
  prices.forEach((items) => { data.prices[items] *= 1 + (percentage / 100); });

  // round the value
  prices.forEach((items) => { data.prices[items] = Math.round(data.prices[items] * 100) / 100; });
}

// Task 13
// Js map: https://www.w3schools.com/jsref/jsref_map.asp

function getEmployeeCoverage(idOrName) {
  let employeesCoverage = {}; // empty object
  // find's method searchs for all data, ie ID, firstName and lastName in data.employees
  let allData = data.employees.find((items) => items.id === idOrName || items.firstName === idOrName || items.lastName === idOrName);

  // employeesCoverage needs to recieves firstName and LastName of employees by animals responsible for.
  // but first, a test if parameter "idOrName" is undefined
  // if true, returns the list of all employees
  if (idOrName === undefined) {
    // make a loop into employees to get by map, making another object, finding animal name if ID is equal to your corresponding ID
    data.employees.forEach((items) => {
      employeesCoverage[`${items.firstName} ${items.lastName}`] = items.responsibleFor.map((animalID) => (data.species.find((animalData) => animalData.id === animalID)).name);
    });
    return employeesCoverage;
  }

  // if idOrName recieves something, return the specific employee's coverage
  employeesCoverage[`${allData.firstName} ${allData.lastName}`] = allData.responsibleFor.map((animalID) => (data.species.find((animalData) => animalData.id === animalID)).name);
  return employeesCoverage;
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
