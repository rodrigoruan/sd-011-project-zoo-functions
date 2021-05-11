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

const { species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const selectedSpecies = [];
  ids.forEach((value) => {
    let currentSpecie = species.find((object) => object.id === value);
    selectedSpecies.push(currentSpecie);
  });
  return selectedSpecies;
}

function getAnimalsOlderThan(animal, age) {
  const selectedAnimal = species.find((object) => object.name === animal);
  return selectedAnimal.residents.every((object) => object.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
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

function countAnimals(speciesToCount) {
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
