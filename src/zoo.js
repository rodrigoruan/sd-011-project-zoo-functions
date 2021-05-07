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
  return data.species.filter((species) => ids.includes(species.id));
}

function getAnimalsOlderThan(species, age) {
  return data.species.find((spec => spec.name === species)).residents.every((animal) => animal.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};

  return data.employees.find(({firstName, lastName}) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {...personalInfo, ...associatedWith};
}

function isManager(id) {
  return data.employees.some(({managers}) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({id, firstName, lastName, managers, responsibleFor});
}

function countAnimals(species) {
  if (species) {
    return data.species.find(({name}) => name === species).residents.length;
  }

  return data.species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length
    return acc;
  }, {});
}

function calculateEntry(entrants) {
  let total = 0;

  for (let key in entrants) {
    total += data.prices[key] * entrants[key];
  }

  return total;
}

function getAnimalMap({ includeNames }) {
  const animalMap = data.species.reduce((acc, curr) => {
    acc[curr.location].push(curr.name);
    return acc;
  }, {NE: [], NW: [], SE: [], SW: []});

  if (includeNames) {
    for (let region in animalMap) {
      for (let animal of animalMap[region]) {
        animal = { [animal]: [] };
      }
    }
  }



  return animalMap;
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
