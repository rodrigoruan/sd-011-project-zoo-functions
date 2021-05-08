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

const { species, employees, hours, prices } = data;

function getSpeciesByIds(...ids) {
  return species.filter((animal) => ids.includes(animal.id));
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((creature) => creature.name === animal).residents
    .every((creature) => creature.age >= age);
}

function getEmployeeByName(employeeName) {
  return employees
    .find((employee) => [employee.firstName, employee.lastName].includes(employeeName)) || {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  if (specie) {
    return species.find((animal) => animal.name === specie).residents.length;
  }
  return species.reduce((object, { name: animalName, residents: animals }) => {
    object[animalName] = animals.length;
    return object;
  }, {});
}

function calculateEntry(entrants = {}) {
  return Object
    .entries(entrants)
    .reduce((total, [ageGroup, quantity]) => total + prices[ageGroup] * quantity, 0);
}

function getAnimalMap(options) {
  if (!options) {
    return species.reduce((object, animal) => {
      object[animal.location].push(animal.name);
      return object;
    }, { NE: [], NW: [], SE: [], SW: [] });
  }
}

function getSchedule(dayName) {
  if (!dayName) {
    const finalObject = Object.entries(hours).reduce((object, [day, { open, close }]) => {
      object[day] = `Open from ${open}am until ${close % 12}pm`;
      return object;
    }, {});
    finalObject.Monday = 'CLOSED';
    return finalObject;
  }
  return { [dayName]: dayName === 'Monday' ? 'CLOSED'
    : `Open from ${hours[dayName].open}am until ${hours[dayName].close % 12}pm` };
  // Need a refactoring!!
}

console.log(getSchedule('Tuesday'));

function getOldestFromFirstSpecies(id) {
  const firstAnimalId = employees.find((employee) => employee.id === id).responsibleFor[0];
  const animalsArray = species.find((animal) => animal.id === firstAnimalId);
  return Object.values(animalsArray.residents.sort((animal1, animal2) => animal2.age - animal1.age)[0]);
}

function increasePrices(percentage) {
  Object.entries(prices).forEach(([ageGroup, price]) => {
    prices[ageGroup] = Math.round((price * (percentage / 100 + 1)) * 100) / 100;
  });
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
