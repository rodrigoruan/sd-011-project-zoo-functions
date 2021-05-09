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

function getSpeciesByIds(...ids) {
  if (ids === undefined) return [];
  return species.filter((animais) => ids.find((id) => id === animais.id));
}

function getAnimalsOlderThan(animal, age) {
  const ageAnimals = species.find((bicho) => bicho.name === animal);
  if (ageAnimals === age) return true;
  return ageAnimals.residents.every((num) => num.age >= age);
}

function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return ({});
  return employees.find(((funcionario) => (
    funcionario.firstName === employeeName || funcionario.lastName === employeeName)
  ));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const funcionario = ({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employees.push(funcionario);
}

function countAnimals(specie) {
  if (specie) {
    return species.find(({ name }) => name === specie).residents.length;
  }
  return species.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}
console.log(countAnimals('lions'));

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
