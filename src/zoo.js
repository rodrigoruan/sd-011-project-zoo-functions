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
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids === '') {
    return [];
  }
  const nameAnimals = ids.map((id) => data.species.find((specie) => specie.id === id));
  return nameAnimals;
}

getSpeciesByIds();
function getAnimalsOlderThan(animal, age) {
  const getAnimals = data.species.find((specie) => specie.name === animal).residents;
  return getAnimals.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find((value) => value.firstName === employeeName || value.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some((value) => value.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor };
  return data.employees.push(newObject);
}

function countAnimals(specie) {
  const counter = (cont) => cont + 1;
  if (specie === undefined) {
    let generalObject = {};
    data.species.forEach((value) => { generalObject[value.name] = value.residents.length; });
    return generalObject;
  }
  const selectedAnimal = data.species.filter((value) => value.name === specie);
  const { residents: arrayResidents } = selectedAnimal[0];
  return arrayResidents.reduce(counter, 0);
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
