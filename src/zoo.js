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
// comando para test : npm test test/addEmployee.test.jsnpm 

const data = require('./data');

const { species } = data;

function getSpeciesByIds(...ids) {
  // seu código aqui
  // if( ids.length == 0 ) return [];
  return species.filter(({ id: idSpecie }) => ids.some((id) => id === idSpecie));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return species.find(({ name }) => name === animal).residents.every(({ age: idade }) => age < idade);
}

/* function getEmployeeByName(employeeName) {
  // seu código aqui
}ls

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(specie) {
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
 */
module.exports = {
  // calculateEntry,
  // getSchedule,
  // countAnimals,
  // getAnimalMap,
  getSpeciesByIds,
  // getEmployeeByName,
  // getEmployeeCoverage,
  // addEmployee,
  // isManager,
  getAnimalsOlderThan,
  // getOldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
