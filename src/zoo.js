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

const { species, employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const auxanimal = [];
  const arrayAnimals = ids.forEach((idArgument) => auxanimal.push(...data.species.filter((animal) => animal.id === idArgument)));
  return auxanimal;
}
console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function getAnimalsOlderThan(animal, age) {
  const findSpecies = species.find((element) => element.name === animal);
  const checkAge = findSpecies.residents.every((res) => res.age >= age);
  return checkAge;
}

function getEmployeeByName(employeeName) {
  const staff = employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
  return staff || {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const manager = employees.some((person) => person.managers.find((ids) => ids === id));
  return manager;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const staff = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(staff);
}

function countAnimals(specie) {
// atualiza
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
  // countAnimals,
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
