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
  // const returnArray = data.species.filter((specie) => ids === 'undefined'? []: specie.id === ids[0] || specie.id === ids[1]);
  const returnArray = data.species.filter((specie) => (ids === 'undefined' ? [] : ids.some((identifie) => specie.id === identifie)));
  return returnArray;
}

function getAnimalsOlderThan(animal, age) {
  const obj = data.species.find((animals) => animals.name === animal);
  const returnBool = obj.residents.every((single) => single.age >= 7);
  return returnBool;
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined){
    return {};
  };
  const returnObj = data.employees.find((emp) => emp.firstName === employeeName || emp.lastName === employeeName);
  return returnObj;
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
