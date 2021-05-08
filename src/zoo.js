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

const { species, employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const specieById = [];
  if (ids === null) { return specieById; }
  ids.forEach((id, index) => { specieById.push(species.find((specie) => specie.id === ids[index])); });
  return specieById;
}
function getAnimalsOlderThan(animal, age) {
  return species.find((animals) => animals.name === animal).residents.every((residente) => residente.age >= age);
}
function getEmployeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}
function createEmployee(personalInfo, associatedWith) {
}

function isManager(id) {
  let managersArray = [];
  employees.forEach((employee, index) => { managersArray.push(employee.managers[index]); });
  return managersArray.some((man) => man === id);
}
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmploye = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newEmploye);
}

function countAnimals(especies) {
  if (especies !== undefined) { return species.find((specie) => specie.name === especies).residents.length; }
  return {
    lions: species.find((specie) => specie.name === 'lions').residents.length,
    tigers: species.find((specie) => specie.name === 'tigers').residents.length,
    bears: species.find((specie) => specie.name === 'bears').residents.length,
    penguins: species.find((specie) => specie.name === 'penguins').residents.length,
    otters: species.find((specie) => specie.name === 'otters').residents.length,
    frogs: species.find((specie) => specie.name === 'frogs').residents.length,
    snakes: species.find((specie) => specie.name === 'snakes').residents.length,
    elephants: species.find((specie) => specie.name === 'elephants').residents.length,
    giraffes: species.find((specie) => specie.name === 'giraffes').residents.length,
  };
}
function calculateEntry(entrants) {
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
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
