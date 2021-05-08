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
// Mudança para commit

const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter(({ id }) => ids.some((idOfArray) => idOfArray === id));
}

// animal, age
function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return (data.species.find((specie) => specie.name === animal)).residents.every((animalName) => animalName.age > age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  // seu código aqui
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

// Cria um novo colaborador a partir de objetos contendo informações pessoais e gerentes e animais gerenciados.
function isManager(id = false) {
  // seu código aqui
  return data.employees.some((employeeInfo) => employeeInfo.managers.some((idCheck) => idCheck === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

// A função irá adicionar uma nova pessoa colaboradora ao array employees, presente no arquivo data.js.
// O que será avaliado
// Adiciona um funcionário no fim da lista

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
