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

// const { species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((animalSpecie) => ids.some((id) => id === animalSpecie.id));
} // Muda a lógica para uso de spreed operator e função some. https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animals) => animals.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  const getEmployee = data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return { ...getEmployee };
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.some((idVerify) => idVerify === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species) {
  if (species === undefined) {
    const specieName = {};
    data.species.forEach((specie) => { specieName[specie.name] = specie.residents.length; });
    return specieName;
  }
  const getSpecie = data.species.find((specie) => specie.name === species);
  return getSpecie.residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined) {
    return 0;
  }

  const typeEntrants = Object.keys(entrants);
  const priceTicket = data.prices;
  return typeEntrants.reduce((acc, curr) => acc + (priceTicket[curr] * entrants[curr]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  const firstResponsabity = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const firstAnimal = data.species.find((animal) => animal.id === firstResponsabity);
  return Object.values(firstAnimal.residents.reduce((acc, curr) => (acc.age > curr.age ? acc : curr)));
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
