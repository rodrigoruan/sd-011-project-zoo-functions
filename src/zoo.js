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
  return species.filter((element) => ids.includes(element.id));
}

function getAnimalsOlderThan(animal, age) {
  const nameSpecies = species.find((element) => element.name === animal);
  return nameSpecies.residents.every((element) => element.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((element) => element.firstName === employeeName || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const getIdManagers = data.employees.find((element) => element.managers);
  return getIdManagers.managers.some((element) => element.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmployee = ({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employees.push(addNewEmployee);
}

function countAnimals(animal) {
  const objAnimals = {};
  if (animal === undefined) {
    species.forEach((element) => {
      objAnimals[element.name] = element.residents.length;
    });
    return objAnimals;
  }
  return species.find((element) => element.name === animal).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) {
    return 0;
  }
  return Object.keys(entrants).reduce(((accumulator, currentValue) => accumulator + (entrants[currentValue] * prices[currentValue])), 0);
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
