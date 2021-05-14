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

const { hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species
    .find((animalName) => animalName.name === animal)
    .residents.every((animalAge) => animalAge.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};

  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((empId) => empId.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  let animals = {};

  if (!species) {
    data.species.forEach((animal) => {
      animals[`${animal.name}`] = animal.residents.length;
    });
    return animals;
  } return data.species.find((animal) => animal.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;

  const entrantKeys = Object.keys(entrants);

  return entrantKeys.reduce((result, eKey) => result + entrants[eKey] * data.prices[eKey], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const day = Object.keys(data.hours);
  const dataObj = {};
  if (!dayName) {
    day.forEach((daySchedule) => {
      dataObj[daySchedule] = `Open from ${data.hours[daySchedule].open}am until ${data.hours[daySchedule].close - 12}pm`;

      if (daySchedule === 'Monday') {
        dataObj[daySchedule] = 'CLOSED';
      }
    });
    return dataObj;
  }
  dataObj[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
  if (dayName === 'Monday') {
    dataObj[dayName] = 'CLOSED';
  }
  return dataObj;
}

function getOldestFromFirstSpecies(id) {
  const animalResponsible = data.employees.find((object) => object.id === id).responsibleFor[0];
  const animalsComp = data.species.find((object) => object.id === animalResponsible).residents;
  const oldest = animalsComp.sort((animalAge, animalOld) => animalOld.age - animalAge.age)[0];
  const animalArray = [oldest.name, oldest.sex, oldest.age];
  return animalArray;
}

function increasePrices(percentage) {
  const priceKeys = Object.keys(data.prices);

  priceKeys.forEach((price) => {
    const calc = data.prices[price] + (data.prices[price] * percentage) / 100;
    data.prices[price] = Math.ceil(calc * 100) / 100;
  });

  return data.prices;
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
