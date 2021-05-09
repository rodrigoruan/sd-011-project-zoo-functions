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
  return data.species.filter((value) => ids.some((idValue) => idValue === value.id));
}

function getAnimalsOlderThan(animal, age) {
  const animalsArray = species.filter((value) => value.name === animal);
  return animalsArray[0].residents.every((value2) => value2.age >= age);
}

function getEmployeeByName(employeeName) {
  const retorno = employees.filter((value) => value.firstName === employeeName || value.lastName
  === employeeName);
  if (employeeName === undefined) {
    return {};
  }
  return retorno[0];
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
  const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
  const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
  const managers = [stephanieId, burlId, olaId];
  const employee = employees.find((value) => value.id === id);
  return managers.some((value2) => value2 === employee.id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(speciesx) {
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
