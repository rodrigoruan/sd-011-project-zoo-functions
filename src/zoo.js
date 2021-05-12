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
  return species.filter((value, index) => value.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  return species.find((animalFind) => (animalFind.name === animal)).residents.every((check) => check.age > age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((value) => value.firstName === employeeName || value.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some((value) => value.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  if (!specie) {
    const object = {};
    species.forEach((value) => {
      object[value.name] = value.residents.length;
    });
    return object;
  }

  return species.find((value) => value.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, curr) => acc + (entrants[curr] * prices[curr]), 0);
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
  let result = {};
  const idName = (id) => species.find((value) => value.id === id).name;

  if (!idOrName) {
    employees.forEach((value) => {
      let listTheAnimals = [];
      value.responsibleFor.forEach((id) => {
        listTheAnimals.push(idName(id));
      });
      result[`${value.firstName} ${value.lastName}`] = listTheAnimals;
    });
    return result;
  }

  const employee = employees.find((value) => value.id === idOrName || value.firstName === idOrName || value.lastName === idOrName);
  let listTheAnimals = employee.responsibleFor.map(idName);
  result[`${employee.firstName} ${employee.lastName}`] = listTheAnimals;
  return result;
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
