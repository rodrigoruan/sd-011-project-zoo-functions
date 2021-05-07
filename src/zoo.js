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
  const speciesList = [];
  const { species } = data;
  if (!ids) {
    return speciesList;
  }
  species.forEach((animal) => {
    ids.forEach((id) => {
      if (id === animal.id) { speciesList.push(animal); }
    });
  });
  return speciesList;
}

function getAnimalsOlderThan(animal, minAge) {
  const { species } = data;
  const animalGroup = () => species.find((animals) => animals.name === animal);
  return animalGroup().residents.every((resident) => resident.age >= minAge);
}

function getEmployeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) { return {}; }
  return employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
