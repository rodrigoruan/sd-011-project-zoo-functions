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

const { species, employees, prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const returnArray = species.filter((specie) => (ids === undefined ? [] : ids.some((id) => specie.id === id)));
  return returnArray;
}
function getAnimalsOlderThan(animal, age) {
  const animalName = species.find((specie) => specie.name === animal);
  const ageTest = animalName.residents.every((residents) => residents.age > age);
  return ageTest;
}

function getEmployeeByName(employeeName) {
  const returnEmployee = employeeName === undefined ? {} : employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return returnEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const getById = employees.find((employee) => employee.id === id);
  const isAManager = getById.managers.length <= 1;
  return isAManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees[employees.length] = newEmployee;
  return employees;
}

function countAnimals(speciess) {
  // if (speciess === undefined) {
  //   const all = species.map((specie) => { [specie.name] = [specie.residents.length] });
  //   const sortedArray = all.sort();
  //   return sortedArray;
  // }
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  } const keys = Object.keys(entrants);
  let accumulator = 0;
  keys.forEach((key) => { accumulator += data.prices[key] * entrants[key]; });
  return accumulator;
}
//   return total;
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
