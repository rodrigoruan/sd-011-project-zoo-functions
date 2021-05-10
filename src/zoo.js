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

const { species: species1, employees, hours, prices } = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return species1.filter((animal) => ids.some((id) => id === animal.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const people = species1.filter((members) => members.name === animal);
  return (people[0].residents).every((member) => member.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  const person = employees.find((name) => name.firstName === employeeName || name.lastName === employeeName);
  return person !== undefined ? person : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.find((employee) => employee).managers.includes(id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function countAnimals(species) {
  // seu código aqui
  const animalObj = {};
  species1.forEach((animal) => {
    const { name } = animal;
    const { length } = animal.residents;
    animalObj[name] = length;
  });
  if (species) return animalObj[species];
  return animalObj;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const people = Object.keys(entrants);
  return people.reduce((acc, keys) => acc + (prices[keys] * entrants[keys]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

const formatTime = (hour) => {
  let result = 0;
  if (hour === 0) result = 'CLOSED';
  if (hour > 12) result = hour % 12;
  return result;
};

function getSchedule(dayName) {
  // seu código aqui
  const days = [...Object.keys(hours)];
  const shifts = [...Object.values(hours)];
  const stdSchedule = days.reduce((obj, el, index) => {
    obj[el] = `Open from ${shifts[index].open}am until ${formatTime(shifts[index].close)}pm`;
    if (formatTime(shifts[index].close) === 'CLOSED') obj[el] = 'CLOSED';
    return obj;
  }, {});
  if (dayName) {
    let daySchedule = {};
    daySchedule[dayName] = stdSchedule[dayName];
    return daySchedule;
  }
  return stdSchedule;
}

function getOldestFromFirstSpecies(code) {
  // seu código aqui
  const foundEmployee = employees.find((person) => person.id === code).responsibleFor[0];
  const foundSpecie = species1.find((animal) => animal.id === foundEmployee).residents;
  const oldestAnimal = foundSpecie.sort((a, b) => b.age - a.age)[0];
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  // seu código aqui
  const increaseFactor = () => (percentage / 100) + 1;
  const roundFloat = (number) => Math.round(number * 100) / 100;

  const numOfPrices = Object.keys(prices);

  numOfPrices.forEach((price) => {
    prices[price] = roundFloat((prices[price] * increaseFactor()));
  });
  return prices;
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

// console.log(getEmployeeCoverage());

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
