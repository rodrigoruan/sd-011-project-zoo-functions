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

const { employees, species } = require('./data');
const data = require('./data');

function getSpeciesByIds(ids) {
//   const eachId = (item) => item;
//   species.find((item) => item.id === ids.forEach(eachId));
}
// getSpeciesByIds(['0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46']);

function getAnimalsOlderThan(animal, age) {
  const residentAnimals = species.find((item) => item.name === animal).residents;
  return residentAnimals.every((item) => item.age > age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  let boss = [];
  employees.forEach((item) => {
    for (let i = 0; i < item.managers.length; i += 1) {
      boss.push(item.managers[i]);
    }
  });
  boss = boss.sort().filter((elem, index, self) => index === self.indexOf(elem));
  return boss.some((manager) => id === manager);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function countAnimals(Species) {
  //
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
