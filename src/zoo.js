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

function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species
    .find(((element) => element.name === animal))
    .residents
    .every((specie) => specie.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};

  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(speciess) {
  if (speciess) {
    return data.species.find(({ name }) => name === speciess).residents.length;
  }
  return data.species.reduce((acc, curr) => { acc[curr.name] = curr.residents.length; return acc; }, {});
}

function calculateEntry(entrants) {
  let total = 0;
  if (entrants) {
    const entrantKeys = Object.keys(entrants);
    entrantKeys.forEach((key) => { total += data.prices[key] * entrants[key]; });
  } return total;
}

function getAnimalMap(options) {
}

function getSchedule(dayName) {
  let hoursOpenMatrix = [];
  let hoursCloseMatrix = [];
  let answer = {};
  (Object.values(data.hours).reduce((index, value) => {
    hoursOpenMatrix[index] = value.open;
    hoursCloseMatrix[index] = value.close - 12;
    return index + 1;
  }, 0));
  Object.keys(data.hours).reduce((index, days) => {
    answer[days] = (`Open from ${hoursOpenMatrix[index]}am until ${hoursCloseMatrix[index]}pm`);
    return index + 1;
  }, 0);
  answer.Monday = 'CLOSED';
  if (!dayName) {
    return answer;
  }
  return { [dayName]: answer[dayName] };
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
