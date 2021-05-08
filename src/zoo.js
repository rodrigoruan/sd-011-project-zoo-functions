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
const { species } = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((animal) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const selectedSpecie = species.find((specie) => specie.name === animal);
  const ageAnimal = selectedSpecie.residents.every((animals) => animals.age >= age);
  return ageAnimal;
}

const { employees } = require('./data');

function getEmployeeByName(employeeName) {
  const employerByFirstName = employees.find((employer) => employer.firstName === employeeName);
  const employerByLastName = employees.find((employer) => employer.lastName === employeeName);
  return employerByFirstName || employerByLastName || {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // verifica se o id recebido esta entre os manager, Se sim, true. Se nao,false.
  return employees.some((employer) => employer.managers.some(((idManager) => idManager === id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(speciess) {
  if (speciess) {
    const animal = species.find((animal) => animal.name === speciess);
    return animal.residents.length;
  }
  if (!speciess) {
    const allAnimal = species.map((element) => {
      const { name, residents} = element;
      return {[`${name}`]: residents.length,};
    });
    return Object.assign({}, ...allAnimal);
  }
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
