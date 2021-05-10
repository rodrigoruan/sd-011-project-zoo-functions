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

const { species, employees, hours, prices } = data;

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

function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => { prices[key] = Math.round(prices[key] * ((percentage / 100) + 1) * 100) / 100; });
}

function getEmployeeCoverage(idOrName) {
  const fullName = ({ firstName, lastName }) => `${firstName} ${lastName}`;
  const noParam = employees.reduce((acc, { firstName, lastName, responsibleFor }) => ({ ...acc, [fullName({ firstName, lastName })]: responsibleFor.map((getId) => species.find(({ id }) => getId === id).name) }), {});
  if (idOrName !== undefined) {
    const getSingleEmployee = fullName(employees.find(({ id, firstName, lastName }) => [id, firstName, lastName].includes(idOrName)));
    return { [getSingleEmployee]: noParam[getSingleEmployee] };
  }
  return noParam;
}
console.log(getEmployeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
