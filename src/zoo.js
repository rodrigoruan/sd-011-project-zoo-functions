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
  const arrayOfAnimals = data.species;

  return ids.length === 0 ? [] : arrayOfAnimals.filter((animal, index) => animal.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  const arrayOfAnimals = data.species;
  const animalObject = arrayOfAnimals.find((object) => object.name === animal);

  return animalObject.residents.every((element) => element.age > age);
}

function getEmployeeByName(employeeName) {
  const arrayOfEmployees = data.employees;
  const findEmployee = () => arrayOfEmployees.find((employer) => employer.firstName === employeeName || employer.lastName === employeeName);
  return employeeName === undefined ? {} : findEmployee();
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
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
