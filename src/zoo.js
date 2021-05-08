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
  return data.species.filter(({ id }) => ids.includes(id));
}

function getAnimalsOlderThan(animal, idade) {
  const objectFound = data.species.find(({ name }) => name === animal);
  return objectFound.residents.every(({ age }) => age > idade);
}

function getEmployeeByName(employeeName = {}) {
  const nameEmployee = data.employees.find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  if (nameEmployee === undefined) return {};
  return nameEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.reduce((acc, { managers }) => acc === managers.includes(id), false);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newEmployee);
}

function countAnimals(species) {
  const foundAnimal = data.species.find(({ name }) => name === species);
  if (!species) {
    let allCountAnimals = {};
    for (let index = 0; index < data.species.length; index += 1) {
      allCountAnimals[[data.species[index].name]] = data.species[index].residents.length;
    }
    return allCountAnimals;
  }
  return foundAnimal.residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  if (!entrants.Adult) entrants.Adult = 0;
  if (!entrants.Senior) entrants.Senior = 0;
  if (!entrants.Child) entrants.Child = 0;
  let total = entrants.Adult * data.prices.Adult + entrants.Senior * data.prices.Senior + entrants.Child * data.prices.Child;
  return total;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = data.hours;
  const schedule = {
    Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
    Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
    Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
    Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
    Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) return schedule;
  return {
    [dayName]: schedule[dayName],
  };
}

function getOldestFromFirstSpecies(employee) {
  const consultedAnimal = data.employees.find(({ id }) => id === employee).responsibleFor[0];
  const animalObject = data.species.find(({ id }) => id === consultedAnimal).residents;
  const oldestAnimal = animalObject.sort((animal1, animal2) => animal2.age - animal1.age);
  return Object.values(oldestAnimal[0]);
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
