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
  const array = ids.map((items) => data.species.find((value) => value.id === items));
  return array;
}

function getAnimalsOlderThan(animal, age) {
  const lontras = data.species.find((items) => items.name === animal);
  return lontras.residents.every((value) => value.age > age);
}

function getEmployeeByName(employeeName) {
  const collaborator = data.employees.find((items) => items.firstName === employeeName || items.lastName === employeeName);
  if (collaborator !== undefined) {
    return collaborator;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const employees = data.employees.map((values) => values.managers);
  const manager = employees.some((items) => items.some((value) => value === id));
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addEmployees = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(addEmployees);
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((previousValue, currentValue) => {
      previousValue[currentValue.name] = currentValue.residents.length;
      return previousValue;
    }, {});
  }
  const animal = data.species.find((value) => value.name === species);
  return animal.residents.length;
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
