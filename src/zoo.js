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
const { species, employees } = require('./data');

const getSpeciesByIds = (...ids) => species.filter((specie) => ids.includes(specie.id));

const getAnimalsOlderThan = (animal, age) => species.find((specie) => specie.name === animal).residents.every((el) => el.age >= age);

const getEmployeeByName = (employeeName) => {
  if (!employeeName) {
    return {};
  }
  return employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => employees.some(({ managers }) => managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => employees.push({ id, firstName, lastName, managers, responsibleFor });

const countAnimals = (animals) => {
  const animalsCount = {};
  if (!animals) {
    species.forEach((element) => {
      animalsCount[element.name] = element.residents.length
    });
    return animalsCount;
  }
  return species.find((specie) => specie.name === animals).residents.length
}

console.log(countAnimals(species))

const calculateEntry = (entrants) => {
  
  
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
