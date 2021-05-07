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

const getSpeciesByIds = (...ids) => data.species.filter((value) => ids.includes(value.id));

const getAnimalsOlderThan = (animal, age) => data.species.find(((value) => value.name === animal)).residents.every((value) => value.age >= age);

const getEmployeeByName = (employeeName) => {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => data.employees.some(({ managers }) => managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
};

const countAnimals = (specie) => {
  // seu código aqui
};

const calculateEntry = (entrants) => {
  // seu código aqui
};

const getAnimalMap = (options) => {
  // seu código aqui
};

const getSchedule = (dayName) => {
  // seu código aqui
};

const getOldestFromFirstSpecies = (id) => {
  // seu código aqui
};

const increasePrices = (percentage) => {
  // seu código aqui
};

const getEmployeeCoverage = (idOrName) => {
  // seu código aqui
};

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
