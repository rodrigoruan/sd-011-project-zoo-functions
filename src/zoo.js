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
  return data.species.filter((Species) => ids.some((id) => Species.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const findResidents = data.species.find((item) => item.name === animal).residents;
  const ageCheck = findResidents.every((item) => (item.age > age));
  return ageCheck;
}

function getEmployeeByName(employeeName) {
  const findEmployee = data.employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
  return (employeeName === undefined) ? {} : findEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some((elements) => elements.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newEmployee);
}

function countAnimals(species) {
  if (species === undefined) {
    let animals = {};
    data.species.forEach((animal) => { animals[animal.name] = animal.residents.length; });
    return animals;
  }
  const total = (counter) => counter + 1;
  const animalsReturn = data.species.filter((animal) => animal.name === species);
  const { residents: totalAnimals } = animalsReturn[0];
  return totalAnimals.reduce(total, 0);
}

function calculateEntry(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  return Object.keys(entrants).reduce((previousValue, currentValue) => previousValue + (prices[currentValue] * entrants[currentValue]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const dayOfWeek = {};
  Object.keys(data.hours).forEach((day) => {
    const openZoo = data.hours[day].open;
    const closeZoo = data.hours[day].close;
    dayOfWeek[day] = `The zoo is open from ${openZoo} until ${closeZoo - 12}`;
  });
  dayOfWeek.Monday = 'CLOSED';

  if (dayName) return ({ [dayName]: dayOfWeek[dayName] });

  return dayOfWeek;
}

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
