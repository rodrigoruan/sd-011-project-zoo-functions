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

const { species, employees, hours, prices } = require('./data');
// const data = require('./data');

// 1. Esta função é responsável pela busca das espécies de animais por id. Ela retorna um array contendo as espécies referentes aos ids passados como parâmetro, podendo receber um ou mais ids.
function getSpeciesByIds(...ids) {
  if (ids !== null && ids !== undefined) {
    return species.filter((animal) => ids.includes(animal.id));
  }
  return [];
}

// 2. Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais daquela espécie possuem a idade mínima especificada
function getAnimalsOlderThan(animal, age) {
  return species.find((especieName) => especieName.name === animal)
    .residents.every((animalAge) => animalAge.age >= age);
}

// 3. Esta função é responsável pela busca das pessoas colaboradoras através do primeiro ou do último nome delas
function getEmployeeByName(employeeName) {
  if (employeeName !== null && employeeName !== undefined) {
    return employees.find((name) =>
      name.firstName === employeeName || name.lastName === employeeName);
  }
  return {};
}

// 4. A função, a partir de informações recebidas nos parâmetros, é capaz de criar um objeto equivalente ao de uma pessoa colaboradora, retornando-o
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// 5. Verifica se uma pessoa colaboradora, a partir de seu id, ocupa cargo de gerência.
function isManager(id) {
  return employees.some((managerCheck) => managerCheck.managers.includes(id));
}

// 6. A função irá adicionar uma nova pessoa colaboradora ao array employees, presente no arquivo data.js.
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployee);
}

// 7. Esta função é responsável por contabilizar a quantidade de animais.
function countAnimals(animal) {
  const animaisAndQuantities = {};
  if (animal === null || animal === undefined) {
    species.forEach((specie) => {
      animaisAndQuantities[specie.name] = specie.residents.length;
    });
    return animaisAndQuantities;
  }
  return species.find((specie) => specie.name === animal).residents.length;
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
