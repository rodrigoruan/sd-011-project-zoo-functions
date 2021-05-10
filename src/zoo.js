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

// Requisito realizado com a ajuda da Ana Carolina Giorgiani
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

// Requisito feito com a ajuda do Matheus Alexandre e Alberto Candido
function getSchedule(dayName) {
  if (!dayName) {
    return Object.keys(hours).reduce((acc, curr) => {
      acc[curr] = `Open from ${hours[curr].open}am until ${hours[curr].close - 12}pm`;
      acc.Monday = 'CLOSED';
      return acc;
    }, {});
  }

  if (dayName === 'Monday') return { Monday: 'CLOSED' };

  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
}

// Requisito realizado com ajuda dos colegas na sala de estudo
function getOldestFromFirstSpecies(id) {
  const specie = employees.find((employee) => employee.id === id).responsibleFor[0];
  return Object.values(species.find((animal) => animal.id === specie).residents.sort((a, b) => b.age - a.age)[0]);
}

function increasePrices(percentage) {
  const keys = Object.keys(prices);
  const obj = keys.forEach((pricesKeys) => {
    prices[pricesKeys] = Math.round(prices[pricesKeys] * (1 + percentage / 100) * 100) / 100;
  });
  return obj;
}

function getEmployeeCoverage(idOrName) {
  const employee = employees.find(({ id, firstName, lastName }) => idOrName === id || idOrName === firstName || idOrName === lastName);
  let obj = {};
  if (!idOrName) {
    employees.forEach((func) => {
      obj[`${func.firstName} ${func.lastName}`] = func.responsibleFor.map((animal1) => species.find((animal2) => animal2.id === animal1).name);
    });
    return obj;
  }
  obj[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((animal1) => species.find((animal2) => animal2.id === animal1).name);
  return obj;
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
