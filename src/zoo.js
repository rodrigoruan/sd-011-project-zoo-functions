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
  if (ids == null) return [];
  return data.species.filter((specie, index) => specie.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const ageSearched = data.species.find((specie) => specie.name === animal);
  return ageSearched.residents.every((dweller) => dweller.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (employeeName == null) return {};
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  let obj = {};
  return Object.assign(obj, personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function createObject(key, value) {
  const obj = {};
  obj[key] = value;
  return obj;
}

function countAnimals(species) {
  // seu código aqui
  if (species == null) {
    const animalsData = {};
    const animalsNames = data.species.map((specie) => specie.name);
    const animalsQuantities = data.species.map((specie) => specie.residents.length);
    animalsNames.forEach((animalName, index) => {
      const temp = createObject(animalName, animalsQuantities[index]);
      Object.assign(animalsData, temp);
    });
    return animalsData;
  }
  return data.species.find((specie) => specie.name === species).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (entrants == null) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  let total = 0;
  total += data.prices.Adult * Adult;
  total += data.prices.Child * Child;
  total += data.prices.Senior * Senior;
  return total;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getDay(weekDay) {
  const schedule = {};
  const day = Object.entries(data.hours).find((dayInfo) => dayInfo[0] === weekDay);
  if (day[0] === 'Monday') Object.assign(schedule, createObject(day[0], 'CLOSED'));
  else Object.assign(schedule, createObject(day[0], `Open from ${day[1].open}am until ${day[1].close - 12}pm`));
  return schedule;
}

function getSchedule(dayName) {
  // seu código aqui
  const hoursKeys = Object.keys(data.hours);
  const hoursValues = Object.values(data.hours);
  const schedule = {};
  if (dayName == null) {
    hoursKeys.forEach((day, index) => {
      if (day === 'Monday') {
        const temp = createObject(day, 'CLOSED');
        Object.assign(schedule, temp);
      } else {
        const temp = createObject(day, `Open from ${hoursValues[index].open}am until ${hoursValues[index].close - 12}pm`);
        Object.assign(schedule, temp);
      }
    });
    return schedule;
  }
  return getDay(dayName);
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const firstAnimal = data.employees.find((curr) => curr.id === id).responsibleFor[0];
  const animal = data.species.find((ani) => ani.id === firstAnimal);
  return Object.values(animal.residents.reduce((acc, curr) => ((acc.age > curr.age) ? acc : curr)));
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
