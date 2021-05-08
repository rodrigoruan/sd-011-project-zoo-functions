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
  // seu código aqui
}

function getSchedule(dayName) {
  const week = Object.entries(data.hours);
  const humanCalendar = {};
  week.forEach((dayHour) => {
    if (dayHour[0] !== 'Monday') {
      humanCalendar[dayHour[0]] = `Open from ${dayHour[1].open}am until ${dayHour[1].close % 12}pm`;
    } else if (dayHour[0] === 'Monday') {
      humanCalendar[dayHour[0]] = 'CLOSED';
    }
  });
  if (typeof dayName === 'undefined') return humanCalendar;
  const arrayCalendar = Object.entries(humanCalendar);
  const workingDay = {};
  arrayCalendar.forEach((dayTime) => {
    if (dayName === dayTime[0]) {
      workingDay[dayTime[0]] = dayTime[1];
    }
  });
  return workingDay;
}

getSchedule('Monday');

function getOldestFromFirstSpecies(id) {
  // seu código aqui
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
