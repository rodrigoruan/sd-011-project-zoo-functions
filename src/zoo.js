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

const { species, employees, prices } = require('./data');
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

}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const nomes = [...employees];
}

function countAnimals(specie) {
  // seu código aqui
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
