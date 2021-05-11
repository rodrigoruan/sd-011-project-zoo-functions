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

const { species, employees } = data;

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.some((id) => id === specie.id));
}

// function getSpeciesByIds(...ids) {
//   return species.filter((value, index) => value.id === ids[index]);
// };

function getAnimalsOlderThan(animal, age) {
  return species.find((specie) => specie.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.filter(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName)[0];
}

// function getEmployeeByName(employeeName) {
//   if (employeeName === undefined) {
//     return {};
//   }
//   const obj = employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
//   return obj;
// }
// console.log(getEmployeeByName('Nigel'));

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function countAnimals(species1) {
  const obj = species.reduce((specieAccumulator, specie) => {
    specieAccumulator[specie.name] = specie.residents.length;
    return specieAccumulator;
  }, {});
  if (species1 !== undefined) {
    return obj[species1];
  }
  return obj;
}
console.log(countAnimals('tigers'));

// function countAnimals(species1) {
//   if(species1 === undefined) {
//    return species.map((specie) => `${specie.name}: ${specie.residents.length}`);
//   }
//   return species.find((specie) => specie.name === species1).residents.length;
// }
// console.log(countAnimals('lions'));

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
