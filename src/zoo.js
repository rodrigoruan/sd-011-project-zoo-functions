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

const { initial } = require('lodash');
const data = require('./data');
const { species, employees, prices } = require('./data');

function getSpeciesByIds(...ids) {
  if (ids === undefined) return [];
  return species.filter((animais) => ids.find((id) => id === animais.id));
}

function getAnimalsOlderThan(animal, age) {
  const ageAnimals = species.find((bicho) => bicho.name === animal);
  return ageAnimals.residents.every((num) => num.age >= age);
}

function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return ({});
  return employees.find(((funcionario) => (
    funcionario.firstName === employeeName || funcionario.lastName === employeeName)
  ));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const funcionario = ({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employees.push(funcionario);
}

function countAnimals(specie) {
  if (specie) {
    return species.find(({ name }) => name === specie).residents.length;
  }
  return species.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) return {};
  return Object.keys(entrants).reduce(((total, initialValue) =>
    total + (entrants[initialValue] * prices[initialValue])
  ), 0);
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
