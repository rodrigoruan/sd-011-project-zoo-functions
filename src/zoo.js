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
  return data.species.filter((animal) => ids.some((id) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species
    .find((value) => value.name === animal)
    .residents.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(
    ({ firstName, lastName }) => firstName === employeeName || lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((element) => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((Species) => Species.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((acc, current) => acc + (current[1] * data.prices[current[0]]), 0);
}

function getAnimalMap(options) {}

function getSchedule(dayName) {
  let schedule = {};
  Object.keys(data.hours).forEach((day) => {
    schedule[day] = `Open from ${data.hours[day].open}am until ${(data.hours[day].close) - 12}pm`;
    if (day === 'Monday') {
      schedule[day] = 'CLOSED';
    }
  });

  if (dayName !== undefined) {
    return { [dayName]: schedule[dayName] };
  }
  return schedule;
}

function getOldestFromFirstSpecies(id) {
  const animalID = data.employees.find((element) => element.id === id).responsibleFor[0];
  return Object.values(data.species.find((element) => element.id === animalID)
    .residents
    .reduce((acc, curr) => (acc.age < curr.age ? curr : acc)));
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((price) => {
    data.prices[price] += data.prices[price] * (percentage / 100);
    data.prices[price] = Math.round(data.prices[price] * 100) / 100;
  });
}

function getEmployeeCoverage(idOrName) {}

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
