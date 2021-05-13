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
const { species, employees, prices, hours } = require('./data');

const getSpeciesByIds = (...ids) => species.filter((specie) => ids.includes(specie.id));

const getAnimalsOlderThan = (animal, age) => species.find((specie) => specie.name === animal).residents.every((el) => el.age >= age);

const getEmployeeByName = (employeeName) => {
  if (!employeeName) {
    return {};
  }
  return employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => employees.some(({ managers }) => managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => employees.push({ id, firstName, lastName, managers, responsibleFor });

const countAnimals = (animals) => {
  const animalsCount = {};
  if (!animals) {
    species.forEach((element) => {
      animalsCount[element.name] = element.residents.length;
    });
    return animalsCount;
  }
  return species.find((specie) => specie.name === animals).residents.length;
};

const calculateEntry = (entrants = {}) => Object.entries(entrants).reduce((acumulador, [item, value]) => acumulador + (prices[item] * value), 0);

function getAnimalMap(options) {
  // seu código aqui
}

// const expected = {
// 'Tuesday': 'Open from 8am until 6pm',
// 'Wednesday': 'Open from 8am until 6pm',
// 'Thursday': 'Open from 10am until 8pm',
// 'Friday': 'Open from 10am until 8pm',
// 'Saturday': 'Open from 8am until 10pm',
// 'Sunday': 'Open from 8am until 8pm',
// 'Monday': 'CLOSED'
// };

const getSchedule = (dayName) => {
  const schedule = {};

  Object.entries(hours).forEach((el) => {
    if (el[0] === 'Monday') {
      schedule[el[0]] = 'CLOSED';
    } else {
      schedule[el[0]] = `Open from ${el[1].open}am until ${el[1].close - 12}pm`;
    }
  });
  let day = Object.entries(schedule).find((el) => el[0] === dayName);
  if (!dayName) {
    return schedule;
  } return { [day[0]]: day[1] };
};

const getOldestFromFirstSpecies = (id) => {
  let animals = employees.find((employee) => employee.id === id).responsibleFor[0];

  return Object.values(species.find((specie) => specie.id === animals).residents.reduce((acc, index) => {
    if (acc.age < index.age) {
      return index;
    } return acc;
  }))
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
