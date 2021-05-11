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
  if (entrants) {
    Object.keys(entrants).forEach((element) => {
      valor += entrants[element] * prices[element];
    });
  }
  return valor;
}

function getAnimalMap(options) {
  // seu código aqui
}

function trataData(dayName, dayWeek, calendario) {
  if (dayWeek === dayName || dayName === undefined) {
    const openClose = hours[dayWeek];
    const { open } = openClose;
    const close = openClose.close - 12;
    calendario[dayWeek] = `Open from ${open}am until ${close}pm`;
    if (open === 0 && close <= 0) {
      calendario[dayWeek] = 'CLOSED';
    }
  }
}

function getSchedule(dayName) {
  let calendario = {};
  for (let dayWeek in hours) {
    if ({}.hasOwnProperty.call(hours, dayWeek)) {
      trataData(dayName, dayWeek, calendario);
    }
  }
  return calendario;
}

function getOldestFromFirstSpecies(id) {
  const ids = employees.find((element) => element.id === id).responsibleFor[0];
  const old = species.find((element) => element.id === ids).residents.sort((ageA, ageB) => (ageB.age - ageA.age))[0];
  let arrayAnimais = [];
  for (let key in old) {
    if ({}.hasOwnProperty.call(old, key)) arrayAnimais.push(old[key]);
  }
  return arrayAnimais;
}

console.log(getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  for (let key in prices) {
    if ({}.hasOwnProperty.call(prices, key)) {
      prices[key] *= (percentage / 100 + 1);
      prices[key] = Math.round(prices[key] * 100) / 100;
    }
  }

  return prices;
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
