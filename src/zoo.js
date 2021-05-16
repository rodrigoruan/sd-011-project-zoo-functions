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
const { species, employees, hours } = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((Species) => ids.some((id) => Species.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((el) => el.name.includes(animal))
    .residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees
    .find((el) => el.firstName === employeeName || el.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo,
    firstName: personalInfo,
    lastName: personalInfo,
    managers: associatedWith,
    responsibleFor: associatedWith,
  };
}

function isManager(id) {
  return data.employees.some((el) => el.manegers.includes(id));
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
