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

const {
  species,
  employees,
} = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return species.filter((filterid, index) => filterid.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const anm = species.find((animall) => animall.name === animal);
  const result = anm.residents.every((elem) => elem.age > age);
  return result;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  let result = employees.filter((name) => name.firstName === employeeName || name.lastName === employeeName)[0];
  if (result === undefined) return {};
  return result;
}

console.log(getEmployeeByName());

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(speciess) {
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
