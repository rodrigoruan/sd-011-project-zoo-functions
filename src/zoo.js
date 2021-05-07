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

// Caso receba nenhum parâmetro, necessário retornar um array vazio'
// Ao receber como parâmetro um único id, retorna um array com a espécie referente à esse id'
// Ao receber mais de um id, retorna um array com as espécies referentes aos ids'
// O método filter() cria um novo array com todos os elementos que passaram no teste implementado
// O método includes ()determina se um array contém um determinado elemento, retornando true ou false

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((species) => ids.includes(species.id));
}

// Ao passar o nome de uma espécie e uma idade,
// testa se todos os animais desta espécie possuem a idade mínima especificada'
// O every()método verifica se todos os elementos em uma matriz passam em um teste

function getAnimalsOlderThan(species, age) {
  // seu código aqui
  return data.species.find((nome) => nome.name === species).residents.every((idade) => idade.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
}

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
