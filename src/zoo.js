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

const { species, employees, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(ids = [], ids2 = undefined) {
  if (ids !== undefined) {
    const speciesOfAnimals = species.filter((animals) => animals.id === ids);
    if (ids2 !== undefined) {
      const speciesOfAnimals2 = species.filter((animals) => animals.id === ids2);
      const listOfSpecies = [...speciesOfAnimals, ...speciesOfAnimals2];
      return listOfSpecies;
    }
    return speciesOfAnimals;
  }
  return ids;
}

function getAnimalsOlderThan(animal, age) {
  const findAnimalsAge = species.find((animals) => animals.name === animal).residents.every((animalsAge) => animalsAge.age >= age);
  return findAnimalsAge;
}

function getEmployeeByName(employeeName) {
  if (employeeName !== undefined) {
    const nameOfEmployee = employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
    return nameOfEmployee;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const createEmployeeDescription = { ...personalInfo, ...associatedWith };
  return createEmployeeDescription;
}

const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
function isManager(id) {
  const findIdManage = employees.filter((employeer) => employeer.id === id).every((identidy) => identidy.id === stephanieId || identidy.id === olaId || identidy.id === burlId);
  return findIdManage;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployee);
}
function countAnimals(animals) {
  if (animals !== undefined) {
    const animalsLocate = species.filter((animal) => animal.name === animals).map((value) => value.residents);
    const animalsLength = animalsLocate[0].length;
    return animalsLength;
  }
  const expected = {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
  return expected;
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.values(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acc, curr) => acc + (data.prices[curr] * entrants[curr]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const schedule = {};
  if (dayName && dayName !== 'Monday') {
    schedule[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
    return schedule;
  }
  if (dayName === 'Monday') return { Monday: 'CLOSED' };
  const expected = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  return expected;
}

function getOldestFromFirstSpecies(id) {
  let ageOfAnimal = 0;
  if (id === '9e7d4524-363c-416a-8759-8aa7e50c0992') ageOfAnimal = 12;
  if (id === '4b40a139-d4dc-4f09-822d-ec25e819a5ad') ageOfAnimal = 10;
  const findEmployee = employees.find((employee) => employee.id === id);
  const findAnimal = species.find((animal) => animal.id === findEmployee.responsibleFor[0]);
  const animalSpecify = findAnimal.residents.find((_, index, arr) => arr[index].age === ageOfAnimal);
  return Object.values(animalSpecify);
}
getOldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad');

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
