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
  if (ids.length === 0) return ids;
  return ids.map((valueMap) => data.species.find((value) => (value.id === valueMap)));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((value) => (value.name === animal)).residents.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find((value) => (value.firstName === employeeName || value.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  if (data.employees.find((value) => (value.id === id)).managers.length === 1) return true;
  return false;
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (species === undefined) {
    const cont = {};
    data.species.forEach((value) => {
      cont[value.name] = value.residents.length;
      return undefined;
    });
    return cont;
  }
  return data.species.find((value) => value.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.values(entrants).length === 0) return 0;
  const keys = Object.keys(entrants);
  const values = Object.values(entrants);
  return keys.reduce((acc, currentValue, index) => {
    acc += (data.prices[currentValue] * values[index]);
    return acc;
  }, 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function transformHour(value) {
  return (value > 12) ? value - 12 : value;
}

function printAllDays() {
  const allDays = {};
  Object.keys(data.hours).forEach((value) => {
    const { open } = data.hours[value];
    const { close } = data.hours[value];
    if (open === 0 && close === 0) {
      allDays[value] = 'CLOSED';
      return undefined;
    }
    allDays[value] = `Open from ${transformHour(open)}am until ${transformHour(close)}pm`;
    return undefined;
  });
  return allDays;
}

function getSchedule(dayName) {
  if (dayName === undefined) return printAllDays();
  const allDays = {};
  const { open } = data.hours[dayName];
  const { close } = data.hours[dayName];
  if (open === 0 && close === 0) {
    allDays[dayName] = 'CLOSED';
    return allDays;
  }
  allDays[dayName] = `Open from ${transformHour(open)}am until ${transformHour(close)}pm`;
  return allDays;
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
