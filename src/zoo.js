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

const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((element) => ids.includes(element.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((element) => animal.includes(element.name)).residents.every((element) => element.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  return employeeName ? data.employees.find((element) => element.firstName === employeeName || element.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  return data.employees.reduce((acc, curr) => `${acc}${curr.managers},`, []).split(',').some((element) => element === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  // https://stackoverflow.com/questions/56195959/return-object-from-map-function-not-array (O QUE ESTE ,acc depois do y.length faz???)
  // const allAnimals = data.species.reduce((acc, { name: x, residents: y }) => (acc[x] = y.length, acc), {});
  let arrayAnimals = {};
  const allAnimals = data.species.forEach((element) => { arrayAnimals[element.name] = element.residents.length; });
  return species ? data.species.find((element) => element.name === species).residents.length : arrayAnimals;
}

console.log(countAnimals());

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
