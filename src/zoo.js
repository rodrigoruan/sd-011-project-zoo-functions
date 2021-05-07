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

const { species, employees, hours, prices } = data;

function getSpeciesByIds(...ids) {
  return species.filter((animal) => ids.some((id) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return species.find((a) => a.name === animal).residents.every((r) => r.age > age);
}

function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return employees.find((e) => e.firstName === employeeName || e.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  if (typeof specie === 'undefined') {
    const counting = {};
    species.forEach((animal) => { counting[animal.name] = animal.residents.length; });
    return counting;
  }
  return species.find((animal) => animal.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (typeof entrants === 'undefined' || entrants === {}) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, age) => acc + (entrants[age] * prices[age]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const result = {};
  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      result[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      result[day] = 'CLOSED';
    }
  });
  if (dayName) {
    return {
      [dayName]: result[dayName],
    };
  }
  return result;
}

function getOldestFromFirstSpecies(id) {
  const findIdFirstAnimal = employees.find((emp) => emp.id === id).responsibleFor[0];
  const firstAnimal = species.find((animal) => animal.id === findIdFirstAnimal).residents;
  const arrOfAges = [];
  firstAnimal.forEach((element) => arrOfAges.push(element.age));
  const oldestAge = arrOfAges.reduce((acc, curr) => {
    if (acc > curr) {
      return acc;
    }
    return curr;
  }, 0);
  const result = firstAnimal.find((animal) => animal.age === oldestAge);
  return Object.values(result);
}

function increasePrices(percentage) {
  const priceKeys = Object.keys(prices);
  const increase = (100 + percentage) / 100;
  priceKeys.forEach((key) => {
    prices[key] = Math.round((prices[key] * increase) * 100) / 100;
  });
  return prices;
}
/* Arredondar: https://metring.com.br/arredondar-numero-em-javascript#:~:text=Para%20arredondar%20um%20n%C3%BAmero%20decimal,n%C3%A3o%20%C3%A9%20um%20m%C3%A9todo%20confi%C3%A1vel. */

const coverage = () => {
  const reduceParam = (acc, { firstName, lastName, responsibleFor }) => {
    const name = `${firstName} ${lastName}`;
    acc[name] = responsibleFor.map((id) => species.find((animal) => animal.id === id).name)
    return acc
  }
  return reduceParam
}

function getEmployeeCoverage(idOrName) {
  if (idOrName) {
    const filteredWithParam = employees.filter((emp) => emp.firstName === idOrName || emp.lastName === idOrName || emp.id === idOrName)
    return filteredWithParam.reduce(coverage(), {})
  }
  return employees.reduce(coverage(), {})
}
console.log(getEmployeeCoverage())

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
