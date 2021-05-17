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
const { species, employees, hours, prices } = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((specie) => specie.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  return employeeName
    ? employees.find((employeer) => employeer === employeeName || employeer.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(speciesName) {
  return speciesName
    ? species.find((specie) => specie.name === specieName).residents.length
    : species.reduce((output, specie) => {
      output[specie.name] = specie.residents.length;
      return output;
}

function calculateEntry(entrants) {
  return (!entrants || Object.keys(entrants).length === 0) ? 0
    : Object.keys(entrants).reduce((acc, key) => acc + prices[key] * entrants[key], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  const idAnimals = employees.find((emp) => emp.id === id).responsibleFor[0];
  const animals = species.find((spec) => spec.id === idAnimals).residents;
  return Object.values(animals.sort((animalA, animalB) => animalA.age - animalB.age).reverse()[0]);
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
