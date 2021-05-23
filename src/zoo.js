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
  // seu código aqui
  if (ids == null) return [];
  return data.species.filter((specie, index) => specie.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const ageSearched = data.species.find((specie) => specie.name === animal);
  return ageSearched.residents.every((dweller) => dweller.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (employeeName == null) return {};
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  let obj = {};
  return Object.assign(obj, personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function createObject(key, value) {
  const obj = {};
  obj[key] = value;
  return obj;
}

function countAnimals(species) {
  // seu código aqui
  if (species == null) {
    const animalsData = {};
    const animalsNames = data.species.map((specie) => specie.name);
    const animalsQuantities = data.species.map((specie) => specie.residents.length);
    console.log(animalsNames);
    console.log(animalsQuantities);
    animalsNames.forEach((animalName, index) => {
      const temp = createObject(animalName, animalsQuantities[index]);
      Object.assign(animalsData, temp);
    });
    return animalsData;
  }
  return data.species.find((specie) => specie.name === species).residents.length;
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
