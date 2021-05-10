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
  const arrSpecies = species.filter((specie) => ids.includes(specie.id));
  return arrSpecies;
}

function getAnimalsOlderThan(animal, age) {
  const animalsArr = species.filter((specie) => specie.name === animal)[0].residents;
  return animalsArr.every((animal1) => animal1.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName) {
    return data.employees.filter((employee) => employeeName === employee.firstName || employeeName === employee.lastName)[0];
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // const newEmployee = { id,
  //   firstName,
  //   lastName,
  //   managers,
  //   responsibleFor,
  // };
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
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
