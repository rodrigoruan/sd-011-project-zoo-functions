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

// References:
// JS filter: https://www.w3schools.com/jsref/jsref_filter.asp
// JS includes: https://www.w3schools.com/jsref/jsref_includes.asp
// JS rest parameter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parametersb
// JS arrow function: https://www.w3schools.com/js/js_arrow_function.asp
// Working with Objects: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

function getSpeciesByIds(...id) {
  return data.species.filter((items) => id.includes(items.id));
}

// JS find: https://www.w3schools.com/jsref/jsref_find.asp
// JS every: https://www.w3schools.com/jsref/jsref_every.asp

function getAnimalsOlderThan(animals, age) {
  return data.species.find((items) => animals.includes(items.name)).residents.every((items) => (items.age >= age));
}

function getEmployeeByName(employeeName) {
  if (employeeName) {
    return data.employees.find((items) => (items.firstName === employeeName || items.lastName === employeeName));
  } return {}; // empty object
}

// JS Object.assign: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// ES6 Object.assign: https://googlechrome.github.io/samples/object-assign-es6/
// Obj Spread vs Obj Assign: https://stackoverflow.com/questions/32925460/object-spread-vs-object-assign

function createEmployee(personalInfo, associatedWith) {
  // personalInfo contains Id, First Name and Last Name
  // associatedWith contains managers and responsibleFor
  return Object.assign(personalInfo, associatedWith);
}

// JS some: https://www.w3schools.com/jsref/jsref_some.asp

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(species) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

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
