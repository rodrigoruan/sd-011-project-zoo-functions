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

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const animals = ids.reduce((acumulator, elemento) => acumulator.concat(species.find((element) => element.id === elemento)), []);
  return animals;
}

function getAnimalsOlderThan(animal, age) {
  const animals = species.find((animais) => animais.name === animal).residents.every((idades) => idades.age >= age);
  return animals;
}

function getEmployeeByName(employeeName) {
  const funcionarios = employees.find((element) => element.firstName === employeeName || element.lastName === employeeName);
  return (funcionarios === undefined) ? {} : funcionarios;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const gerentes = employees.some((gerente) => gerente.managers.includes(id));
  return gerentes;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const nomes = employees.push({ id, firstName, lastName, managers, responsibleFor });
  return nomes;
}

function countAnimals(specie) {
  if (specie) {
    return species.find((animal) => animal.name === specie).residents.length;
  }
  let object = {};
  species.forEach((obj) => {
    object[obj.name] = obj.residents.length;
  });
  return object;
}

function calculateEntry(entrants) {
  let valor = 0;
  if (entrants !== {} && entrants !== undefined) {
    const key = Object.keys(entrants);
    key.forEach((element) => {
      const qtd = entrants[element];
      const price = prices[element];
      valor += qtd * price;
    });
  }

  return valor;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  for (let key in prices) {
    if ({}.hasOwnProperty.call(prices, key)) {
      prices[key] *= (percentage / 100 + 1);
      prices[key] = Math.round(prices[key] * 100) / 100;
    }
  }

  return prices;
}
// console.log(increasePrices(50));
// console.log(increasePrices(30));

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
