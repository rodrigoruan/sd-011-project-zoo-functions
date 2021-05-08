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

const arrayOfAnimals = data.species;
const arrayOfEmployees = data.employees;

function getSpeciesByIds(...ids) {
  return arrayOfAnimals.filter((animals) => ids.includes(animals.id));
}

function getAnimalsOlderThan(animal, age) {
  return arrayOfAnimals.find((object) => object.name === animal).residents.every((element) => element.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return arrayOfEmployees.find((object) => object.firstName === employeeName || object.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return arrayOfEmployees.some((adm) => adm.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  arrayOfEmployees.push({ id, firstName, lastName, managers, responsibleFor });
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
