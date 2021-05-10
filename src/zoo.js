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

const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';

function getSpeciesByIds(...ids) {
  let array = [];
  ids.forEach((iD) => array.push(data.species.find((specie) => specie.id === iD)));
  return array;
}

function getAnimalsOlderThan(animal, age) {
  let animalOlderThen;
  data.species.forEach((specie) => {
    if (specie.name === animal) {
      animalOlderThen = (specie.residents.every((resident) => resident.age >= age));
    }
  });
  return animalOlderThen;
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((employe) => employe.firstName === employeeName || employe.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const object = { ...personalInfo, ...associatedWith };
  return object;
}

function isManager(id) {
  if (id === stephanieId || id === olaId || id === burlId) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees.push(newEmployee);
}

function countAnimals(species) {
  let animalsObject = {};
  let animalsCount = 0;
  if (!species) {
    data.species.forEach((specie) => {
      animalsObject[specie.name] = specie.residents.length;
    });
    return animalsObject;
  }
  data.species.forEach((specie) => {
    if (specie.name === species) {
      animalsCount = specie.residents.length;
    }
  });

  return animalsCount;
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
