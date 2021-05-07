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

function getSpeciesByIds(...ids) {
  if (!ids) {
    return [];
  }
  return data.species.filter((specie) => ids.includes(specie.id));
}

console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce')); // retorna as espécies de leões

function getAnimalsOlderThan(animal, age) {
  let result = data.species.find((specie) => specie.name === animal); // procurando animais por nome
  if (result) {
    result = result.residents.every((specie) => specie.age >= age);
  }
  return result; // retorna true ou false, se não existir o animal, retorna undefined
}

console.log(getAnimalsOlderThan('giraffes', 4)); // a espécie de 'girafas' , tem idade maior ou igual a 4? true!

function getEmployeeByName(employeeName) {
  if (employeeName) {
    return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return {};
}

console.log(getEmployeeByName('Stephanie')); // retornou o objeto com todas as informações da funcionária.

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo, // usando o destructuring, consigo criar um novo colaborador
    ...associatedWith,
  };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

console.log(isManager('b0dc644a-5335-489b-8a2c-4e086c7819a2')); // true

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  data.employees.push(createEmployee(personalInfo, associatedWith));
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
