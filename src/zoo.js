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
const { species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((specie) => ids.find((id) => specie.id === id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const selectedAnimals = data.species.find((specie) => (animal === specie.name)).residents.every((resident) => (resident.age > age));
  return selectedAnimals;
}

// Requisito 03
const getEmployeeByName = (employeeName) => (!employeeName ? {} : data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName));

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const pushEmployee = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return pushEmployee;
}

function countAnimals(speciesOfAnimals) {
  // seu código aqui
  // const animalCount = {};
  // if (!speciesOfAnimals) {
  //   data.species.name.forEach((animal) => {
  //     animalCount[animal.name] = animal.residents.length;
  //   });
  // } else {
  //   return data.species.name.find((specie) => data.species === specie.name).residents.length;
  // }
}

function calculateEntry(entrants = 0) {
  // seu código aqui
  return Object.keys(entrants).reduce((acc, value) => acc + data.prices[value] * entrants[value], 0);
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
