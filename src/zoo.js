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

const { employees, species, prices } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) => data.species.filter((speciesId) => ids.includes(speciesId.id));

const getAnimalsOlderThan = (animal, age) => data.species.find(({ name }) => name === animal).residents.every(({ age: ages }) => ages >= age);

const getEmployeeByName = (employeeName) => ((!employeeName) ? {}
  : data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName));

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => data.employees.some(({ managers }) => managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => data.employees.push({ id, firstName, lastName, managers, responsibleFor });

const countAnimals = (speciesName) => ((speciesName)
  ? data.species.find(({ name }) => name === speciesName).residents.length
  : data.species.reduce((acc, { name, residents }) => ({ ...acc, [name]: residents.length }), {}));

const calculateEntry = (entrants) => ((!entrants) ? 0
  : Object.keys(entrants).reduce((acc, curr) => acc + (data.prices[curr] * entrants[curr]), 0));

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

const getOldestFromFirstSpecies = (ids) => {
  const responsible = data.employees.find(({ id }) => id === ids).responsibleFor.find((index) => index);
  const animal = data.species.find(({ id }) => id === responsible).residents;
  const oldSnimal = animal.reduce((acc, { age }) => Math.max(acc, age), 0);
  const result = animal.find(({ age }) => age === oldSnimal);
  return [result.name, result.sex, result.age];
};

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
