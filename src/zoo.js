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
const { hours } = require('./data');
const { prices } = require('./data');
const { species: specie } = require('./data');
const { employees } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) => ids
  .map((id) => specie.find((animal) => animal.id === id));

function getAnimalsOlderThan(animal, age) {
  const objAnimal = specie.find((item) => item.name === animal);
  const res = objAnimal.residents;
  const ageMin = res.every((residente) => residente.age > age);
  return ageMin;
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const objEmployee = employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return objEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const objEmployee = employees.find((employee) => employee.id === id);
  if (objEmployee.managers.length === 1 || objEmployee.managers.length === 0) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species) {
  const objAnimal = specie.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});

  if (!species) {
    return objAnimal;
  }

  const objSpecies = specie.find((item) => item.name === species);
  const ArrSpecies = objSpecies.residents.length;
  return ArrSpecies;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  }
  let sumAllEntrants = 0;
  const entrantsType = Object.keys(entrants);
  entrantsType.forEach((property) => {
    sumAllEntrants += prices[property] * entrants[property];
  });
  return sumAllEntrants;
}

function getAnimalMap(options) {
  // seu código aqui
}

function generateText(day) {
  if (hours[day].close > 12) {
    hours[day].close -= 12;
  }
  if (hours[day].open === 0) {
    return 'CLOSED';
  }
  return `Open from ${hours[day].open}am until ${hours[day].close}pm`;
}

function getSchedule(dayName) {
  const scheduleOfWeek = {};
  const days = Object.keys(hours);
  days.forEach((day) => {
    if (dayName === undefined || dayName === day) {
      scheduleOfWeek[day] = generateText(day);
    }
  });
  return scheduleOfWeek;
}

function getOldestFromFirstSpecies(id) {
  const manager = employees.find((employee) => (id === employee.id));
  const foundAnimal = specie
    .find((specie1) => (specie1.id === manager.responsibleFor[0]
      || specie1.name === manager.responsibleFor[0]));
  const oldestAnimal = foundAnimal.residents
    .sort((animal1, animal2) => animal2.age - animal1.age)[0];
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  let increase = 0;
  const value = Object.keys(prices);
  value.forEach((price) => {
    increase = prices[price] + ((prices[price] * percentage) / 100);
    prices[price] = +(Math.round(increase * 100) / 100).toFixed(2);
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
