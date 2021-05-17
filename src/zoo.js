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

const { employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids === '') {
    return [];
  }
  return ids.map((id) => data.species.find((animal) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((specie) => specie.name === animal)
    .residents.every((valor) => valor.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((str) => str.firstName === employeeName
    || str.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  let { id, firstName, lastName } = personalInfo;
  let { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some((person) => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (species === undefined) {
    let allAnimails = {};
    data.species.forEach((animal) => { allAnimails[animal.name] = animal.residents.length; });
    return allAnimails;
  }
  const total = (counter) => counter + 1;
  const returnAnimal = data.species.filter((animal) => animal.name === species);
  const { residents: totalAnimals } = returnAnimal[0];
  return totalAnimals.reduce(total, 0);
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  return Object.keys(entrants).reduce((quant, price) =>
    quant + (entrants[price] * data.prices[price]), 0);
}

function getAnimalMap(options = {}) {
  let animalsDistribution = { NE: [], SE: [], NW: [], SW: [] };
  if (!options.includeNames) {
    data.species.forEach((value) => animalsDistribution[value.location].push(value.name));
    return animalsDistribution;
  }
  data.species.forEach((value) => {
    let nameList = value.residents.map((nome) => nome.name);
    if (options.sex !== undefined) {
      nameList = [];
      let objectNameList = value.residents.filter((val) => val.sex === options.sex);
      objectNameList.forEach((name) => nameList.push(name.name));
    }
    if (options.sorted) { nameList.sort(); }
    animalsDistribution[value.location].push({ [value.name]: nameList });
  });
  return animalsDistribution;
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  const caregiver = data.employees.find((person) => person.id === id).responsibleFor;
  const animalsId = data.species.find((value) => value.id === caregiver[0]).residents;
  const age = animalsId.reduce((count, curr) => Math.max(count, curr.age), 0);
  const olderAnimal = animalsId.find((value) => value.age === age);
  return Object.values(olderAnimal);
}

function increasePrices(percentage) {
  percentage = (percentage / 100) + 1;
  let UpdatePrices = data.prices;
  UpdatePrices.Adult = Math.round(data.prices.Adult * percentage * 100) / 100;
  UpdatePrices.Child = Math.round(data.prices.Child * percentage * 100) / 100;
  UpdatePrices.Senior = Math.round(data.prices.Senior * percentage * 100) / 100;
  return UpdatePrices;
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
