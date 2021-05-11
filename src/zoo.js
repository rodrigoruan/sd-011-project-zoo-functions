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

// Esse objeto é nescessario para o mapeamento da função getEmployeeCoverage
const animalTranslationMap = {
  '0938aa23-f153-4937-9f88-4858b24d6bce': 'lions',
  '533bebf3-6bbe-41d8-9cdf-46f7d13b62ae': 'otters',
  'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5': 'elephants',
  '78460a91-f4da-4dea-a469-86fd2b8ccc84': 'snakes',
  '89be95b3-47e4-4c5b-b687-1fabf2afa274': 'frogs',
  'baa6e93a-f295-44e7-8f70-2bcdc6f6948d': 'bears',
  'e8481c1d-42ea-4610-8e11-1752cfc05a46': 'tigers',
  'ef3778eb-2844-4c7c-b66c-f432073e1c6b': 'penguins',
  '01422318-ca2d-46b8-b66c-3e9e188244ed': 'giraffes',
};

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

function roundUpFixedTwo(value) {
  const biggerPrice = value * 100;
  const truncatedPrice = Math.ceil(biggerPrice);
  return truncatedPrice / 100;
}

function increasePrices(percentage) {
  const percentageFunction = (value, base) => (value * base) / 100;
  const adultNewPrice = percentageFunction(percentage, prices.Adult) + prices.Adult;
  const seniorNewPrice = percentageFunction(percentage, prices.Senior) + prices.Senior;
  const childNewPrice = percentageFunction(percentage, prices.Child) + prices.Child;
  prices.Adult = roundUpFixedTwo(adultNewPrice);
  prices.Child = roundUpFixedTwo(childNewPrice);
  prices.Senior = roundUpFixedTwo(seniorNewPrice);
  // seu código aqui
}

function resolveAnimalName(ids) {
  let animalName = [];
  for (let index = 0; index < ids.length; index += 1) {
    animalName.push(animalTranslationMap[ids[index]]);
  }
  return animalName;
}

function getEmployeeCoverage(idOrName) {
  const employeeCoverage = {};
  const employeeFullNameKey = (object) =>
    `${object.firstName} ${object.lastName}`;

  if (!idOrName) {
    employees.forEach((element) => {
      employeeCoverage[employeeFullNameKey(element)] = resolveAnimalName(
        element.responsibleFor,
      );
    });
    return employeeCoverage;
  }

  const employeeFind = employees.find(
    (employee) =>
      employee.firstName === idOrName
      || employee.lastName === idOrName
      || employee.id === idOrName,
  );

  employeeCoverage[employeeFullNameKey(employeeFind)] = resolveAnimalName(
    employeeFind.responsibleFor,
  );

  return employeeCoverage;

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
