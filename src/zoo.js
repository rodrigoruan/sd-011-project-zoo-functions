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
console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function getAnimalsOlderThan(animal, age) {
  const ageAnimals = species.find((bicho) => bicho.name === animal);
  if (ageAnimals === age) return true;
  return ageAnimals.residents.every((num) => num.age >= age);
}
console.log(getAnimalsOlderThan('lions', 4));

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
console.log(isManager('9e7d4524-363c-416a-8759-8aa7e50c0992'));

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

// eslint-disable-next-line no-shadow
function countAnimals(specie) {
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
