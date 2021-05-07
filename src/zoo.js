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
const { species } = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((animal) => animal.id === id));
}

// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

function getAnimalsOlderThan(animal, age) {
  const selectedSpecie = species.find((specie) => specie.name === animal);
  const ageAnimal = selectedSpecie.residents.every((animals) => animals.age >= age);
  return ageAnimal;
}

// console.log(getAnimalsOlderThan('penguins', 10));
const { employees } = require('./data');

function getEmployeeByName(employeeName) {
  const employerByFirstName = employees.find((employer) => employer.firstName === employeeName);

  const employerByLastName = employees.find((employer) => employer.lastName === employeeName);

  return employerByFirstName || employerByLastName || {};
}

// console.log(getEmployeeByName('Nigel'));

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
