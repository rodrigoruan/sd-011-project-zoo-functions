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

const { species, employees, prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((speciesId) => ids.some((id) => id === speciesId.id));
}

function getAnimalsOlderThan(animal, age) {
  return species.find((speciesName) => animal === speciesName.name).residents.every((speciesAge) => age <= speciesAge.age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((employee) => employeeName === employee.firstName || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(specie) {
  if (!specie) {
    return data.species.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specieName) => specieName.name === specie).residents.length;
}

function calculateEntry(entrants = 0) {
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  const getId = employees.find((employee) => employee.id === id);
  const getAnimal = species.find((specie) => getId.responsibleFor[0] === specie.id);
  const getResident = getAnimal.residents.reduce((acc, value) => (value.age > acc.age ? value : acc));
  return [getResident.name, getResident.sex, getResident.age];
}

function increasePrices(percentage) {
  return Object.keys(prices).forEach((person) => {
    const newPrices = (prices[person] * ((percentage / 100) + 1)) + 0.001;
    prices[person] = parseFloat(newPrices.toFixed(2));
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
