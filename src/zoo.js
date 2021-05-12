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
// JS rest parameter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parametersb
// JS arrow function: https://www.w3schools.com/js/js_arrow_function.asp
// Working with Objects: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

function getSpeciesByIds(...id) {
  return data.species.filter((items) => id.includes(items.id));
}

// Task 2
// References:
// JS find: https://www.w3schools.com/jsref/jsref_find.asp
// JS every: https://www.w3schools.com/jsref/jsref_every.asp

function getAnimalsOlderThan(animals, age) {
  return data.species.find((items) => animals.includes(items.name)).residents.every((items) => (items.age >= age));
}

// Task 3

function getEmployeeByName(employeeName) {
  if (employeeName) {
    return data.employees.find((items) => (items.firstName === employeeName || items.lastName === employeeName));
  } return {}; // empty object
}

// Task 4
// References:
// JS Object.assign: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// ES6 Object.assign: https://googlechrome.github.io/samples/object-assign-es6/
// Obj Spread vs Obj Assign: https://stackoverflow.com/questions/32925460/object-spread-vs-object-assign
// could be made as "return { ...personalInfo", ...associatedWith };" too.

function createEmployee(personalInfo, associatedWith) {
  // personalInfo contains Id, First Name and Last Name
  // associatedWith contains managers and responsibleFor
  return Object.assign(personalInfo, associatedWith);
}

// Task 5
// References:
// JS some: https://www.w3schools.com/jsref/jsref_some.asp

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

// Task 6
// References:
// Js push: https://www.w3schools.com/jsref/jsref_push.asp

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// Task 7
// References:
// ForEach: https://www.w3schools.com/jsref/jsref_foreach.asp
// Ternary Operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
// How to use T.O.: https://www.programiz.com/javascript/ternary-operator

function countAnimals(species, getAnimals) {
  let animals = {};
  getAnimals = data.species.forEach((items) => { animals[items.name] = items.residents.length; });
  return species
    ? data.species.find((items) => items.name === species).residents.length
    : animals;
}

// Task 8
// References:
// JS reduce: https://www.w3schools.com/jsref/jsref_reduce.asp

function calculateEntry(entrants) {
  return entrants
    // acc = accumulator
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

function getAnimalMap(options = {}) {
  let result = {};
  const locationSymbols = ['NE', 'NW', 'SE', 'SW'];

  locationSymbols.forEach((item) => { result[item] = []; });

  // Thanks to Rodolfo Resend and Julio Filizzola from Team 11
  data.species.map((animal) => (options.includeNames
    // if includeNames is true
    ? result[animal.location].push({ [animal.name]: animalInfo(animal.residents, options.sorted, options.sex) })
    // if includeNames is false
    : result[animal.location].push(animal.name)));

  return result;
}

// Task 10
// Obj entries: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
// lint prefer-destructuring: https://github.com/airbnb/javascript/issues/1791

const getSchedule = (dayName) => {
  let schedule = {};

  // conditional to get day and the data to set the schedule
  Object.entries(data.hours).forEach((items) => {
    if (items[0] === 'Monday') schedule[items[0]] = 'CLOSED';
    else (schedule[items[0]] = `Open from ${items[1].open}am until ${items[1].close - 12}pm`);
  });

  // getDay
  let getDay = Object.entries(schedule).find((items) => items[0] === dayName);

  // returns
  if (!dayName) return schedule;
  return { [getDay[0]]: getDay[1] };
};

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
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
