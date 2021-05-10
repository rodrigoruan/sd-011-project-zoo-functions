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

const { species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return species.find(({ name }) => name === animal).residents.every(({ age: capturedAge }) => capturedAge >= age);
}

function getEmployeeByName(employeeName) {
  const { employees } = data;
  return (!employeeName) ? {} : employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployee);
}

function countAnimals(specie) {
  const animal = {};
  if (!specie) {
    data.species.forEach((element) => {
      animal[element.name] = element.residents.length;
    });
    return animal;
  }
  return data.species.find((animalName) => animalName.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  const { Adult, Child, Senior } = entrants;
  let sum = 0;
  if (typeof Adult === 'number') sum += Adult * data.prices.Adult;
  if (typeof Child === 'number') sum += Child * data.prices.Child;
  if (typeof Senior === 'number') sum += Senior * data.prices.Senior;
  return sum;
}

// const objAnimals = {};
// const animalsNames = species.map((animal) => animal.name);
// const animals = species.reduce((acc, value) => objAnimals[value.location] = objAnimals[value.location] + [value.name], objAnimals);
// console.log(objAnimals);

// const getAnimalByLocation = (animal, location) => {

// };

function getAnimalMap(options) {
  // if (!options) return
}

function getSchedule(dayName) {
  const days = Object.keys(data.hours);
  const openingHours = {};
  days.forEach((day, index) => {
    const opening = data.hours[day].open;
    const closure = data.hours[day].close - 12;
    if (index === 6) {
      openingHours[day] = 'CLOSED';
    } else {
      openingHours[day] = `Open from ${opening}am until ${closure}pm`;
    }
  });
  if (!dayName) return openingHours;
  return { [dayName]: openingHours[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const animalAtResponsible = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const residentsAtResponsible = species.find((animals) => animalAtResponsible === animals.id).residents;
  const residentsSorted = residentsAtResponsible.sort((a, b) => b.age - a.age);
  const { name, sex, age } = residentsSorted[0];
  return [name, sex, age];
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
