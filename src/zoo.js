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

// const { species } = require('./data');
// const { employees } = require('./data');
const data = require('./data');

// Requisito 1
const getSpeciesByIds = (...ids) => data.species.filter((specie) => ids.find((id) => specie.id === id));

// Requisito 2
const getAnimalsOlderThan = (animal, age) => data.species.some((specie) => specie.name === animal && specie.residents.every((spc) => spc.age > age));

// Requisito 3
const getEmployeeByName = (employeeName) => (!employeeName ? {} : data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName));

// Requisito 4
const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

// Requisito 5
const isManager = (id) => data.employees.some((employee) => employee.managers.includes(id));

// Requisito 6
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// Requisito 7
function countAnimals(species) {
  return (!species) ? data.species.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {}) : data.species.find((specie) => specie.name === species).residents.length;
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
