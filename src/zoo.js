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
  return ids ? data.species.filter(({ id: speciesId }) => ids.some((givenId) => givenId === speciesId)) : [];
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find(({ name: speciesName }) => speciesName === animal).residents.every(({ age: animalAge }) => animalAge > age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  return employeeName ? data.employees.find(({ firstName, lastName }) => (employeeName === firstName || employeeName === lastName)) : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(({ managers }) => managers.some((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  return species ? data.species.find(({ name }) => name === species).residents.length : data.species.reduce(((result, { name: speciesName, residents }) => ({ ...result, [speciesName]: residents.length })), {});
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
