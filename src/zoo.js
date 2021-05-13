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
  const array = ids.map((items) => data.species.find((value) => value.id === items));
  return array;
}

function getAnimalsOlderThan(animal, age) {
  const lontras = data.species.find((items) => items.name === animal);
  return lontras.residents.every((value) => value.age > age);
}

function getEmployeeByName(employeeName) {
  const collaborator = data.employees.find((items) => items.firstName === employeeName || items.lastName === employeeName);
  if (collaborator !== undefined) {
    return collaborator;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const employees = data.employees.map((values) => values.managers);
  const manager = employees.some((items) => items.some((value) => value === id));
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addEmployees = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(addEmployees);
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((previousValue, currentValue) => {
      previousValue[currentValue.name] = currentValue.residents.length;
      return previousValue;
    }, {});
  }
  const animal = data.species.find((value) => value.name === species);
  return animal.residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  const keys = Object.keys(entrants);
  return keys.reduce((previousValue, currentValue) => previousValue + (entrants[currentValue] * data.prices[currentValue]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const days = Object.keys(data.hours);
  const openingDays = days.reduce((accumulator, currentValue) => {
    if (currentValue === 'Monday') {
      accumulator[currentValue] = 'CLOSED';
      return accumulator;
    }
    accumulator[currentValue] = `Open from ${data.hours[currentValue].open}am until ${data.hours[currentValue].close - 12}pm`;
    return accumulator;
  }, {});
  if (!dayName) {
    return openingDays;
  }
  return { [dayName]: openingDays[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const employeeId = data.employees.find((value) => value.id === id);
  const firstEpecies = employeeId.responsibleFor[0];
  const infoEspecies = data.species.find((value) => value.id === firstEpecies);
  const sortAge = infoEspecies.residents.sort((age1, age2) => age2.age - age1.age);
  return [sortAge[0].name, sortAge[0].sex, sortAge[0].age];
}

function increasePrices(percentage) {
  const ticket = data.prices;
  const pricesKeys = Object.keys(data.prices);
  const ticketWithPercentage = pricesKeys.reduce((accumulator, currentValue) => {
    ticket[currentValue] = Math.round((ticket[currentValue] + (ticket[currentValue] * (percentage / 100))) * 100) / 100;
    return ticket;
  }, {});
  return ticketWithPercentage;
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
