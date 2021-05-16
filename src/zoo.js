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

// Adicionando para commit inicial
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return (data.species.some((specie) => specie.name === animal && specie.residents
    .every((resident) => resident.age > age)));
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find((employer) => employer.firstName === employeeName || employer.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employer) => employer.managers.includes(id));
}

function addEmployee(id = {}, firstName = {}, lastName = {}, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}
// addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe');
console.log(data.employees);

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
