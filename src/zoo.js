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
// console.log(data.employees);

function getSpeciesByIds(...ids) {
  if (ids.length === 0) return [];
  return ids.map((id) => data.species.find((animal) => animal.id === id));
}

function getAnimalsOlderThan(animal, minAge) {
  return data.species.find((zooAnimal) => zooAnimal.name === animal).residents.every((zooAge) => zooAge.age >= minAge);
}

function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return data.employees.find((employee) => (employee.firstName === employeeName || employee.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}
// .some((person) => idParam === person.managers
function isManager(idParam) {
  return data.employees.some((person) => person.managers.includes(idParam));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species) {
  if (typeof species === 'undefined') {
    const animalsResidents = {};
    data.species.forEach((animal) => {
      animalsResidents[animal.name] = animal.residents.length;
    });
    return animalsResidents;
  }
  return data.species.find((animal) => animal.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (typeof entrants === 'undefined' || Object.keys(entrants).length === 0) return 0;
  let sum = 0;
  Object.entries(entrants).flatMap((person) => {
    switch (person[0]) {
    case 'Adult':
      sum += (person[1] * data.prices.Adult);
      break;
    case 'Senior':
      sum += (person[1] * data.prices.Senior);
      break;
    case 'Child':
      sum += (person[1] * data.prices.Child);
      break;
    default:
      break;
    }
  });
  return sum;
}

function getAnimalMap(options) {
  let locations = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
}

function getSchedule(dayName) {
  const week = Object.entries(data.hours);
  const humanCalendar = {};
  week.forEach((dayHour) => {
    if (dayHour[0] !== 'Monday') humanCalendar[dayHour[0]] = `Open from ${dayHour[1].open}am until ${dayHour[1].close % 12}pm`;
    if (dayHour[0] === 'Monday') humanCalendar[dayHour[0]] = 'CLOSED';
  });
  if (typeof dayName === 'undefined') return humanCalendar;
  return { [dayName]: humanCalendar[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const foundFirstAnimal = data.employees.find((person) => person.id === id).responsibleFor[0];
  const foundAnimal = data.species.find((animal) => animal.id === foundFirstAnimal);
  const oldestAge = foundAnimal.residents.reduce((acc, current) => (current.age > acc ? current.age : acc), 0);
  const oldestAnimal = foundAnimal.residents.find((currentResident) => currentResident.age === oldestAge);
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  for (let price in data.prices) {
    if (price !== 0) {
      data.prices[price] = Math.round((data.prices[price] + (data.prices[price] * (percentage / 100)) + Number.EPSILON) * 100) / 100;
    }
  }
  return data.prices;
}

function getAnimal(obj) {
  const animals = obj.responsibleFor.flatMap((animal) => {
    const filteredAnimals = getSpeciesByIds(animal);
    for (let zooAnimal of filteredAnimals) {
      return zooAnimal.name;
    }
  });
  return animals;
}

function getEmployeeCoverage(idOrName) {
  const result = {};
  if (typeof idOrName === 'undefined') {
    data.employees.forEach((person) => {
      result[`${person.firstName} ${person.lastName}`] = getAnimal(person);
    });
    return result;
  }
  const employee = data.employees.find((person) => person.id === idOrName || person.firstName === idOrName || person.lastName === idOrName);
  result[`${employee.firstName} ${employee.lastName}`] = getAnimal(employee);
  return result;
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
