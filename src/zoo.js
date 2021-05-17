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
const { animals, employees, prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  if (ids === undefined) {
    return [];
  }
  return animals.filter((specie) => (ids.includes(specie.id)));
}

function getAnimalsOlderThan(animal, age) {
  const specie1 = data.species.find((currentValue) => currentValue.name === animal).residents;
  return specie1.every((value) => value.age >= age);
}
function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return employees.find((value2) => value2.firstName === employeeName || value2.lastName === employeeName);
}
console.log(getEmployeeByName('Wishart'));

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}
console.log(createEmployee(['7ed1c9bb-8570-44f6-b718-0666b869573a', '0938aa23-f153-4937-9f88-4858b24d6bce']));

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}
console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  if (!specie) {
    return data.species.reduce((acumulator, currentValue) => {
      acumulator[currentValue.name] = currentValue.residents.length;
      return acumulator;
    }, {});
  }
return data.species.find((animal) => animal.name === specie).residents.length;
}
console.log(countAnimals('tigers'));

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
