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

const getSpeciesByIds = (...ids) => data.species.filter(({ id }) => ids.includes(id));

const getAnimalsOlderThan = (animal, age) => data.species.find(({ name }) => name === animal).residents.every(({ age: animalAge }) => age < animalAge);

const getEmployeeByName = (employeeName) => {
  const employeer = data.employees.find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  return employeer !== undefined ? employeer : {};
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => data.employees.reduce(((acc, { managers }) => (acc || managers.includes(id))), false);

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
};

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
