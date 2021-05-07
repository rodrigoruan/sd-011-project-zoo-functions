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
const { employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return ids.map((animalId) => species.find(({ id }) => id === animalId));
}

function getAnimalsOlderThan(animal, animalAge) {
  // seu código aqui
  return species.find(({ name }) => name === animal).residents.every(({ age }) => age > animalAge);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  return employeeName ? employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  
}
// console.log(createEmployee());

function isManager(id) {
  // seu código aqui
  let employee = employees.find((employee) => employee.id === id);
  return (employee.firstName === 'Stephanie' || employee.firstName === 'Ola' || employee.firstName === 'Burl');
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(speciesS) {
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
