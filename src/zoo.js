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

function getSpeciesByIds(ids) {
  const newArray = [];
  if (!ids) return newArray;
  if (typeof ids === 'string') {
    const comparedString = data.species.find((comparing) => comparing.id === ids);
    return comparedString;
  }
  for (let index = 0; index <= ids.length; index += 1) {
    console.log(`Procurando id ${ids[index]}`);
    const filtered = data.species.filter((listedAnimal) => listedAnimal.id === ids[index]);
    newArray.concat(filtered);
  }
  return newArray;
  // seu código aqui
}

const id = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
console.log(getSpeciesByIds([id]));

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
}

function getEmployeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(i) {
  // seu código aqui
}

function addEmployee(identifier, firstName, lastName, managers, responsibleFor) {
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

function getOldestFromFirstSpecies(ides) {
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
