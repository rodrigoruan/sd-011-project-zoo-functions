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
  return data.species.filter((species) => ids.includes(species.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find(((element) => element.name === animal)).residents.every((species) => species.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};

  return data.employees.filter(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName)[0];
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  const obj = {};
  data.species.forEach((specie) => {
    obj[specie.name] = specie.residents.length;
  });
  if (species !== undefined) {
    return obj[species];
  }
  return obj;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const categoryKeys = Object.keys(entrants);

  const total = categoryKeys.reduce((acc, key) => acc + (data.prices[key] * entrants[key]), 0);

  return total;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  const employees = data.employees.find((emp) => emp.id === id);
  const getAnimal = data.species.find((anima) => employees.responsibleFor[0] === anima.id);
  const getResident = getAnimal.residents.reduce((acc, cur) => (cur.age > acc.age ? cur : acc));
  return [getResident.name, getResident.sex, getResident.age];
}

function increasePrices(percentage) {
  const pricesKeys = Object.keys(data.prices);
  const returnNewPrices = pricesKeys.forEach((person) => {
    const newPrices = (data.prices[person] * ((percentage / 100) + 1)) + 0.001;
    data.prices[person] = parseFloat(newPrices.toFixed(2));
  });
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
