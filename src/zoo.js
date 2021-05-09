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

const arrayOfAnimals = data.species;
const arrayOfEmployees = data.employees;
const arrayOfPrices = data.prices;
const arrayOfHours = data.hours;

function getSpeciesByIds(...ids) {
  return arrayOfAnimals.filter((animals) => ids.includes(animals.id));
}

function getAnimalsOlderThan(animal, age) {
  return arrayOfAnimals.find((object) => object.name === animal).residents.every((element) => element.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return arrayOfEmployees.find((object) => object.firstName === employeeName || object.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return arrayOfEmployees.some((adm) => adm.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  arrayOfEmployees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (species === undefined) {
    const obj = {};
    arrayOfAnimals.forEach((positions) => {
      obj[positions.name] = positions.residents.length;
    });

    return obj;
  }
  const theanimal = arrayOfAnimals.find((animal) => animal.name === species);
  return theanimal.residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === '') {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const prices = (Adult * arrayOfPrices.Adult) + (Child * arrayOfPrices.Child) + (Senior * arrayOfPrices.Senior);
  return prices;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const week = {
    Tuesday: `Open from ${arrayOfHours.Tuesday.open}am until ${arrayOfHours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${arrayOfHours.Wednesday.open}am until ${arrayOfHours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${arrayOfHours.Thursday.open}am until ${arrayOfHours.Thursday.close - 12}pm`,
    Friday: `Open from ${arrayOfHours.Friday.open}am until ${arrayOfHours.Friday.close - 12}pm`,
    Saturday: `Open from ${arrayOfHours.Saturday.open}am until ${arrayOfHours.Saturday.close - 12}pm`,
    Sunday: `Open from ${arrayOfHours.Sunday.open}am until ${arrayOfHours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };

  if (dayName === undefined || dayName === '') {
    return week;
  }
  const day = {};
  day[dayName] = week[dayName];
  return day;
}

function getOldestFromFirstSpecies(id) {
  const responsibleFor = arrayOfEmployees.find((t) => t.id === id).responsibleFor[0];
  const animal = arrayOfAnimals.find((t) => t.id === responsibleFor).residents.sort((a, b) => b.age - a.age)[0];
  return [animal.name, animal.sex, animal.age];
}

function increasePrices(percentage) {

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
