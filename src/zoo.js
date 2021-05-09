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
  if (typeof ids === 'undefined') return [];
  return data.species.filter((species) => ids.includes(species.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animalObject) => animalObject.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  let employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(employee);
}

function countAnimals(specieName) {
  if (typeof specieName === 'undefined') {
    return data.species.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((animal) => animal.name === specieName).residents.length;
}

function calculateEntry(entrants) {
  let total = 0;

  for (let entrantAge in entrants) {
    if (entrantAge === 'Adult' || entrantAge === 'Child' || entrantAge === 'Senior') {
      total += data.prices[entrantAge] * entrants[entrantAge];
    }
  }
  return total;
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
