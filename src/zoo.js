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
  let array = [];
  ids.forEach((id) => {
    const filterId = species.filter((specie) => id === specie.id);
    array.push(filterId[0]);
  });
  return array;
}

function getAnimalsOlderThan(animal, age) {
  let checkAge;
  species.forEach((beast) => {
    if (beast.name === animal) {
      checkAge = beast.residents.every((resident) => resident.age > age);
    }
  });
  return checkAge;
}

function getEmployeeByName(employeeName) {
  if (employeeName === employees.firstName || employeeName === employees.lastName) {
    employees.find(employees);
  } else if (typeof (employeeName) === 'undefined') {
    return {};
  }
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers[0] === id || employee.managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
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
