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
const { species, employees, prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  const animals = ids.reduce((acc, elemento) => acc.concat(species.find((element) => element.id === elemento)), []);
  return animals;
}

function getAnimalsOlderThan(animal, age) {
  const minAge = species.find((animais) => animais.name === animal).residents.every((idades) => idades.age >= age);
  return minAge;
}

function getEmployeeByName(employeeName) {
  const employee = employees.find((element) => element.firstName === employeeName || element.lastName === employeeName);
  return (employee === undefined) ? {} : employee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const manage = employees.some((employee) => employee.managers.includes(id));
  return manage;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  if (specie) {
    return species.find((animal) => animal.name === specie).residents.length;
  }
  let objeto = {};
  species.forEach((obj) => {
    objeto[obj.name] = obj.residents.length;
  });
  return objeto;
}

function calculateEntry(entrants) {
  let value = 0;
  if (entrants !== {} && entrants !== undefined) {
    const key = Object.keys(entrants);
    key.forEach((element) => {
      let tickets = entrants[element];
      let price = prices[element];
      value += tickets * price;
    });
  }
  return value;
}

function getAnimalMap(options) {
}

function getSchedule(dayName) {
  if (!dayName) {
    return Object.keys(hours).reduce((acc, curr) => {
      console.log(hours[curr]);
      acc[curr] = `Open from ${hours[curr].open}am until ${hours[curr].close - 12}pm`;
      acc.Monday = 'CLOSED';
      return acc;
    }, {});
  }

  if (dayName === 'Monday') return { Monday: 'CLOSED' };

  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
}

function increasePrices(percentage) {
  const keys = Object.keys(prices);
  const obj = keys.forEach((pricesKeys) => {
    prices[pricesKeys] = Math.round(prices[pricesKeys] * (1 + percentage / 100) * 100) / 100;
  });
  return obj;
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
