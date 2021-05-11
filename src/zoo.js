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

const { species, prices, hours } = require('./data');
const { employees } = require('./data');

const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((item) => ids.some((id) => item.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const animalFind = species.find((item) => item.name === animal);
  return animalFind.residents.every((item) => item.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((item) => item.firstName === employeeName || item.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return employees.some((item) => item.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  if (!specie) {
    const newObjAnimals = {};
    species.forEach((item) => { newObjAnimals[item.name] = item.residents.length; });
    return newObjAnimals;
  }
  return species.find((item) => item.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((accumulator, currentValue) => accumulator + (prices[currentValue] * entrants[currentValue]), 0);
}

function getAnimalMap(options) {
  // seu código aqui 
}

function getSchedule(dayName) {
  const returnResult = {};
  if (dayName && dayName !== 'Monday') {
    returnResult[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
    return returnResult;
  }
  if (dayName === 'Monday') return { Monday: 'CLOSED' };

  return {
    Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close - 12}pm`,
    Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
    Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
}

function getOldestFromFirstSpecies(id) {
  const idParam = employees.find((item) => item.id === id).responsibleFor[0];
  const firstSpecieAnimal = species.find((elem) => elem.id === idParam).residents.filter((item, _, array) => item.age === array.reduce((acc, value) => Math.max(acc, value.age), 0))[0];
  const { name, sex, age } = firstSpecieAnimal;
  return [name, sex, age];
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
