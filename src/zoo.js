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
  let countObjt = {};
  species.forEach((animal) => { countObjt[animal.name] = animal.residents.length; });
  return countObjt;
}
function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) { return 0; }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultsPrice = Adult * data.prices.Adult;
  const childrenPrice = Child * data.prices.Child;
  const seniorsPrice = Senior * data.prices.Senior;
  return adultsPrice + childrenPrice + seniorsPrice;
  // seu código aqui
}
console.log(calculateEntry({ Child: 1 }))

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
