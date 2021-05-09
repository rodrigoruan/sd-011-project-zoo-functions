/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }]
*/

const data = require('./data');

const { species, employees, hours, price } = data;

function getSpeciesByIds(...ids) {
  // read ids
  const idsToSearch = ids;
  // create a const that will receive filtered animals
  const filteredAnimals = [];
  // iterate species checking for ids
  idsToSearch.forEach((id) => {
    species.map((specie) => specie.id === id ? filteredAnimals.push(specie) : '');
  });
  return filteredAnimals;
}

function getAnimalsOlderThan(animal, age) {
  // read parameters
  const AnimalsToSearch = animal;
  const ageEqualOrGreaterThan = age;
  let filteredAnimalsByAge;
  // iterate species searching by animal specie
  // verify and return a bolean if all animals are age === or >=  ageEqualOrGreaterThan
  species.forEach((specie) => {
    if (specie.name === AnimalsToSearch) {
      filteredAnimalsByAge = specie.residents.every((resident) => resident.age >= ageEqualOrGreaterThan);
    }
  });
  return filteredAnimalsByAge;
}

function getEmployeeByName(employeeName) {
  let filteredEmployees = {};
  let employeToFilter = employeeName;
  employees.forEach((employee) => employee.firstName === employeToFilter || employee.lastName === employeToFilter ? filteredEmployees = employee : '');
  return filteredEmployees;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith
  }
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(speciesToCount) {
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
