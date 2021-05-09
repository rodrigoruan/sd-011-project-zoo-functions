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

function getSpeciesByIds(...ids) {
  const specielId = data.species.filter((species) => ids.some((id) => id === species.id));
  return specielId;
}

function getAnimalsOlderThan(animal, age) {
  const animals = data.species.find((specie) => (animal === specie.name)).residents.every((resident) => (resident.age > age));
  return animals;
}

function getEmployeeByName(employeeName) {
  const employee = data.employees.find((employeed) => (employeeName === employeed.firstName) || (employeeName === employeed.lastName));
  return (!employeeName) ? {} : employee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const theOfficer = data.employees.some(({ managers }) => managers.includes(id));
  return theOfficer;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmplo = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return newEmplo;
}

function countAnimals(species) {
  let newObj = {};
  if (!species) {
    data.species.forEach((value) => {
      newObj[value.name] = value.residents.length;
    });
    return newObj;
  }
  const count = data.species.find((cur) => species === cur.name).residents.length;
  return count;
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
  }
  const soma = ({ Adult = 0, Child = 0, Senior = 0 }) => {
    let sum = 0;
    sum += data.prices.Adult * Adult;
    sum += data.prices.Child * Child;
    sum += data.prices.Senior * Senior;

    return sum;
  };
  return soma(entrants);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let hourOpen = Object.values(data.hours);
  let days;

  if (!dayName) {
    days = Object.keys(data.hours);
  } else {
    days = [dayName];
  }

  let msg = days.reduce((day, actualDay, arr) => {
    day[actualDay] = `Open from ${hourOpen[arr].open}am until ${hourOpen[arr].close - 12}pm`;
    return day;
  }, {});

  if (msg.Monday) {
    msg.Monday = 'CLOSED';
  }
  return msg;
}

function getOldestFromFirstSpecies(id) {
  const animalId = data.employees.filter((ids) => ids.id === id)[0].responsibleFor[0];
  const getAnimal = data.species.filter((ids) => ids.id === animalId)[0].residents;
  const getOlderAnimal = getAnimal.sort((a, b) => b.age - a.age)[0];

  return [getOlderAnimal.name, getOlderAnimal.sex, getOlderAnimal.age];
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
