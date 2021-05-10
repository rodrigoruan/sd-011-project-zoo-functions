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

const { prices, hours } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) =>
  data.species.filter((species) => ids.some((id) => species.id === id));

const getAnimalsOlderThan = (animal, age) =>
  data.species.find((value) => value.name === animal).residents.every((value) => value.age >= age);

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((names) => names.firstName === employeeName || names.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

const isManager = (id) => data.employees.some((managers) => managers.managers.includes(id));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  return species ? data.species.find(({ name }) => name === species).residents.length : data.species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
}

function calculateEntry(entrants) {
  if (entrants === {} || !entrants) return 0;

  /* return Object.entries(entrants).reduce((acc, curr) => acc + curr[1] * prices[curr[0]], 0); */
  return Object.keys(entrants).reduce((acc, category) => acc + entrants[category] * prices[category], 0);
}

function getAnimalMap(options) {
  // codigo aqui
}

function getSchedule(dayName) {
  if (dayName === 'Monday') return { Monday: 'CLOSED' };
  if (!dayName) {
    return Object.keys(hours).reduce((acc, curr) => {
      acc[curr] = `Open from ${hours[curr].open}am until ${hours[curr].close - 12}pm`;
      acc.Monday = 'CLOSED';
      return acc;
    }, {});
  }

  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  const species = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const residents = data.species.find((animal) => animal.id === species).residents.sort((a, b) => b.age - a.age)[0];
  return Object.values(residents);
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
