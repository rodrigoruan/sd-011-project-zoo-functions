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

const { TestScheduler } = require('jest');
const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  let arraySpecies = [];
  ids.forEach((id) => {
    const filterId = species.filter((specie) => id === specie.id);
    arraySpecies.push(filterId[0]);
  });
  return arraySpecies;
}

function getAnimalsOlderThan(animal, age) {
  let allResidentsOlderThan;
  species.forEach((specie) => {
    if (specie.name === animal) {
      allResidentsOlderThan = specie.residents.every((resident) => resident.age > age);
    }
  });
  return allResidentsOlderThan;
}

function getEmployeeByName(employeeName) {
  if (typeof (employeeName) === 'undefined') {
    return {};
  }
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers[0] === id || employee.managers[1] === id);
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

function countAnimals(animal) {
  let allSpecies = {};
  species.forEach((specie) => {
    allSpecies[specie.name] = (specie.residents).length;
  });

  if (!animal) {
    return allSpecies;
  }
  return allSpecies[animal];
}

function calculateEntry(entrants) {
  let totalEntrance = 0;
  if (!entrants) {
    return totalEntrance;
  }
  Object.keys(entrants).forEach((entrance) => {
    totalEntrance += prices[entrance] * entrants[entrance];
  });
  return totalEntrance;
}

function getAnimalMap(options) {
  const locationsAndSpecies = {
    NE: '',
    NW: '',
    SE: '',
    SW: '',
  };

  // Object.keys(locationsAndSpecies).forEach(function (location) {
  //   console.log(locationsAndSpecies[location]);
  //   species.filter((specie) => {
  //     if (locationsAndSpecies[location] === specie.location) {
  //       locationsAndSpecies[location] = '123';
  //     }
  //   });
  // });
  return locationsAndSpecies;
}

function getSchedule(dayName) {
  let objectSchedule = {};
  Object.keys(hours).map((day) => Object.keys(hours[day]).forEach(() => {
    if (hours[day].open === 0) {
      objectSchedule[day] = 'CLOSED';
    } else {
      objectSchedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  }));
  if (!dayName) {
    return objectSchedule;
  }
  const daySchedule = { [dayName]: objectSchedule[dayName] };
  return daySchedule;
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
