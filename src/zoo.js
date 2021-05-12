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

const { prices } = require('./data');
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
    const calcClose = close - 12;
    acc[key] = (close - open > 0) ? `Open from ${open}am until ${calcClose}pm` : 'CLOSED';
    return acc;
  }, {});

  if (dayName) return { [dayName]: dataEntries[dayName] };
  return dataEntries;
}

function getOldestFromFirstSpecies(id) {
  const rashId = employe.filter((person) => person.id === id)
    .map((person) => person.responsibleFor[0]);

  const animal = animals.filter((specie) => specie.id === rashId[0])
    .map((specie) => specie.residents.sort((a, b) => b.age - a.age)[0]);

  return animal.reduce((acc, cur) => [cur.name, cur.sex, cur.age], []);
}

function increasePrices(percentage) {
  const result = Object.entries(data.prices).reduce((acc, [key, value]) => {
    const values = value + value * (percentage / 100);
    acc[key] = Math.round(values * 100) / 100;
    return acc;
  }, {});
  data.prices = result;
  return result;
}

function getAnimalByIdOrName(...ids) {
  const animal = [];
  ids.forEach((rash) => animal.push((animals.find((specie) => specie.id === rash)).name));
  return animal;
}

function getEmployeeCoverage(idOrName) {
  let responsables = {};
  let singleResponsable = {};
  employe.forEach((employee) => {
    const employeResponsibles = getAnimalByIdOrName(...employee.responsibleFor);
    responsables[`${employee.firstName} ${employee.lastName}`] = employeResponsibles;
    if (employee.firstName === idOrName || employee.lastName === idOrName || employee.id === idOrName) {
      singleResponsable = { [`${employee.firstName} ${employee.lastName}`]: employeResponsibles };
    }
  });
  if (idOrName) return singleResponsable;
   return responsables;
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
