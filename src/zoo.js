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

const { species: animalSpecies, employees } = require('./data');

const getSpeciesByIds = (...ids) => ids
  .map((id) => animalSpecies.find((animal) => animal.id === id));

const getAnimalsOlderThan = (animal, age) => animalSpecies
  .find((zooAnimal) => zooAnimal.name === animal).residents
  .every((resident) => resident.age >= age);

const getEmployeeByName = (employeeName) => (employeeName
  ? employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName)
  : {});

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => employees.some((employee) => employee.managers.includes(id));

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
