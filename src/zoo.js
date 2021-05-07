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

const { species } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) => data.species.filter(species => ids.includes(species.id));

const getAnimalsOlderThan = (animal, age) => data.species.find((specie => specie.name === animal)).residents.every(animal => animal.age >= age);

const getEmployeeByName = (employeeName) => {
  // seu código aqui
}

const createEmployee = (personalInfo, associatedWith) => {
  // seu código aqui
}

const isManager = (id) => {
  // seu código aqui
}

const addEmployee = (id, firstName, lastName, managers, responsibleFor) => {
  // seu código aqui
}

const countAnimals = (species) => {
  // seu código aqui
}

const calculateEntry = (entrants) => {
  // seu código aqui
}

const getAnimalMap = (options) => {
  // seu código aqui
}

const getSchedule = (dayName) => {
  // seu código aqui
}

const getOldestFromFirstSpecies = (id) => {
  // seu código aqui
}

const increasePrices = (percentage) => {
  // seu código aqui
}

const getEmployeeCoverage = (idOrName) => {
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
