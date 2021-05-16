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
  // const filteredSpecies = [];

  // for (let index = 0; index < data.species.length; index += 1) {
  //   const item = data.species[index];

  //   if (ids.includes(item.id)) {
  //     filteredSpecies.push(item);
  //   }
  // }

  // return filteredSpecies;
  return data.species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  // let specie;

  // for (let index = 0; index < data.species.length; index += 1) {
  //   const item = data.species[index];

  //   if (item.name === animal) {
  //     specie = item;
  //   }
  // }

  // for (let i = 0; i < specie.residents.length; i++) {
  //   const item = specie.residents[i];

  //   if (item.age < age) {
  //     return false;
  //   }
  // }

  // return true;
  const specie = data.species.find((item) => item.name === animal);
  return specie.residents.every((item) => item.age >= age);
}

// ____________________________

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  // for (let index = 0; index < data.employees.length; index += 1) {
  //   const item = data.employees[index];

  //   if (employeeName === item.firstName || employeeName === item.lastName) {
  //     return item;
  //   }
  // }

  return data.employees.find((item) => employeeName === item.firstName || employeeName === item.lastName);
}
// ____________________________

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
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
