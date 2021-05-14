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

const { species, employees, prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((animals) => ids.includes(animals.id));
}

function getAnimalsOlderThan(animal, age) {
  const findingName = (specie) => specie.name === animal;
  const checkingAge = (resident) => resident.age >= age;

  return species.find(findingName).residents.every(checkingAge);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};

  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);

}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

//function countAnimals(species) {
  // seu código aqui
//}

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
