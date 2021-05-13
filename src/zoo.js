/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const selectedSpecies = [];
  ids.forEach((value) => {
    let currentSpecie = species.find((object) => object.id === value);
    selectedSpecies.push(currentSpecie);
  });
  return selectedSpecies;
}

function getAnimalsOlderThan(animal, age) {
  const selectedAnimal = species.find((object) => object.name === animal);
  return selectedAnimal.residents.every((object) => object.age >= age);
}

function getEmployeeByName(employeeName) {
  const employee = employees.find((object) => object.firstName === employeeName || object.lastName === employeeName);
  const selectedEmployee = employee === undefined ? {} : employee;
  return selectedEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return employees.some((object) => object.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  let newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
  return employees;
}

function countAnimals(speciesToCount = undefined) {
  let allSpecies = {};
  if (speciesToCount !== undefined) {
    return species.find((object) => object.name === speciesToCount).residents.length;
  }
  species.forEach((object) => {
    allSpecies[object.name] = object.residents.length;
  });
  return allSpecies;
}

function calculateEntry(entrants = { Adult: 0, Senior: 0, Child: 0 }) {
  const keys = Object.keys(entrants);
  return keys.reduce((total, key) => total + (prices[key] * entrants[key]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const weekHours = Object.keys(hours);
  const schedule = {};
  weekHours.forEach((day) => {
    if (hours[day].open === hours[day].close) {
      schedule[day] = 'CLOSED';
    } else {
      schedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
    return schedule;
  });
  return dayName === undefined
    ? schedule
    : { [dayName]: schedule[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const managedSpecies = employees.find((object) => object.id === id).responsibleFor;
  const selectedResidents = species.find((object) => object.id === managedSpecies[0]).residents;
  const olderAnimal = selectedResidents.reduce((older, object) => {
    if (older.age < object.age) older = object;
    return older;
  }, { name: '', sex: '', age: 0 });
  return Object.values(olderAnimal);
}

function increasePrices(percentage) {
  const priceLevels = Object.keys(prices);
  priceLevels.forEach((category) => {
    const intSum = Math.ceil(prices[category] * (100 + percentage));
    prices[category] = parseFloat((intSum / 100).toFixed(2));
  });
}

function getEmployeeCoverage(idOrName) {
  const fullCoverage = {};
  employees.forEach((object) => {
    let animalsCovered = [];
    object.responsibleFor.forEach((id) => {
      animalsCovered.push(species.find((specie) => specie.id === id).name);
    });
    fullCoverage[`${object.firstName} ${object.lastName}`] = animalsCovered;
  });
  if (idOrName === undefined) return fullCoverage;

  const selectedEmployee = employees.find((object) => Object.values(object).includes(idOrName));
  const fullName = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
  return { [fullName]: fullCoverage[fullName] };
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
