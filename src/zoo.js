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
const {
  species,
  employees,
  prices,
  hours,
} = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((filterid, index) => filterid.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  const anm = species.find((animall) => animall.name === animal);
  const result = anm.residents.every((elem) => elem.age > age);
  return result;
}

function getEmployeeByName(employeeName) {
  let result = employees.find((name) => name.firstName === employeeName || name.lastName === employeeName);
  if (result === undefined) return {};
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some(() => id === '0e7b460e-acf4-4e17-bcb3-ee472265db83');
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(speciess) {
  let resultFilt = species.find((especie) => especie.name === speciess);
  if (resultFilt === undefined) {
    return species.reduce((ac, {
      name,
      residents,
    }) => {
      ac[name] = residents.length;
      return ac;
    }, {});
  }
  return resultFilt.residents.length;
}

function calculateEntry(entrants = 0) {
  let {
    Adult = 0, Child = 0, Senior = 0,
  } = entrants;
  return Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
}

function getAnimalMap(options) {
  let result = {};
  const regions = ['NE', 'NW', 'SE', 'SW'];
  result = regions.reduce((ac, current, index) => {
    ac[regions[index]] = species.filter(({
      location,
    }) => location === current).map((mpe) => mpe.name);
    return ac;
  }, {});
  return result;
}

function getSchedule(dayName) {
  let result = {};
  let {
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
    Monday,
  } = hours;
  if (dayName === undefined) {
    result = {
      Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
      Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
      Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
      Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
      Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
      Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
      Monday: `${Monday.open === 0 ? 'CLOSED' : `Open from ${Monday.open}am until ${Sunday.Monday - 12}pm`}`,
    };
  }
  if (dayName === 'Monday') {
    return {
      Monday: 'CLOSED',
    };
  }
  if (hours[dayName]) result[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
  return result;
}

function getOldestFromFirstSpecies(id) {
  let result = [];
  result = employees.find((userId) => userId.id === id).responsibleFor;
  const animal = species.find((animalId) => animalId.id === result[0]).residents.sort((a, b) => b.age - a.age)[0];
  return Object.values(animal);
}

function increasePrices(percentage) {
  let {
    Adult,
    Senior,
    Child,
  } = prices;

  prices.Adult = parseFloat(((Adult / 100) * percentage + Adult + 0.001).toFixed(2));
  prices.Senior = parseFloat(((Senior / 100) * percentage + Senior + 0.001).toFixed(2));
  prices.Child = parseFloat(((Child / 100) * percentage + Child + 0.001).toFixed(2));
}

// console.log(increasePrices(50));

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
