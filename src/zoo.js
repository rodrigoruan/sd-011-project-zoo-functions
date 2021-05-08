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
const { species } = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((animal) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const selectedSpecie = species.find((specie) => specie.name === animal);
  const ageAnimal = selectedSpecie.residents.every((animals) => animals.age >= age);
  return ageAnimal;
}

const { employees } = require('./data');

function getEmployeeByName(employeeName) {
  const employerByFirstName = employees.find((employer) => employer.firstName === employeeName);
  const employerByLastName = employees.find((employer) => employer.lastName === employeeName);
  return employerByFirstName || employerByLastName || {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // verifica se o id recebido esta entre os manager, Se sim, true. Se nao,false.
  return employees.some((employer) => employer.managers.some(((idManager) => idManager === id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(speciess) {
  if (speciess) {
    const animall = species.find((animall) => animall.name === speciess);
    return animall.residents.length;
  }
  if (!speciess) {
    const allAnimal = species.map((element) => {
      const { name, residents } = element;
      return { [`${name}`]: residents.length, }
    });
    return Object.assign({}, ...allAnimal);
  }
}
// -- EX 8 --
function calculateByTarget(target) {
  return targetPrice;
  // return Number((targetPrice * Object.values(target)));
}

// console.log(calculateByTarget('Adult'));
// 
const test = { 'Adult': 2, 'Child': 3, 'Senior': 1 };
console.log(Object.keys(test)[0]);

function calculateEntry(entrants) {
  const priceAge = Object.entries(entrants).find((target) => target.keys === )

  // acessar o preço em cada chave do objeto
  // fazer uma função que acesse um valor passado (valor sendo o valor da chave passada) e retorna seu valor
  // Essa função soma os valores e retorna o total
  // Somar o valor de todas as chavas e devolver
  
  // Condicionais se vazio
}

// O parâmetro entrants recebe um objeto que contém as chaves Adult, Child e Senior, com suas respectivas quantidades de pessoas
// { 'Adult': 2, 'Child': 3, 'Senior': 1 };
// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos

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
