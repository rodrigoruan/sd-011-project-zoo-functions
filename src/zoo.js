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
  let animalsIds = [];

  data.species.forEach((animalById) => {
    if (ids.includes(animalById.id)) {
      animalsIds.push(animalById);
    }
  });
  return animalsIds;
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animal2) => animal2.name === animal).residents.every((age2) => age2.age >= age);
}

function getEmployeeByName(employeeName) {
  let empregadoProcurado;
  if (employeeName === undefined) {
    empregadoProcurado = {};
  } else {
    empregadoProcurado = data.employees.find((procura) => procura.firstName === employeeName || procura.lastName === employeeName);
  }
  return empregadoProcurado;
}

function createEmployee(personalInfo, associatedWith) {
  let newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((gerente) => gerente.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const novoEmpregado = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(novoEmpregado);
  return data.employees;
}

function countAnimals(species) {
  let quantidadeAnimal = {};
  if (species === null || species === undefined) {
    data.species.forEach((specie) => {
      quantidadeAnimal[specie.name] = specie.residents.length;
    });
    return quantidadeAnimal;
  }
  return data.species.find((specie) => specie.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === {} || entrants === undefined || entrants === null) {
    return 0;
  }
  return Object.keys(entrants).reduce((accumulator, valor) => accumulator + (data.prices[valor] * entrants[valor]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  const empregados = data.employees.find((foundEmployees) => foundEmployees.id === id).responsibleFor[0];
  return Object.values(data.species
    .find((foundSpecie) => foundSpecie.id === empregados)
    .residents.sort((age1, age2) => age2.age - age1.age)[0]);
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
