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
  return data.species.filter((animal) => ids.some((id) => id === animal.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((animals) => animals.name === animal).residents.every((residentAge) => residentAge.age > age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  return employeeName ? data.employees.filter((Employee) => Employee.firstName === employeeName || Employee.lastName === employeeName)[0] : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((employees) => employees.managers.some((value) => value === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  if (!species) {
    return data.species.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specieName) => specieName.name === species).residents.length;
}

function calculateEntry(entrants = 0) {
  // seu código aqui
  return Object.entries(entrants).reduce((acc, person) => acc + (person[1] * data.prices[person[0]]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  if (!dayName) {
    dayName = Object.entries(data.hours);
  } else {
    dayName = Object.entries(data.hours).filter((date) => date[0] === dayName);
  }
  return dayName.reduce((acc, day) => {
    if (day[0] === 'Monday') {
      acc[day[0]] = 'CLOSED';
      return acc;
    }
    acc[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    return acc;
  }, {});
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const idAnimal = data.employees.find((empoyer) => empoyer.id === id).responsibleFor[0];
  const firstAnimal = data.species.find((nameSpecie) => nameSpecie.id === idAnimal).residents.filter((res, _, arr) => res.age === arr.reduce((acc, value) => Math.max(acc, value.age), 0))[0];
  const { name, sex, age } = firstAnimal;
  return [ name, sex, age ];
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
