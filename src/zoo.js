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

const { species, employees, hours, prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const auxanimal = [];
  const arrayAnimals = ids.forEach((idArgument) => auxanimal.push(...data.species.filter((animal) => animal.id === idArgument)));
  return auxanimal;
}
console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function getAnimalsOlderThan(animal, age) {
  const findSpecies = species.find((element) => element.name === animal);
  const checkAge = findSpecies.residents.every((res) => res.age >= age);
  return checkAge;
}

function getEmployeeByName(employeeName) {
  const staff = employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
  return staff || {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const manager = employees.some((person) => person.managers.find((ids) => ids === id));
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const staff = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(staff);
}

function countAnimals(specie) {
  const findName = species.find((animal) => animal.name === specie);
  const allAnimals = (list, { name, residents }) => {
    list[name] = residents.length;
    return list;
  };
  return specie ? findName.residents.length : species.reduce(allAnimals, {});
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }
  const price = (total, age) =>
    total + (data.prices[age] * entrants[age]);
  const arrayPrices = Object.keys(entrants);
  return arrayPrices.reduce(price, 0);
}
console.log(calculateEntry({ Adult: 1, Child: 2 }));
function getAnimalMap(options) {

}

function getSchedule(dayName) {
  const allDays = Object.keys(hours);
  const eachDay = {};
  allDays.forEach((day) => {
    if (day !== 'Monday') {
      eachDay[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      eachDay[day] = 'CLOSED';
    }
  });
  if (dayName === undefined) {
    return eachDay;
  }
  return ({ [dayName]: eachDay[dayName] });
}

function getOldestFromFirstSpecies(id) {
  const idPrimeiroAnimal = employees.find((person) => id === person.id).responsibleFor[0];
  const findSpecies = species.find((animal) => idPrimeiroAnimal === animal.id).residents;
  const olderAnimals = findSpecies.sort(function (a, b) {
    return b.age - a.age;
  });
  const { name, sex, age } = olderAnimals[0];
  return [name, sex, age];
}
// console.log(getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  const array = Object.keys(prices);
  array.forEach((key) => {
    prices[key] = Math.round((prices[key] * 100) * (1 + (percentage / 100))).toFixed(2) / 100;
  });
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
