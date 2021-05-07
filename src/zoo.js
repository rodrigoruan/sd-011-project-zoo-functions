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

const { species, employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const specieById = [];
  if (ids === null) { return specieById; }
  ids.forEach((id, index) => { specieById.push(species.find((specie) => specie.id === ids[index])); });
  return specieById;
}
function getAnimalsOlderThan(animal, age) {
  return species.find((animals) => animals.name === animal).residents.every((residente) => residente.age >= age);
}
function getEmployeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  // seu código aqui
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

function countAnimals() {
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
