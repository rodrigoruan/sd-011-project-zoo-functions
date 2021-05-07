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
  if (!species) {
    return data.species.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specie) => specie.name === species).residents.length;
}

// Requisito 8
function calculateEntry(entrants) {
  if (!entrants) return 0;
  const { Adult, Child, Senior } = entrants;
  let sum = 0;
  if (Adult) sum += data.prices.Adult * Adult;
  if (Child) sum += data.prices.Child * Child;
  if (Senior) sum += data.prices.Senior * Senior;
  return sum;
}
// return entrants.reduce((acc, entrant) => acc += data.prices.find((price) => entrant === price))

// let entrants = {};
// console.log(calculateEntry());
// entrants = { 'Adult': 2, 'Child': 3, 'Senior': 1 };
// console.log(calculateEntry(entrants));
// entrants = { 'Adult': 1 };
// console.log(calculateEntry(entrants));

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
