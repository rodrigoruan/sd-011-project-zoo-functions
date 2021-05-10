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

const animals = data.species;
const employe = data.employees;

function getSpeciesByIds(...ids) {
  if (!ids) return [];
  return animals.filter((specie) => (ids.includes(specie.id)));
}

function getAnimalsOlderThan(animal, age) {
  return animals.find((specie) => (
    specie.name === animal
  )).residents.every((specie) => specie.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return employe.find((person) => person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employe.some((person) => (person.id === id && person.managers.length < 2));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employe.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  const totalAnimals = animals.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
  }, {});

  if (species) {
    return totalAnimals[species];
  }
  return totalAnimals;
}

function calculateEntry(entrants) {
  if (!entrants || !Object.keys(entrants).length) return 0;
  return Object.keys(entrants).reduce((acc, cur) => (acc + entrants[cur] * data.prices[cur]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const dataEntries = Object.entries(data.hours).reduce((acc, cur) => {
    const [key, value] = cur;
    const { open, close } = value;
    const calcClose = close % 12;
    acc[key] = (close - open > 0) ? `Open from ${open}am until ${calcClose}pm` : 'CLOSED';
    return acc;
  }, {});

  if (dayName) return { [dayName]: dataEntries[dayName] };
  return dataEntries;
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
