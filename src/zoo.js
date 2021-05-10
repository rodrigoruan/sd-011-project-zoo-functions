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
  let array = [];
  ids.forEach((iD) => array.push(data.species.find((specie) => specie.id === iD)));
  return array;
}

function getAnimalsOlderThan(animal, age) {
  let animalOlderThen;
  data.species.forEach((specie) => {
    if (specie.name === animal) {
      animalOlderThen = (specie.residents.every((resident) => resident.age >= age));
    }
  });
  return animalOlderThen;
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((employe) => employe.firstName === employeeName || employe.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const object = { ...personalInfo, ...associatedWith };
  return object;
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
