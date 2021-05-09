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
const { employees, species, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids === []) {
    return [];
  }
  return ids.map((value) => {
    let total = [];
    total = data.species.find((result) => result.id === value);
    return total;
  });
}

function getAnimalsOlderThan(animal, age) {
  const result = data.species.find((bicho) => bicho.name === animal);
  const final = result.residents.every((value) => (value.age > age));
  return final;
}

function getEmployeeByName(employeeName) {
  const result = data.employees.find((value) => (value.firstName === employeeName || value.lastName === employeeName));
  return { ...result };
}

function createEmployee(personalInfo, associatedWith) {
  const result = { ...personalInfo, ...associatedWith };
  return result;
}

function isManager(id) {
  const result = employees.some(({ managers }) => managers.some((value) => value === id));
  return result;
}

// function isManager(id) {
//   const result = employees.some((get) => get.managers.some((value) => value === id))
//   return result;
// }

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(param) {
  const result = {};
  if (!param) {
    species.forEach((value) => { result[value.name] = value.residents.length; });
    return result;
  }
  return species.find((get) => (get.name === param)).residents.length;
}

function calculateEntry(entrants) {
  let total = 0;
  if (!entrants) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  total = (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
  return total;
}

function getAnimalMap(options) {

}
function getSchedule(dayName) {
  const resultParam = {};
  const result = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return result;
  }
  resultParam[dayName] = result[dayName];
  return resultParam;
}

function getOldestFromFirstSpecies(id) {
  const emplo = employees.find((value) => value.id === id).responsibleFor[0];
  console.log(emplo)
  const animal = species.find((get) => emplo === get.id)
  console.log(animal)
  const result =  animal.residents.reduce ((acc, curr) => (curr.age > acc.age) ? curr : acc);
  console.log(result);
  // object destructuring e construir um array
  const { name, sex, age } = result;
  return [name, sex, age];
}

function increasePrices(percentage) {
  percentage = 1 + (percentage / 100);
  prices.Adult = Math.round(prices.Adult * percentage * 100) / 100;
  prices.Child = Math.round(prices.Child * percentage * 100) / 100;
  prices.Senior = Math.round(prices.Senior * percentage * 100) / 100;
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
