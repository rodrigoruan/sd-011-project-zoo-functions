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

const { employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  if (ids === null) return [];
  return (ids.map((id) => data.species.find((animal) => animal.id === id)));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const rightSpecies = data.species.find((element) => element.name === animal);
  const areAllOlder = rightSpecies.residents.every((species) => species.age >= age);
  return areAllOlder;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return ({});
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  // seu código aqui
  const employeesManagers = employees.map((employee) => employee.managers);
  return employeesManagers.some((managers) => managers.some((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  if (species === undefined) {
    const animalsObject = {};
    data.species.forEach((animal) => {
      animalsObject[animal.name] = animal.residents.length;
    });
    return animalsObject;
  }
  const foundAnimal = data.species.find((animal) => animal.name === species);
  return foundAnimal.residents.length;
}

const verifyCases = (entrants) => {
  if (entrants === undefined) return 0;
  if (entrants === {}) return 0;
};
const assign0 = (entrants) => {
  if (entrants.Adult === undefined) entrants.Adult = 0;
  if (entrants.Child === undefined) entrants.Child = 0;
  if (entrants.Senior === undefined) entrants.Senior = 0;
};
function calculateEntry(entrants) {
  // seu código aqui
  if (verifyCases(entrants) === 0) return 0;
  assign0(entrants);
  return (entrants.Adult * 49.99 + entrants.Child * 20.99 + entrants.Senior * 24.99);
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
