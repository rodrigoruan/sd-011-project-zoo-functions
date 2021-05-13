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
const { animals } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((species) => ids.includes(species.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((value) => value.name === animal).residents.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((value) => value.firstName === employeeName || value.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((element) => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return newEmployee;
}

function countAnimals(specie) {
  const countSeveralAnimals = {};
  if (!specie) {
    data.species.forEach((animal) => {
      countSeveralAnimals[animal.name] = animal.residents.length;
    });
    return countSeveralAnimals;
  }
  return data.species.find((severalAnimals) => specie === severalAnimals.name).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  const visitor = Object.entries(entrants);
  return visitor.reduce((acc, currentValue) => acc + (currentValue[1] * data.prices[currentValue[0]]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const result = {};
  if (dayName && dayName !== 'Monday') {
    result[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    return result;
  } if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED' };
}

function getOldestFromFirstSpecies(id) {
  const animalId = data.employees.filter((ids) => ids.id === id)[0].responsibleFor[0];
  const animalSearch = data.species.filter((value) => value.id === animalId)[0].residents;
  const AgeAllAnimals = animalSearch.reduce((acc, list) => Math.max(acc, list.age), 0);
  const result = animalSearch.find((age) => age.age === AgeAllAnimals);
  return [result.name, result.sex, result.age];
}

function increasePrices(percentage) {
  const adultPrice = ((data.prices.Adult / 100) * percentage + data.prices.Adult + 0.001);
  const childPrice = ((data.prices.Child / 100) * percentage + data.prices.Child + 0.001);
  const seniorPrice = ((data.prices.Senior / 100) * percentage + data.prices.Senior + 0.001);

  data.prices.Adult = Number(adultPrice.toFixed(2));
  data.prices.Senior = Number(seniorPrice.toFixed(2));
  data.prices.Child = +childPrice.toFixed(2);
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
