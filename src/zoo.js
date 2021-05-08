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

const { species } = require('./data');
const { employees } = require('./data');
const { hours } = require('./data');
const { prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return ids.map((animalId) => species.find(({ id }) => id === animalId));
}

function getAnimalsOlderThan(animal, animalAge) {
  // seu código aqui
  return species.find(({ name }) => name === animal).residents.every(({ age }) => age > animalAge);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  return employeeName ? employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}
// console.log(createEmployee());

function isManager(id) {
  // seu código aqui
  let employer = employees.find((employee) => employee.id === id);
  return (employer.firstName === 'Stephanie' || employer.firstName === 'Ola' || employer.firstName === 'Burl');
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(animal) {
  // seu código aqui
  let animalsCount = {};
  if (animal) return species.find(({ name }) => name === animal).residents.length;
  species.forEach(({ name }, index) => {
    animalsCount[name] = species[index].residents.length;
  });
  return animalsCount;
}

function calculateEntry(entrants = {}) {
  // seu código aqui
  const { Adult, Child, Senior } = entrants;
  const adultPrice = prices.Adult;
  const childPrice = prices.Child;
  const seniorPrice = prices.Senior;
  const adults = (Adult ? Adult * adultPrice : 0);
  const childs = (Child ? Child * childPrice : 0);
  const seniors = (Senior ? Senior * seniorPrice : 0);
  return adults + childs + seniors;
}

function getAnimalMap(options) {
  // seu código aqui


  }

function getSchedule(dayName) {
  // seu código aqui
  let schedule = {};
  let days = Object.keys(hours);
  if (dayName) {
    schedule[dayName] = ((hours[dayName].open === 0) ? `CLOSED` : `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`);
  } else {
    days.forEach((day) => (day !== 'Monday') ? schedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm` : schedule[day] = 'CLOSED');
  }
  return schedule;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
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
