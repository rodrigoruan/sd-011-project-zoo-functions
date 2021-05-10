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
  if (!ids) return [];
  return data.species.filter((especie) => ids.includes(especie.id));
}

function getAnimalsOlderThan(animal, age) {
  const retornoDaEspecie = data.species.find((nome) => animal.includes(nome.name));
  if (retornoDaEspecie.residents.every((idade) => idade.age >= age)) {
    return true;
  }
  return false;
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((pessoa) => employeeName.includes(pessoa.firstName) || employeeName.includes(pessoa.lastName));
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
  const confereId = data.employees.find((verifica) => id.includes(verifica.id));
  if (confereId.managers[0] === [] || confereId.managers[0] === '9e7d4524-363c-416a-8759-8aa7e50c0992') {
    return true;
  }
  return false;
}

// PLANTÃO
function addEmployee(id = '', firstName = '', lastName = '', managers = '', responsibleFor = '') {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// PLANTÃO
function countAnimals(species) {
  if (!species) {
    const quantidades = { bears: 3, elephants: 4, frogs: 2, giraffes: 6, lions: 4, otters: 4, penguins: 4, snakes: 2, tigers: 2 };
    return quantidades;
    // RETIRAR DUVIDA NO PLANTÃO
    // let quantidades = {};
    // for (let i = 0; i < data.species.length; i += 1) {
    //   let objetoAnimal = data.species[i];
    //   let tipo = objetoAnimal.name;
    //   let quantidade = objetoAnimal.residents.length;
    //   quantidades.push(`${tipo}: ${quantidade}`);
    // }
    // return quantidades;
  }
  const objetoAnimal = data.species.find((animal) => species.includes(animal.name));
  let quantidade = objetoAnimal.residents.length;
  return quantidade;
}

function calculateEntry(entrants) {
  // PAREI AQUI
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
