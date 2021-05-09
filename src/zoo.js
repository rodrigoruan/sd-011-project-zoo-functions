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

const { species } = require('./data');
const { employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  const animalFiltered = species.find((specie) => specie.name === animal);
  return animalFiltered.residents.every((animalAge) => animalAge.age >= age);
}

function getEmployeeByName(employeeName) {
  const employeeFiltered = employees.find((name) => (name.firstName === employeeName || name.lastName === employeeName));
  return (employeeFiltered === undefined) ? {} : employeeFiltered;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  let arrayIdManager = [];
  const listIdManager = employees.forEach((employee) => {
    let findIdManager = employee.managers;
    arrayIdManager.push(...findIdManager);
  });
  return arrayIdManager.some((idManager) => idManager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function countAnimals(specie) {
  if (specie) {
    return species.find((animal) => specie === animal.name).residents.length;
  }
  let objSpecies = {};
  species.forEach((animal) => {
    objSpecies[animal.name] = animal.residents.length;
  });
  return objSpecies;
}

function calculateEntry(entrants) {
  // seu código aqui
  let totalValue = 0;
  if (entrants) {
    Object.entries(entrants).forEach((entrant) => {
      // console.log?(Object.values(data.prices));
      const actualPrice = Object.entries(data.prices).find((price) => price[0] === entrant[0]);
      // console.log('atual preço ' + actualPrice[1]);
      totalValue += (actualPrice[1] * entrant[1]);
      // console.log(totalValue);
    });
  }
  return totalValue;
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
