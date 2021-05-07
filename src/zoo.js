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

const { species, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return species.filter((spacies) => ids.some((id) => spacies.id === id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return species.find((value) => value.name === animal).residents.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees.find((val) => val.firstName === employeeName || val.lastName === employeeName);
}

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });
// seu código aqui

const isManager = (id) => data.employees.some((element) => element.managers.includes(id));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  let result = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return result;
}

function countAnimals(specie) {
  // seu código aqui
  const animaisTotal = {};
  if (!specie) {
    species.forEach((value) => {
      animaisTotal[value.name] = value.residents.length;
    });
    return animaisTotal;
  }
  return species.find((spe) => specie === spe.name).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (entrants === undefined || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  const result = {};
  if (dayName && dayName !== 'Monday') {
    result[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
    return result;
  }
  if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
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

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const getId = data.employees.filter((ids) => ids.id === id)[0].responsibleFor[0];
  const getAnimal = data.species.filter((value) => value.id === getId)[0].residents;
  const getOldSpecies = getAnimal.reduce((acc, list) => Math.max(acc, list.age), 0);
  const result = getAnimal.find((age) => age.age == getOldSpecies);

  return [result.name, result.sex, result.age]
}
console.log(getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'))
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
