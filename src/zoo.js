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

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((element) => ids.includes(element.id));
}

function getAnimalsOlderThan(animal, age) {
  const nameSpecies = species.find((element) => element.name === animal);
  return nameSpecies.residents.every((element) => element.age > age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((element) => element.firstName === employeeName || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const getIdManagers = data.employees.find((element) => element.managers);
  return getIdManagers.managers.some((element) => element.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmployee = ({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employees.push(addNewEmployee);
}

function countAnimals(animal) {
  const objAnimals = {};
  if (!animal) {
    species.forEach((element) => {
      objAnimals[element.name] = element.residents.length;
    });
    return objAnimals;
  }
  return species.find((element) => element.name === animal).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) {
    return 0;
  }
  return Object.keys(entrants).reduce(((accumulator, currentValue) => accumulator + (entrants[currentValue] * prices[currentValue])), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const schedule = {};
  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      schedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      schedule[day] = 'CLOSED';
    }
  });
  if (!dayName) {
    return schedule;
  }
  return ({ [dayName]: schedule[dayName] });
}

const getOldestFromFirstSpecies = (id) => {
  const idManager = employees.find((element) => element.id === id);
  const findSpecie = species.find((specie) => specie.id === idManager.responsibleFor[0]);
  const olderSpecie = findSpecie.residents.sort((a, b) => b.age - a.age);
  return Object.values(olderSpecie[0]);
};

const increasePrices = (percentage) => {
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.round((prices[key] * (percentage / 100 + 1)) * 100) / 100;
  });
};

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
