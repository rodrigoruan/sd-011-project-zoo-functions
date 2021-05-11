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

const { employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.find((specieId) => specieId === specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((specie) => (specie.name === animal)).residents.every((specieAge) => (specieAge.age >= age));
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((manager) => manager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const NewEmployee = { id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(NewEmployee);
  return employees;
}
// ex. feito com a ajuda da colega Mikaela Braga
function countAnimals(species1) {
  if (!species1) {
    return data.species.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specie) => specie.name === species1).residents.length;
}

// * Fonte : https://stackoverflow.com/questions/61311246/how-to-mutliply-two-objects-by-key-and-sum *//
function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  } const totEnt = Object.keys(entrants).reduce((acc, currentPerson) => acc + entrants[currentPerson] * data.prices[currentPerson], 0);
  return totEnt;
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
