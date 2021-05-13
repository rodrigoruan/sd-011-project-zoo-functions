/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const { species, employees, prices } = require('./data');
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

function countAnimals(speciesToCount = undefined) {
  let allSpecies = {};
  if (speciesToCount !== undefined) {
    return species.find((object) => object.name === speciesToCount).residents.length;
  }
  species.forEach((object) => {
    allSpecies[object.name] = object.residents.length;
  });
  return allSpecies;
}

function calculateEntry(entrants = { Adult: 0, Senior: 0, Child: 0 }) {
  const keys = Object.keys(entrants);
  return keys.reduce((total, key) => total + (prices[key] * entrants[key]), 0);
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
