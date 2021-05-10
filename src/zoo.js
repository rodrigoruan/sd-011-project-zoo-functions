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
  const returnArray = species.filter((specie) => (ids === undefined ? [] : ids.some((id) => specie.id === id)));
  return returnArray;
}
function getAnimalsOlderThan(animal, age) {
  const animalName = species.find((specie) => specie.name === animal);
  const ageTest = animalName.residents.every((residents) => residents.age > age);
  return ageTest;
}

function getEmployeeByName(employeeName) {
  const returnEmployee = employeeName === undefined ? {} : employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return returnEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const getById = employees.find((employee) => employee.id === id);
  const isAManager = getById.managers.length <= 1;
  return isAManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees[employees.length] = newEmployee;
  return employees;
}

function countAnimals(speciess) {
  if (speciess === undefined) {
    const allAnimals = {};
    species.forEach((specie) => {
      allAnimals[specie.name] = specie.residents.length;
    });
    return allAnimals;
  } const oneAnimals = species.find((specie) => specie.name === speciess);
  return oneAnimals.residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  } const keys = Object.keys(entrants);
  let accumulator = 0;
  keys.forEach((key) => { accumulator += data.prices[key] * entrants[key]; });
  return accumulator;
}

function getAnimalMap(options) {
  // const getAnimals = {};
  // species.forEach((specie) => {
  //   getAnimals[specie.location] = specie.name
  // });
  // return getAnimals;
}

function getSchedule(dayName) {
  const getKeys = Object.keys(hours);
  const allHours = {};
  if (dayName === undefined) {
    getKeys.forEach((day) => {
      allHours[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
      if (day === 'Monday') {
        allHours[day] = 'CLOSED';
      }
    });
    return allHours;
  }
  if (dayName === 'Monday') {
    allHours[dayName] = 'CLOSED';
    return allHours;
  }
  allHours[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  return allHours;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const multiplier = ((percentage / 100) + 1);
  const objectPrices = Object.keys(prices);
  const finalPrices = objectPrices.forEach((price) => {
    const newPrices = ((prices[price] * multiplier) + 0.001);
    prices[price] = parseFloat(newPrices.toFixed(2));
  });
  return finalPrices;
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
