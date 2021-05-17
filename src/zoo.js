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
const { species, employees, hours, prices } = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((specie) => specie.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}
console.log(isManager());

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(animals) {
  const countForSpecies = species.reduce((count, specie) => {
    count[specie.name] = specie.residents.length;
    return count;
  }, {});
  if (animals !== undefined) {
    return countForSpecies[animals];
  }
  return countForSpecies;
}

function calculateEntry(entrants) {
  return (!entrants || Object.keys(entrants).length === 0) ? 0
    : Object.keys(entrants).reduce((acc, key) => acc + prices[key] * entrants[key], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const agenda = {};

  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      agenda[day] = `Open from ${hours[day].open}am until ${
        hours[day].close - 12
      }pm`;
    } else agenda[day] = 'CLOSED';
  });
  if (dayName) {
    return { [dayName]: agenda[dayName] };
  }
  return agenda;
}

function getOldestFromFirstSpecies(id) {
  const idAnimals = employees.find((emp) => emp.id === id).responsibleFor[0];
  const animals = species.find((spec) => spec.id === idAnimals).residents;
  return Object.values(animals.sort((animalA, animalB) => animalA.age - animalB.age).reverse()[0]);
}

function increasePrices(percentage) {
  const calcPercentage = percentage / 100;
  const adult = parseFloat((prices.Adult + ((prices.Adult) * calcPercentage)) * 100).toPrecision(4) / 100;
  const senior = parseFloat((prices.Senior + ((prices.Senior) * calcPercentage)) * 100).toPrecision(4) / 100;
  const child = parseFloat((data.prices.Child + ((data.prices.Child) * calcPercentage)) * 100).toPrecision(4) / 100;
  prices.Adult = adult;
  prices.Senior = senior;
  prices.Child = child;
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
