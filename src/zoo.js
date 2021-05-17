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

function getAnimalsOlderThan(animal, age) {
  const findingName = (specie) => specie.name === animal;
  const checkingAge = (resident) => resident.age >= age;

  return species.find(findingName).residents.every(checkingAge);
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
    species.forEach((animal) => {
      const { name, residents } = animal;
      animalsObj[name] = residents.length;
    });

    return animalsObj;
  }

  return species.find((animal) => animal.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function getAnimalMap(options) {
}

function getSchedule(dayName) {
  const days = Object.keys(data.hours);
  const scheduleObj = {};

  if (!dayName) {
    days.forEach((day) => {
      scheduleObj[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;

      if (day === 'Monday') {
        scheduleObj[day] = 'CLOSED';
      }
    });
    return scheduleObj;
  }

  if (dayName === 'Monday') {
    scheduleObj[dayName] = 'CLOSED';
    return scheduleObj;
  }

  scheduleObj[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
  return scheduleObj;
}


function getOldestFromFirstSpecies(id) {
  const animalsResponsible = employees.find((employee) => employee.id === id).responsibleFor;
  const getAnimals = species.find((animal) => animal.id === animalsResponsible[0]).residents;
  const compareAge = getAnimals.map((animal) => animal.age).reduce((bigger, number) => ((bigger > number) ? bigger : number));
  const getOldest = getAnimals.find((animal) => animal.age === compareAge);

  return Object.values(getOldest);
}

function increasePrices(percentage) {
  const keys = Object.keys(data.prices);
  keys.forEach((value) => {
    const calculatePrice = data.prices[value] + (percentage * data.prices[value]) / 100;
    data.prices[value] = Math.round(calculatePrice * 100) / 100;
  });

  return data.prices;
}

function getEmployeeCoverage(idOrName) {
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
