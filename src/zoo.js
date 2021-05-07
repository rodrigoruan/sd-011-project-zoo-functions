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

const { species } = require('./data');
const { employees } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) => {
  const report = ids.map((id) => (
    species.find((specie) => specie.id === id)
  ));

  return report;
};

const getAnimalsOlderThan = (animal, age) => {
  const getAnimal = species.find((specie) => specie.name === animal);
  const checkAge = getAnimal.residents.every((resident) => resident.age >= age);

  return checkAge;
};

const getEmployeeByName = (employeeName) => {
  if (employeeName === undefined) {
    return {};
  }

  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
};

const createEmployee = ({ id, firstName, lastName }, { managers, responsibleFor }) => (
  {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  }
);

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(speciess) {
  // seu código aqui
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
