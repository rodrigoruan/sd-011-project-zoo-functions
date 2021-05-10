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
  return data.species.filter((specie) => ids.includes(specie.id));
}

getSpeciesByIds();
function getAnimalsOlderThan(animal, age) {
  const mySpecie = data.species.find((specie) => specie.name === animal);
  return mySpecie.residents.every((myAge) => myAge.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const firstLastName = data.employees.find((names) => names.firstName === employeeName || names.lastName === employeeName);
  return firstLastName;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((management) => management.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObj = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return newObj;
}

function countAnimals(species) {
  const countAnimal = {};
  if (!species) {
    data.species.forEach((animal) => {
      countAnimal[animal.name] = animal.residents.length;
    });
    return countAnimal;
  }
  return data.species.find((element) => species === element.name).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let resultSchedule = {};
  if (dayName === undefined) {
    const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = data.hours;
    return {
      Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
      Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
      Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
      Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
      Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
      Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
      Monday: 'CLOSED',
    };
  }
  if (dayName === 'Monday') {
    resultSchedule.Monday = 'CLOSED';
    return resultSchedule;
  }
  resultSchedule[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
  return resultSchedule;
}

function getOldestFromFirstSpecies(id) {
  const getOldSpecie = data.employees.find((element) => element.id === id).responsibleFor[0];
  const getSpecieReturn = data.species.find((value) => value.id === getOldSpecie).residents;
  const sortSpecies = getSpecieReturn.sort((a, b) => b.age - a.age)[0];
  return Object.values(sortSpecies);
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  const resultAdult = (Adult * percentage) / 100 + Adult + 0.001;
  data.prices.Adult = Number(resultAdult.toFixed(2));
  const resultSenior = (Senior * percentage) / 100 + Senior + 0.001;
  data.prices.Senior = Number(resultSenior.toFixed(2));
  const resultChild = (Child * percentage) / 100 + Child + 0.001;
  data.prices.Child = Number(resultChild.toFixed(2));
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
