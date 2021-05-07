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

const { prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.reduce((animals, currentId) => {
    const animalObj = data.species.find(({ id }) => id === currentId);
    animals.push(animalObj);
    return animals;
  }, []);
}

function getAnimalsOlderThan(animal, age) {
  const currentAnimal = data.species.find(({ name }) => name === animal);
  return currentAnimal.residents.every((currentResident) => currentResident.age > age);
}

function getEmployeeByName(employeeName) {
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName) || {};
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some((person) => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push(createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));
}

function countAnimals(species) {
  if (species) {
    return data.species.find(({ name }) => name === species).residents.length;
  }
  return data.species.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}

function calculateEntry(entrants = {}) {
  const values = Object.values(data.prices);
  const keys = Object.keys(data.prices);
  return values.reduce((total, current, index) => {
    const person = entrants[keys[index]] || 0;
    const price = current * person;
    return total + price;
  }, 0);
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
