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
  return species.filter((speciesId) => ids.some((id) => id === speciesId.id));
}

function getAnimalsOlderThan(animal, age) {
  const filteredSpecies = species.filter((sp) => sp.name === animal)[0].residents;
  return filteredSpecies.every((ele) => ele.age > age);
}

function getEmployeeByName(employeeName) {
  const find = (ele) => ele.firstName === employeeName || ele.lastName === employeeName;
  return (employeeName === undefined) ? {} : employees.find(find);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.filter((func) => func.managers.length === 1).some((name) => name.id === id);
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(obj);
}

function countAnimals(speciesItem) {
  const reduceFunction = () => species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});

  const filterLength = () => species.filter((el) => el.name === speciesItem)[0].residents.length;
  return (speciesItem === undefined) ? reduceFunction() : filterLength();
}

function calculateEntry(entrants = {}) {
  const value = [];
  const price = Object.entries(prices);
  const entries = Object.entries(entrants);
  entries.forEach((entr) => price.forEach((pric) => {
    const result = (entr[0] === pric[0]) ? value.push(entr[1] * pric[1]) : null;
    return result;
  }));
  return value.reduce((acc, curr) => acc + curr, 0);
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
