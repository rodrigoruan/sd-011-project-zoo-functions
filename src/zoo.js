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

// const { employees } = require('./data');
const data = require('./data');
// const { species, employees } = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((animal) => ids.some((id) => animal.id === id)); // (!ids ? [] : animal.id === ids[0] || animal.id === ids[1]
}

function getAnimalsOlderThan(animal, age) {
  const specie = data.species.find((especie) => especie.name === animal);
  return specie.residents.every((idade) => idade.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
  // return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((accumulator, value) => {
      accumulator[value.name] = value.residents.length;
      return accumulator;
    }, {});
  }
  const specie = data.species.find((animal) => animal.name === species);
  return specie.residents.length;
}

function calculateEntry(entrants = {}) {
  function soma({ Adult = 0, Child = 0, Senior = 0 }) {
    let sum = 0;
    sum += data.prices.Adult * Adult;
    sum += data.prices.Child * Child;
    sum += data.prices.Senior * Senior;
    return sum;
  }
  return soma(entrants);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  const animalKey = data.employees.find((funcionario) => funcionario.id === id).responsibleFor[0];
  const animals = data.species.find((animal) => animal.id === animalKey).residents;
  const maxAge = animals.reduce((accumulator, idade) => Math.max(accumulator, idade.age), 0);
  const animalMaxAge = animals.find((animal) => animal.age === maxAge);
  return [animalMaxAge.name, animalMaxAge.sex, animalMaxAge.age];
}

getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992');
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
