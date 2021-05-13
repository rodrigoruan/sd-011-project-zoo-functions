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
  const employee = employees.find((object) => object.firstName === employeeName || object.lastName === employeeName);
  const selectedEmployee = employee === undefined ? {} : employee;
  return selectedEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return employees.some((object) => object.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  let newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
  return employees;
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
