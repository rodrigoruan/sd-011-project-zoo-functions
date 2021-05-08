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
  if (ids.length === 0) {
    return [];
  }
  return data.species.find((especie) => ids.includes(especie.id));
}

function getAnimalsOlderThan(animal, age) {
  const retornoDaEspecie = data.species.find((nome) => animal.includes(nome.name));
  if (retornoDaEspecie.residents.every((idade) => idade.age >= age)) {
    return true;
  }
  return false;
}

function getEmployeeByName(...employeeName) {
  if (employeeName.length === 0) {
    return [];
  }
  let primeiroNome = data.employees.filter((pessoa) => employeeName.includes(pessoa.firstName));
  let segundoNome = data.employees.filter((pessoa) => employeeName.includes(pessoa.lastName));
  if (primeiroNome.length > 0) {
    return primeiroNome;
  }
  if (segundoNome.length > 0) {
    return segundoNome;
  }
}

function createEmployee(personalInfo, associatedWith) {
  let novoColaborador = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return novoColaborador;
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
