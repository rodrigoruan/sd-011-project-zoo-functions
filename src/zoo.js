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

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((specie) => specie.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const animalSearch = species.find((specieName) => specieName.name === animal);
  return animalSearch.residents.every((specieToCheck) => specieToCheck.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(animal) {
  const speciesList = {};
  if (!animal) {
    species.forEach(({ name, residents }) => {
      speciesList[name] = residents.length;
    });
    return speciesList;
  }
  return species.find(({ name }) => name === animal).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  if (Object.keys(entrants).length === 0) return 0;
  return Object.entries(entrants).reduce((acc, [key, value]) => acc + prices[key] * value, 0);
}

// function getAnimalMap(options) {
//   // seu código aqui
// }

function getSchedule(dayName) {
  const listSchedule = {};
  const arrayHours = Object.entries(hours);

  if (dayName === 'Monday') {
    listSchedule.Monday = 'CLOSED';
    return listSchedule;
  }

  arrayHours.forEach((day) => {
    listSchedule[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
  });

  const oneDay = {};
  oneDay[dayName] = listSchedule[dayName];

  if (!dayName) {
    listSchedule.Monday = 'CLOSED';
    return listSchedule;
  }
  return oneDay;
}

function getOldestFromFirstSpecies(id) {
  const employee = employees.find((employeeId) => employeeId.id === id);
  const specieId = employee.responsibleFor[0];
  const foundSpecie = species.find((specie) => specie.id === specieId);
  const everyAnimal = foundSpecie.residents;
  const foundAnimal = everyAnimal.reduce((max, currentValue) => Math.max(max, currentValue.age), 0);
  return Object.values(everyAnimal.find((animal) => animal.age === foundAnimal));
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.round(prices[key] * (1 + percentage / 100) * 100) / 100;
  });
}

// function getEmployeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  // getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  // getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
