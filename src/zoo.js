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

const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';

const getSpeciesByIds = (...ids) => {
  let array = [];
  ids.forEach((iD) => array.push(data.species.find((specie) => specie.id === iD)));
  return array;
};

const getAnimalsOlderThan = (animal, age) => {
  let olderThan;
  data.species.forEach((specie) => {
    if (specie.name === animal) olderThan = (specie.residents.every((res) => res.age >= age));
  });
  return olderThan;
};

const getEmployeeByName = (emplName) => {
  if (!emplName) return {};
  return data.employees.find((empl) => empl.firstName === emplName || empl.lastName === emplName);
};

const createEmployee = (personalInfo, associatedWith) => {
  const object = { ...personalInfo, ...associatedWith };
  return object;
};

const isManager = (id) => {
  if (id === stephanieId || id === olaId || id === burlId) return true;
  return false;
};

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
};

const countAnimals = (species) => {
  let object = {};
  let count = 0;
  if (!species) {
    data.species.forEach((specie) => { object[specie.name] = specie.residents.length; });
    return object;
  }
  data.species.forEach((spec) => { if (spec.name === species) count = spec.residents.length; });
  return count;
};

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
