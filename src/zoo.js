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
  return ids.map((item) => data.species.find((species) => species.id === item));
}
function getAnimalsOlderThan(animal, age) {
//   // seu código aqui

}
function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  const names = data.employees.find((item) => item.firstName === employeeName || item.lastName === employeeName);
  return names;
}
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  const retornaId = data.employees.some(({ managers }) => managers.includes(id));
  return retornaId;
}
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}
// console.log(addEmployee());
function countAnimals(species) {
  // seu código aqui
  return data.species.map(({ popularity }) => popularity);
}
console.log(countAnimals());
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
