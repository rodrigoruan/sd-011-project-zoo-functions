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
  // seu código aqui
  if (ids.length === 0) return [];
  return data.species.filter((animal) => ids.some((id) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((value) => value.name === animal).residents.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees.find((value) => value.firstName === employeeName || value.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((element) => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return newEmployee;
}

function countAnimals(specie) {
  // seu código aqui
  const countCuties = {};
  if (!specie) {
    data.species.forEach((animal) => {
      countCuties[animal.name] = animal.residents.length;
    });
    return countCuties;
  }
  return data.species.find((cuties) => specie === cuties.name).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants) return 0;
  const visitors = Object.entries(entrants);
  return visitors.reduce((acc, currentValue) => acc + (currentValue[1] * data.prices[currentValue[0]]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
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
  // seu código aqui
  const animalId = data.employees.filter((ids) => ids.id === id)[0].responsibleFor[0];
  const searchAnimal = data.species.filter((value) => value.id === animalId)[0].residents;
  const ageAnimalsAll = searchAnimal.reduce((acc, list) => Math.max(acc, list.age), 0);
  const result = searchAnimal.find((age) => age.age === ageAnimalsAll);
  return [result.name, result.sex, result.age];
}

console.log(getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

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
