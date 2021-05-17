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
  return data.species.filter((species) => ids.some((id) => id === species.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find(({ name }) => name === animal).residents.every(({ age: ages }) => ages >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find((value) => (value.firstName === employeeName || value.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  if (data.employees.find((value) => (value.id === id)).managers.length === 1) return true;
  return false;
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (species === undefined) {
    const animals = {};
    data.species.forEach((value) => {
      animals[value.name] = value.residents.length;
      return undefined;
    });
    return animals;
  }
  return data.species.find((value) => value.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
}

function getSchedule(dayName) {
  const result = {};
  Object.keys(data).forEach((day) => {
    if (day !== 'Monday') {
      result[day] = `Open from ${data[day].open}am until ${data[day].close - 12}pm`;
    } else { result[day] = 'CLOSED'; }
  });
  if (!dayName) return result;
  return { [dayName]: result[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const employee = data.employees.find((value) => value.id === id);
  const specie = data.species.find((value) => value.id === employee.responsibleFor[0]);
  const animal = specie.residents.reduce((acc, currentValue) => {
    if (currentValue.age > acc.age) return currentValue;
    return acc;
  });
  return Object.values(animal);
}

function increasePrices(percentage) {
  return Object.keys(data).forEach((ageGroup) => {
    data[ageGroup] *= (1 + (percentage / 100));
    data[ageGroup] = Math.round(data[ageGroup] * 100) / 100;
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
