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

function getSpeciesByIds(...ids) {
  if (!ids.length) return [];
  const animals = ids.map((id) => data.species.find((specie) => specie.id === id));
  return animals;
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find(((specie) => specie.name === animal)).residents.every((actualAnimal) => actualAnimal.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName.length) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(i) {
  // seu código aqui
}

function addEmployee(identifier, firstName, lastName, managers, responsibleFor) {
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

function getOldestFromFirstSpecies(ides) {
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
