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
  if (ids.length > 0) {
    const array = [];
    ids.forEach((difId) => array.push(data.species.filter((el) => difId === el.id)));
    return array.reduce((acc, curr) => acc.concat(curr));
  }
  return [];
}

function getAnimalsOlderThan(animal, age) {
  const selected = data.species.filter((el) => el.name === animal);
  const result = selected[0].residents.every((el) => el.age > age);
  return result;
}

function getEmployeeByName(employeeName) {
  const x = {};
  const getData = data.employees.find(
    (el) => el.firstName === employeeName || el.lastName === employeeName,
  );
  return typeof employeeName === 'undefined' ? x : getData;
}

const createEmployee = (personalInfo, associatedWith) => {
  const genEmployee = { ...personalInfo, ...associatedWith };
  return genEmployee;
};

function isManager(id) {
  const zooManagers = [
    '9e7d4524-363c-416a-8759-8aa7e50c0992',
    'fdb2543b-5662-46a7-badc-93d960fdc0a8',
    '0e7b460e-acf4-4e17-bcb3-ee472265db83',
  ];
  const idFilter = data.employees.find((el) => el.id === id);
  return zooManagers.some((el) => idFilter.id === el);

  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
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
