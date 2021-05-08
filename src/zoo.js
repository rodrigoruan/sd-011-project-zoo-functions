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
const { employees, species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids === []) {
    return [];
  }
  return ids.map((value) => {
    let total = [];
    total = data.species.find((result) => result.id === value);
    return total;
  });
}

function getAnimalsOlderThan(animal, age) {
  const result = data.species.find((bicho) => bicho.name === animal);
  const final = result.residents.every((value) => (value.age > age));
  return final;
}

function getEmployeeByName(employeeName) {
  const result = data.employees.find((value) => (value.firstName === employeeName || value.lastName === employeeName));
  return { ...result };
}

function createEmployee(personalInfo, associatedWith) {
  const result = { ...personalInfo, ...associatedWith };
  return result;
}

function isManager(id) {
  const result = employees.some(({ managers }) => managers.some((value) => value === id));
  return result;
}

// function isManager(id) {
//   const result = employees.some((get) => get.managers.some((value) => value === id))
//   return result;
// }

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(param) {
  const result = {};
  if (!param) {
    species.forEach((value) => { result[value.name] = value.residents.length; });
    return result;
  }
  return species.find((get) => (get.name === param)).residents.length;
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
