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

function getSpeciesByIds(ids) {

}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
}

function getEmployeeByName(employeeName) {
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
  if (typeof entrants === 'undefined' || !entrants) {
    return 0;
  } 
  const adultPrice = data.prices.Adult.value;
  const adultNumbers = entrants.Adult.value;
  const adultPriceTotal = adultPrice * adultNumbers;
  const childPrice = data.prices.Child.value;
  const childNumbers = entrants.Child.value;
  const childPriceTotal = childPrice * childNumbers;
  const seniorPrice = data.prices.Senior.value;
  const seniorNumbers = entrants.Senior.value;
  const seniorPriceTotal = seniorPrice * seniorNumbers;
  return adultPriceTotal + childPriceTotal + seniorPriceTotal;
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
