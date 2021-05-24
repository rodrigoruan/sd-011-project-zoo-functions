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

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
