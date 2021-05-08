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
const { species, employees } = require('./data');

function getSpeciesByIds(...ids) {
  const animals = ids.reduce((acc, elemento) => acc.concat(species.find((element) => element.id === elemento)), []);
  return animals;
}

function getAnimalsOlderThan(animal, age) {
  const minAge = species.find((animais) => animais.name === animal).residents.every((idades) => idades.age >= age);
  return minAge;
}

function getEmployeeByName(employeeName) {
  const employee = employees.find((element) => element.firstName === employeeName || element.lastName === employeeName);
  return (employee === undefined) ? {} : employee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const manage = employees.some((employee) => employee.managers.includes(id));
  return manage;
}
console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
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
