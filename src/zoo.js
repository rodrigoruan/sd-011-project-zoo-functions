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
  const arrSpecies = species.filter((specie) => ids.includes(specie.id));
  return arrSpecies;
}

function getAnimalsOlderThan(animal, age) {
  const animalsArr = species.filter((specie) => specie.name === animal)[0].residents;
  return animalsArr.every((animal1) => animal1.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName) {
    return data.employees.filter((employee) => employeeName === employee.firstName || employeeName === employee.lastName)[0];
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(name) {
  if (name) {
    const specieName = species.filter((specie) => specie.name === name);
    return specieName[0].residents.length;
  }
  const allAnimals = {};
  for (let animal of species) {
    allAnimals[animal.name] = animal.residents.length;
  }
  return allAnimals;
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.values(entrants).length === 0) {
    return 0;
  }
  let value = 0;
  for (let key of Object.keys(entrants)) {
    value += data.prices[key] * entrants[key];
  }
  return value;
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
