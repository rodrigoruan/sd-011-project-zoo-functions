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
  return species.filter((checkId, index) => checkId.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  const animalList = species.find((animals) => animals.name === animal);
  return animalList.residents.every((item) => item.age > age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName === true) {
    return {};
  }
  return employees.find((item) => (item.firstName === employeeName || item.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  return employees.some((subject) => subject.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species1) {
  if (!species1 === true) {
    let animalObj = {};
    species.forEach((animal) => {
      animalObj[animal.name] = animal.residents.length;
    });
    return animalObj;
  }
  return species.find((animal) => animal.name === species1).residents.length;
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
