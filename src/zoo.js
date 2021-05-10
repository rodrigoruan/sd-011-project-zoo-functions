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
  return data.species.filter((specie) => ids.includes(specie.id)); // utilizei o data para chamar somente na função
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
    ...personalInfo, // usando o spread, consigo criar um novo colaborador
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
  return data.employees.push(createEmployee(personalInfo, associatedWith));
}

function countAnimals(species) {
  const totalAnimals = data.species.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
  }, {});
  if (species) return totalAnimals[species];
  return totalAnimals;
}

function calculateEntry(entrants) {
  return (!entrants) ? 0 : Object.keys(entrants).reduce((total, cur) => total + (entrants[cur] * data.prices[cur]), 0);
}
// se não houver entradas, o valor é zero, senão, o total será a soma do número de pagantes * o preço do ingresso (adulto, sênior, ou criança). O object keys, vai pegar as chaves das entradas (adult[0], child[1], sênior[2])

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
  const newValue = 1 + (percentage / 100);
  Object.keys(data.prices).forEach((key) => {
    data.prices[key] = Math.round(data.prices[key] * newValue * 100) / 100;
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
