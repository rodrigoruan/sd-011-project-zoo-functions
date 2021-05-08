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

const { prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((animal) => ids.some((id) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((findAnimal) => (findAnimal.name === animal)).residents.every((checkAges) => checkAges.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find((check) => check.firstName === employeeName || check.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  let newObject = {};
  Object.assign(newObject, personalInfo, associatedWith);
  return newObject;
}

function isManager(id) {
  return data.employees.some((check) => (check.id === id && check.managers[0] === '9e7d4524-363c-416a-8759-8aa7e50c0992'));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  let newObject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newObject);
}

function countAnimals(species) {
  if (species === undefined) {
    const obj = {};
    data.species.forEach((positions) => {
      obj[positions.name] = positions.residents.length;
    });

    return obj;
  }

  return data.species.find((findAnimal) => findAnimal.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, curr) => acc + (data.prices[curr] * entrants[curr]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let obj = {};
  let expediente = Object.values(data.hours);
  Object.keys(data.hours).forEach((day, index) => {
    if (dayName === undefined) obj[day] = `Open from ${expediente[index].open}am until ${expediente[index].close - 12}pm`;
    if (day === dayName) obj[day] = `Open from ${expediente[index].open}am until ${expediente[index].close - 12}pm`;
  });

  if (obj.Monday !== undefined) obj.Monday = 'CLOSED';

  return (obj);
}

function getOldestFromFirstSpecies(id) {
  const employerFirstResponsibility = data.employees.find((employeer) => employeer.id === id).responsibleFor[0];
  const employerFirstAnimalResponsibility = data.species.find((animal) => animal.id === employerFirstResponsibility);

  return Object.values(employerFirstAnimalResponsibility.residents.reduce((acc, curr) => (acc.age > curr.age ? acc : curr)));
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
