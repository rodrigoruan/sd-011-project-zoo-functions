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
// console.log(data.employees);

function getSpeciesByIds(...ids) {
  // if (ids.length === 0) return [];
  // return data.species.filter((zooAnimal) => {
  //   for (let index of ids) {
  //     if (zooAnimal.id === index) {
  //       return zooAnimal;
  //     }
  //   }
  // });
}

function getAnimalsOlderThan(animal, minAge) {
  return data.species.find((zooAnimal) => zooAnimal.name === animal).residents.every((zooAge) => zooAge.age >= minAge);
}

function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return data.employees.find((employee) => (employee.firstName === employeeName || employee.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}
// .some((person) => idParam === person.managers
function isManager(idParam) {
  // return data.employees.some((managerId) => managerId === idParam);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // return data.employees.push({
  //   id: id,
  //   firstName: firstName,
  //   lastName: lastName,
  //   managers: managers,
  //   responsibleFor: responsibleFor,
  // })
}

function countAnimals(species) {
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
