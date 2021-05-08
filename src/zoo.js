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

const {
  species,
  employees,
  prices,
} = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((filterid, index) => filterid.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  const anm = species.find((animall) => animall.name === animal);
  const result = anm.residents.every((elem) => elem.age > age);
  return result;
}

function getEmployeeByName(employeeName) {
  let result = employees.find((name) => name.firstName === employeeName || name.lastName === employeeName);
  if (result === undefined) return {};
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some(() => id === '0e7b460e-acf4-4e17-bcb3-ee472265db83');
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
  let resultFilt = species.find((especie) => especie.name === speciess);

  if (resultFilt === undefined) {
    return species.reduce((ac, {
      name,
      residents,
    }) => {
      ac[name] = residents.length;
      return ac;
    }, {});
  }
  return resultFilt.residents.length;
}

let teste = {
  Adult: 2,
  Child: 3,
  Senior: 1,
};

function calculateEntry(entrants = 0) {
  let {
    Adult = 0,
    Child = 0,
    Senior = 0,
  } = entrants;
  return Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
}

console.log(calculateEntry(teste));

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
