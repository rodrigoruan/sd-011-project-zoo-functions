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

function getSpeciesByIds(...ids) {
  if (!ids) return [];
  const getSpecieAnimal = data.species.filter((el) => ids.some((id) => id === el.id));
  return getSpecieAnimal;
}

function getAnimalsOlderThan(animal, age) {
  data.species.filter((age));
  // seu código aqui
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((elemento) => elemento.firstName === employeeName || elemento.lastName === employeeName);
  // seu código aqui
}

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
  if (typeof entrants === 'undefined') {
    return 0;
  }
  let priceTotal = 0;
  if (entrants.Adult) priceTotal += data.prices.Adult * entrants.Adult;
  if (entrants.Child) priceTotal += data.prices.Child * entrants.Child;
  if (entrants.Senior) priceTotal += data.prices.Senior * entrants.Senior;
  return priceTotal;
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
