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
const { prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aquii
  return data.species.filter((species) => ids.includes(species.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find(((specie) => specie.name === animal)).residents.every((species) => species.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  let employee;
  if (employeeName === undefined) {
    employee = {};
  } else {
    employee = data.employees.find((element) => element.firstName === employeeName || element.lastName === employeeName);
  }
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  let objEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };

  return objEmployee;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((maneger) => maneger.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  const allAnimals = data.species.reduce((acc, crr) => {
    const { name, residents } = crr;
    const obj = {
      [`${name}`]: residents.length,
    };
    return Object.assign(acc, obj);
  }, {});
  if (species) {
    return allAnimals[species];
  }
  return allAnimals;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants || entrants === {}) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
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
  // Feito na sala junto com o Lima e Bruno Duarte.
  let result = {};
  if (!idOrName) {
    data.employees.forEach(({ firstName, lastName, responsibleFor }) => {
      result[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
    });
    return result;
  }
  data.employees.filter(({ firstName, lastName, id }) => firstName === idOrName || lastName === idOrName || id === idOrName).forEach(({ firstName, lastName, responsibleFor }) => {
    result[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
  });
  return result;
}
getEmployeeCoverage();

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
