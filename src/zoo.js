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

const getSpeciesByIds = (...ids) =>
  data.species.filter((species) => ids.some((id) => species.id === id));

const getAnimalsOlderThan = (animal, age) =>
  data.species.find((value) => value.name === animal).residents.every((value) => value.age >= age);

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((names) => names.firstName === employeeName || names.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

const isManager = (id) => data.employees.some(({ managers }) => managers.includes(id));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (species) {
    return data.species.find((value) => value.name === species).residents.length;
  }

  let object = {};
  data.species.forEach((animals) => {
    object[animals.name] = animals.residents.length;
  });
  return object;
}
console.log(countAnimals());

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
