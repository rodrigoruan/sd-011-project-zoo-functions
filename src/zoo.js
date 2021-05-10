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

const { species, prices, hours } = require('./data');
const { employees } = require('./data');

const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((item) => ids.some((id) => item.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const animalFind = species.find((item) => item.name === animal);
  return animalFind.residents.every((item) => item.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((item) => item.firstName === employeeName || item.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return employees.some((item) => item.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  if (!specie) {
    const newObjAnimals = {};
    species.forEach((item) => { newObjAnimals[item.name] = item.residents.length; });
    return newObjAnimals;
  }
  return species.find((item) => item.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((accumulator, currentValue) => accumulator + (prices[currentValue] * entrants[currentValue]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const returnResult = {};
  const dayNames = {
    'Tuesday': 'Open from 8am until 6pm',
    'Wednesday': 'Open from 8am until 6pm',
    'Thursday': 'Open from 10am until 8pm',
    'Friday': 'Open from 10am until 8pm',
    'Saturday': 'Open from 8am until 10pm',
    'Sunday': 'Open from 8am until 8pm',
    'Monday': 'CLOSED' 
  }
  if (!dayName) return dayNames;
  if (dayName && dayName !== 'Monday') {
    returnResult[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
    return returnResult;
  }
  if (dayName === 'Monday') return { Monday: 'CLOSED' };
}
console.log(getSchedule())

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
