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
  const find = (SpeciesId) => data.species.find((element) => element.id === SpeciesId);
  const mapIds = (array) => array.map((id) => find(id));
  return mapIds(ids);
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const findResidents = data.species.find((element) => element.name === animal).residents;
  const checkAge = findResidents.every((element) => (element.age >= age));
  return checkAge;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  const findEmployee = data.employees.find((element) => element.firstName === employeeName || element.lastName === employeeName);
  return (employeeName === undefined) ? {} : findEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
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
