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
  // seu código aqui
  const filterIds = data.species.filter(({ id }) => ids.includes(id));
  return filterIds;
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const findResidents = data.species.find(({ name }) => name === animal).residents;
  const checkAge = findResidents.every((resident) => (resident.age >= age));
  return checkAge;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  const findEmployee = data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
  return (!employeeName) ? {} : findEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  const mapEmployee = data.employees.some(({ managers }) => managers.includes(id));
  return mapEmployee;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species) {
  // seu código aqui
  const allSpecies = data.species.reduce(((curObject, { name, residents }) => {
    curObject[name] = residents.length;
    return curObject;
  }), {});

  return (!species) ? allSpecies : data.species.find((element) => element.name === species).residents.length;
}

function calculateEntry({ Adult = 0, Senior = 0, Child = 0 } = 0) {
  // seu código aqui
  return ((Adult * 49.99) + (Senior * 24.99) + (Child * 20.99));
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
