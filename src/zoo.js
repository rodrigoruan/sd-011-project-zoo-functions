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
  return species.filter((animals) => ids.includes(animals.id));
}

function getAnimalsOlderThan(specie, age) {
  const animalSpecie = (animal) => animal.name === specie;
  const animalAge = (animal) => animal.age >= age;

  return species.find(animalSpecie).residents.every(animalAge);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};

  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  if (!specie) {
    const animalsObj = {};

    const animalsQuant = species.map((animal) => animal.residents.length);
    const animalsName = species.map((animal) => animal.name);

    animalsName.forEach((animal, index) => {
      animalsObj[animal] = animalsQuant[index];
    });

    return animalsObj;
  }

  return species.find((animal) => animal.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function getAnimalMap() {
}

function getSchedule(dayName) {
  const days = Object.keys(hours);
  const scheduleObj = {};

  if (!dayName) {
    days.forEach((day) => {
      scheduleObj[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;

      if (day === 'Monday') scheduleObj[day] = 'CLOSED';
    });

    return scheduleObj;
  }

  scheduleObj[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;

  if (dayName === 'Monday') scheduleObj[dayName] = 'CLOSED';

  return scheduleObj;
}

function getOldestFromFirstSpecies(id) {
  const findEmployee = employees.find((employee) => employee.id === id);

  const findAnimalsResponsible = findEmployee.responsibleFor.find((animal) => animal);

  const getAnimals = species.find((animal) => animal.id === findAnimalsResponsible).residents;

  const compareAge = getAnimals.map((animal) => animal.age).reduce((bigger, age) => ((bigger > age) ? bigger : age));

  const getOldest = getAnimals.find((animal) => animal.age === compareAge);

  return Object.values(getOldest);
}

function increasePrices(percentage) {
  const keys = Object.keys(prices);
  const values = Object.values(prices);

  keys.forEach((key, index) => {
    const newPrice = values[index] + (values[index] * percentage) / 100;
    prices[key] = Math.round(newPrice * 100) / 100;
  });

  return prices;
}

function getEmployeeCoverage(idOrName) {
  const employeeObj = {};
  const findAnimal = (id) => species.find((animal) => animal.id === id).name;

  if (!idOrName) {
    employees.forEach((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      employeeObj[fullName] = employee.responsibleFor.map(findAnimal);
    });
    return employeeObj;
  }

  employees.forEach((employee) => {
    if (employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName) {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      employeeObj[fullName] = employee.responsibleFor.map(findAnimal);
    }
  });

  return employeeObj;
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
