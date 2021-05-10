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
  return data.species.filter((specie) => ids.includes(specie.id));
}

getSpeciesByIds();
function getAnimalsOlderThan(animal, age) {
  const mySpecie = data.species.find((specie) => specie.name === animal);
  return mySpecie.residents.every((myAge) => myAge.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const firstLastName = data.employees.find((names) => names.firstName === employeeName || names.lastName === employeeName);
  return firstLastName;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((management) => management.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObj = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return newObj;
}

function countAnimals(species) {
  const countAnimal = {};
  if (!species) {
    data.species.forEach((animal) => {
      countAnimal[animal.name] = animal.residents.length;
    });
    return countAnimal;
  }
  return data.species.find((element) => species === element.name).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let resultSchedule = {};
  if (dayName === undefined) {
    return {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED',
    };
  }
  if (dayName === 'Monday') {
    resultSchedule.Monday = 'CLOSED';
    return resultSchedule;
  }
  resultSchedule[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
  return resultSchedule;
}

function getOldestFromFirstSpecies(id) {
  const getOldSpecie = data.employees.find((element) => element.id === id).responsibleFor[0];
  const getSpecieReturn = data.species.find((value) => value.id === getOldSpecie).residents;
  const sortSpecies = getSpecieReturn.sort((a, b) => b.age - a.age)[0];
  return Object.values(sortSpecies);
}
console.log(getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

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
