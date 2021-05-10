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

const { species, employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const speciesId = species.filter((specie) => ids.includes(specie.id));

  return speciesId;
}

function getAnimalsOlderThan(animal, age) {
  const animalsNames = species.find((specie) => (
    specie.name === animal));

  //  console.log(animalsNames);

  const animalsMinAges = animalsNames.residents.every((animall) => (animall.age >= age));

  return animalsMinAges;
}

function getEmployeeByName(employeeName) {
  const peopleObject = employees.find((people) => (people.firstName === employeeName || people.lastName === employeeName));

  if (peopleObject !== undefined) {
    return peopleObject;
  }

  return ({});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return id === '0e7b460e-acf4-4e17-bcb3-ee472265db83';
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newPeople = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(newPeople);

  return employees;
}

function countAnimals(animals) {
  if (animals !== undefined) {
    const animAllsSelected = species.find((animalSelected) => (animalSelected.name === animals)).residents.length;

    return animAllsSelected;
  }
  let all = {};
  species.forEach((animal) => {
    (all[animal.name] = animal.residents.length);
  });

  return all;
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
