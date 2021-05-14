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
// solução com o apoio do plantão e consultas aos sites:
// https://desenvolvimentoparaweb.com/javascript/every-some-find-includes-javascript/
// https://renatofreire.dev/metodos-do-array-includes-javascript/

const data = require('./data');

function getSpeciesByIds(...ids) {
  const animalIds = data.species.filter((specie) => ids.includes(specie.id));
  return animalIds;
}
console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

// const { species } = require('./data');

// const data = require('./data');
// solução com o apoio do plantão e consultas aos sites:
// https://desenvolvimentoparaweb.com/javascript/every-some-find-includes-javascript/
// https://medium.com/reactbrasil/curtinhas-javascript-map-filter-e-reduce-1987502d679c

function getAnimalsOlderThan(animal, age) {
  const checkAnimal = data.species.find((specieName) => specieName.name === animal);
  const checkAge = checkAnimal.residents.every((specieAge) => specieAge.age >= age);
  return checkAge;
}
console.log(getAnimalsOlderThan('otters', 7));
console.log(getAnimalsOlderThan('penguins', 10));

const { employees } = require('./data');
//const data = require('./data');

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const EmployeeData = employees.find((employee) => employeeName === employee.firstName || employeeName === employee.lastName);
  return EmployeeData;
}
// const EmployeeLastName = employees.find(employee => employeeName === employee.lastName);
// return EmployeeLastName;
// }
console.log(getEmployeeByName());
console.log(getEmployeeByName('Emery'));
console.log(getEmployeeByName('Wishart'));


function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
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
