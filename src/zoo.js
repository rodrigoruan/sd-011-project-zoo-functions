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

// const { species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids === undefined) return [];
  const filterSpecie = ({ id }, index) => id === ids[index];
  return data.species.filter(filterSpecie);
}

function getAnimalsOlderThan(animal, ages) {
  const residentsArray = data.species;
  const find = residentsArray.find(({ name }) => name === animal);
  const result = find.residents.every(({ age }) => age > ages);
  return result;
}

function getEmployeeByName(employeeName) {
  const employeesList = data.employees;
  const chooseEmployeByName = ({ firstName, lastName }) => {
    const choose = firstName === employeeName || lastName === employeeName;
    return choose;
  };

  const findEmployee = employeesList.find(chooseEmployeByName);

  return employeeName === undefined ? {} : findEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(species) {
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
