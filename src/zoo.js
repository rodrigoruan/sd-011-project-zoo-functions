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
  if (!ids.length) return [];
  const animals = ids.map((id) => data.species.find((specie) => specie.id === id));
  return animals;
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find(((specie) => specie.name === animal)).residents.every((actualAnimal) => actualAnimal.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(i) {
  const managerIsYou = data.employees.find((employee) => employee.id === i);
  if (managerIsYou.managers.length < 2) {
    return true;
  }
  return false;
}

function addEmployee(identifier, firstName, lastName, managers = [], responsibleFor = []) {
  const employed = { id: identifier, firstName, lastName, managers, responsibleFor };
  data.employees.push(employed);
}

const specieCountReducer = (otherSpecies, specie) => ({ ...otherSpecies, [specie.name]: specie.residents.length });

function countAnimals(species) {
  if (!species) {
    return data.species.reduce(specieCountReducer,
      {});
  }
  const animalsCount = data.species.find((animalName) => animalName.name === species);
  return animalsCount.residents.length;
}

function calculateEntry(entrants) {
  let result = 0;
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  const allKeys = Object.keys(entrants);
  allKeys.forEach((key) => { result += data.prices[key] * entrants[key]; });
  return result;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(ides) {

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
