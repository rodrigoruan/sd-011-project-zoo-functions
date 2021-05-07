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
  return data.species.filter((oneSpecies) => ids.includes(oneSpecies.id));
}

function getAnimalsOlderThan(animal, age) {
  const { residents } = data.species.find((oneSpecies) => oneSpecies.name === animal);
  const areOlderThan = residents.every((resident) => resident.age >= age);
  return areOlderThan;
}

function getEmployeeByName(employeeName) {
  const employeeObject = data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return { ...employeeObject };
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  data.employees.push(newEmployee);
  return newEmployee;
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
