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

const { prices } = require("./data");
const data = require("./data");

const { species } = data;
const { employees } = data;
const { Adult, Senior, Child } = prices;

const getSpeciesByIds = (...ids) =>
  ids ? species.filter((animal) => [...ids].includes(animal.id)) : [];

const getAnimalsOlderThan = (animal, age) =>
  species
    .find((animalName) => animalName.name === animal)
    .residents.every((animals) => animals.age >= age);

const getEmployeeByName = (employee) =>
  employee
    ? employees.find(
        (name) => name.firstName === employee || name.lastName === employee
      )
    : {};

const createEmployee = (personalInfo, associatedWith) => ({
  ...personalInfo,
  ...associatedWith,
});

const isManager = (id) =>
  employees.some((worker) => worker.managers.includes(id));

const addEmployee = (
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) =>
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });

const countAnimals = (specie) =>
  specie
    ? species.find((animal) => animal.name === specie).residents.length
    : Object.fromEntries(
        species.map((animal) => [animal.name, animal.residents.length])
      );

const calculateEntry = (entrants = 0) =>
  Object.entries(entrants).length
    ? Object.entries(entrants).reduce(
        (acc, curr) => acc + data.prices[curr[0]] * curr[1],
        0
      )
    : 0;

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
