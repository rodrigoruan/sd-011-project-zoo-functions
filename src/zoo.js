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

const getSpeciesByIds = (...ids) => ids.map((element) => data.species.find((animal) => animal.id === element)); // seu código aqui

const getAnimalsOlderThan = (animal, number) => data.species.find((element) => element.name === animal).residents.every((object) => object.age >= number); // seu código aqui

const getEmployeeByName = (employeeName) => data.employees.find((worker) => worker.firstName === employeeName || worker.lastName === employeeName) || {}; // seu código aqui

const createEmployee = ({ id, firstName, lastName }, { managers, responsibleFor }) => ({ id, firstName, lastName, managers, responsibleFor }); // seu código aqui

const isManager = (id) => data.employees.some((element) => element.managers.includes(id)); // seu código aqui

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => data.employees.push({ id, firstName, lastName, managers, responsibleFor }); // seu código aqui

const countAnimals = (animal) => {
  // seu código aqui
  if (animal) {
    return data.species.find((element) => element.name === animal).residents.length;
  }
  let result = {};
  data.species.forEach((bicho) => {
    result[bicho.name] = bicho.residents.length;
  });
  return result;
};
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
