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

const { species, employees, prices, hours } = data;

function getSpeciesByIds(...ids) {
  return species.filter((element) => ids.includes(element.id));
}

function getAnimalsOlderThan(animal, age) {
  return species.find((specieName) => specieName.name === animal).residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {};
  return Object.assign(newEmployee, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some((people) => people.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(text) {
  if (text === undefined) {
    const all = {};
    species.forEach((specie) => {
      all[specie.name] = specie.residents.length;
    });
    return all;
  } const oneSpecie = species.find((specie) => specie.name === text);
  return oneSpecie.residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  return Object.keys(entrants).reduce((totalPrice, entries) => totalPrice + (prices[entries] * entrants[entries]), 0);
}

function getAnimalMap(options) {

}

function getSchedule(dayName) {
  const hoursOn = Object.entries(data.hours).reduce((acc, [key, value]) => {
    const { open, close } = value;
    acc[key] = (close - open > 0) ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (typeof dayName === 'string' && dayName !== 0) return { [dayName]: hoursOn[dayName] };
  return hoursOn;
}

function getOldestFromFirstSpecies(id) {
  const employeeSelect = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const animalRef = data.species
    .find((nameSpecie) => nameSpecie.id === employeeSelect).residents
    .sort((young, old) => old.age - young.age);
  return Object.values(animalRef[0]);
}

function increasePrices(percent) {
  const calcValue = 1 + (percent / 100);
  Object.keys(data.prices).forEach((key) => { data.prices[key] = Math.round(data.prices[key] * calcValue * 100) / 100; });
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
