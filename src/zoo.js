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
const { prices } = require('./data');
const data = require('./data');

const { species, employees, hours } = data;

function getSpeciesByIds(...ids) {
  return species.filter(({ id }) => ids.some((specie) => specie === id));
}

function getAnimalsOlderThan(animal, ages) {
  return species.find(({ name }) => animal === name).residents.every(({ age }) => age >= ages);
}

function getEmployeeByName(employeeName) {
  return employeeName === undefined ? {} : employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(ids) {
  return employees.some(({ managers }) => managers.includes(ids));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
  return employees;
}

function countAnimals(animals) {
  return animals === undefined ? species.reduce((acc, { name, residents }) => ({ ...acc, [name]: residents.length }), {}) : species.find(({ name }) => animals === name).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((accumulator, [key, value]) => accumulator + prices[key] * value, 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const schedule = Object.entries(hours).reduce((acc, [day, { open, close }]) => ({ ...acc, [day]: open - close === 0 ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm` }), {});
  return dayName === undefined ? schedule : { [dayName]: schedule[dayName] };
} // https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable

function getOldestFromFirstSpecies(ids) {
  const employeesResponsible = employees.find(({ id }) => id === ids).responsibleFor[0];
  const animals = species.find(({ id }) => id === employeesResponsible);
  const oldSpecie = animals.residents.sort((a, b) => b.age - a.age)[0];
  return [oldSpecie.name, oldSpecie.sex, oldSpecie.age];
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
