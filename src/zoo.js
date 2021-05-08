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

const { species, employees } = data;

function getSpeciesByIds(...ids) {
  // seu código aqui
  return species.filter((specie) => ids.some((id) => id === specie.id));
}
// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return species.find((specie) => specie.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (typeof employeeName === 'undefined') return {};
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(animal) {
  // seu código aqui
  if (typeof animal === 'undefined') {
    const object = {};
    species.forEach((specie) => { object[specie.name] = specie.residents.length; });
    return object;
  }
  return species.find((specie) => specie.name === animal).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, ageGroup) => acc + entrants[ageGroup] * data.prices[ageGroup], 0);
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
