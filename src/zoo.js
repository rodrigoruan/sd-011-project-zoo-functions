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

const { prices, species } = require('./data');
const data = require('./data');

// Caso receba nenhum parâmetro, necessário retornar um array vazio'
// Ao receber como parâmetro um único id, retorna um array com a espécie referente à esse id'
// Ao receber mais de um id, retorna um array com as espécies referentes aos ids'
// O método filter() cria um novo array com todos os elementos que passaram no teste implementado
// O método includes ()determina se um array contém um determinado elemento, retornando true ou false

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((species1) => ids.includes(species1.id));
}

// Ao passar o nome de uma espécie e uma idade,
// testa se todos os animais desta espécie possuem a idade mínima especificada'
// O every()método verifica se todos os elementos em uma matriz passam em um teste

function getAnimalsOlderThan(specie, age) {
  // seu código aqui
  return data.species.find((nome) => nome.name === specie).residents.every((idade) => idade.age >= age);
}

// Sem parâmetros, retorna um objeto vazio'
// 'Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário'
// 'Quando provido o último nome do funcionário, retorna o objeto do funcionário'
// O find()método retorna o valor do primeiro elemento em uma matriz que passa em um teste

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees.find((value) => value.firstName === employeeName || value.lastName === employeeName);
}

// Cria um novo colaborador a partir de objetos contendo informações pessoais, gerentes e animais gerenciados

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return ({ ...personalInfo, ...associatedWith });
}

// Testa se o id passado é de um gerente
// some () verifica se algum dos elementos em uma matriz passa em um teste

function isManager(id) {
  // seu código aqui
  return data.employees.some((value) => value.managers.includes(id));
}

// Adiciona um funcionário no fim da lista
// push para adicionar no final, managers, responsiblefor recebe array [] pq ele é um array

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade'

function countAnimals(specie) {
  // seu código aqui condição ? find, reduce
  const totalAnimals = {};
  if (!specie) {
    species.forEach((value) => {
      totalAnimals[value.name] = value.residents.length;
    });
    return totalAnimals;
  }
  return species.find((specie1) => specie === specie1.name).residents.length;
}

// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos

function calculateEntry(entrants) {
  // seu código aqui reduce
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acumulador, number) => acumulador + (prices[number] * entrants[number]), 0);
}

function getAnimalMap(options) {
  // seu código aqui reduce
}

// Sem parâmetros, retorna um cronograma legível para humanos
// Se um único dia for passado, retorna somente este dia em um formato legível para humanos

function getSchedule(dayName) {
  // seu código aqui condição if com ...

}

function getOldestFromFirstSpecies(id) {
  // seu código aqui *
}

// Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais

function increasePrices(percentage) {
  // seu código aqui condição ?
  Object.keys(prices).forEach((value) => {
    prices[value] = Math.round(prices[value] * (1 + (percentage * 0.01)) * 100) / 100;
  });
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui *
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
