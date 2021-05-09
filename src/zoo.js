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
  return data.species.filter((specie) => ids.includes(specie.id));
}

getSpeciesByIds();
function getAnimalsOlderThan(animal, age) {
  const mySpecie = data.species.find((specie) => specie.name === animal);
  return mySpecie.residents.every((myAge) => myAge.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const firstLastName = data.employees.find((names) => names.firstName === employeeName || names.lastName === employeeName);
  return firstLastName;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((management) => management.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObj = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return newObj;
}

function countAnimals(species) {
  return data.species;
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
