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

const { animals } = require('./data');
const data = require('./data');

function getSpeciesByIds(ids) {
  // seu código aqui
}

function getAnimalsOlderThan(animalSelect, ageSelect) {
  return animals
    .find(({ name }) => name === animalSelect)
    .residents
    .every(({ age }) => age >= ageSelect);
}

function getEmployeeByName(nome) {
  if (!nome) return {};
  const i = data.employees;
  return i.find(({ firstName, lastName }) => firstName === nome || lastName === nome);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees
    .some(({ managers }) => managers
      .includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species) {
  if (species === undefined) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(({ name }) => name === species).residents.length;
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
  const multiply = (percentage / 100) + 1;
  let currKeyValue = 0;
  Object.entries(data.prices).forEach(([key, value]) => {
    currKeyValue = value * multiply;
    data.prices[key] = Math.round(currKeyValue * 100) / 100;
  });
  return data.prices;
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
