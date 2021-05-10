/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.some((id) => specie.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const targetAnimal = species.find((specie) => specie.name === animal);
  const boolAnimalAge = targetAnimal.residents.every(
    (resident) => resident.age >= age,
  );
  return boolAnimalAge;
  // seu código aqui
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(
    (employee) =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  let newEmployee = Object.assign(personalInfo, associatedWith);
  return newEmployee;
  // seu código aqui
}

function isManager(id) {
  if (
    id === '9e7d4524-363c-416a-8759-8aa7e50c0992'
    || id === 'fdb2543b-5662-46a7-badc-93d960fdc0a8'
    || id === '0e7b460e-acf4-4e17-bcb3-ee472265db83'
  ) {
    return true;
  }
  return false;
  // seu código aqui
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  let newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
  return employees;
  // seu código aqui
}

function countAnimals(speciesList) {
  if (typeof speciesList === 'undefined') {
    const objectAnimalList = {};
    species.forEach((__, index) => {
      objectAnimalList[species[index].name] = species[index].residents.length;
    });
    return objectAnimalList;
  }
  for (let indexJ = 0; indexJ < species.length; indexJ += 1) {
    if (species[indexJ].name === speciesList) {
      return species[indexJ].residents.length;
    }
  }
}

function thisOrDefaut(exp, fallback) {
  return exp || fallback;
}

function calculateEntry(entrants) {
  // https://pt.wikipedia.org/wiki/Avalia%C3%A7%C3%A3o_de_curto-circuito
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const childPrice = thisOrDefaut(entrants.Child, 0) * prices.Child;
  const adultPrice = thisOrDefaut(entrants.Adult, 0) * prices.Adult;
  const seniorPrice = thisOrDefaut(entrants.Senior, 0) * prices.Senior;
  return childPrice + adultPrice + seniorPrice;
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const schedule = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (typeof dayName === 'undefined') {
    return schedule;
  }
  let specificDay = [
    Object.entries(schedule).find((keyValue) => keyValue[0] === dayName),
  ];
  return Object.fromEntries(specificDay);
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // const percentageFunction = (percentage, base) => (percentage * base) / 100;
  // const adultNewPrice = (
  //   percentageFunction(percentage, prices.Adult) + prices.Adult
  // )
  // console.log();
  // // seu código aqui
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
