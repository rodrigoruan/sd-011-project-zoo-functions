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

const { species, employees, prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  let array = [];
  ids.forEach((id) => {
    const filterId = species.filter((specie) => id === specie.id);
    array.push(filterId[0]);
  });
  return array;
}

function getAnimalsOlderThan(animal, age) {
  let checkAge;
  species.forEach((beast) => {
    if (beast.name === animal) {
      checkAge = beast.residents.every((resident) => resident.age > age);
    }
  });
  return checkAge;
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers[0] === id || employee.managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function countAnimals(specie) {
  if (specie) {
    return data.species.find((element) => element.name === specie).residents.length;
  }
  let result = {};
  data.species.forEach((animal) => {
    result[animal.name] = animal.residents.length;
  });
  return result;
}

function calculateEntry(entrants = {}) {
  let fullPrice = 0;
  Object.keys(entrants).forEach((key) => {
    if (key === 'Adult') {
      fullPrice += entrants[key] * data.prices.Adult;
    } else if (key === 'Senior') {
      fullPrice += entrants[key] * data.prices.Senior;
    } else {
      fullPrice += entrants[key] * data.prices.Child;
    }
  });

  return fullPrice;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = data.hours;
  const businessHours = {
    Monday: 'CLOSED',
    Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
    Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
    Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
    Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
    Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
  };
  if (!dayName) {
    return businessHours;
  }
  return { [dayName]: businessHours[dayName],
  };
}

function getOldestFromFirstSpecies(id) {
  const employees1 = data.employees.find((responsible) => responsible.id === id).responsibleFor[0];
  return Object.values(data.species
    .find((specie) => specie.id === employees1)
    .residents.sort((age1, age2) => age2.age - age1.age)[0]);
}


function increasePrices(percentage) {
  let { Adult, Senior, Child } = prices;
  Adult = Number(Adult);
  Senior = Number(Senior);
  Child = Number(Child);

  Adult += ((prices.Adult * percentage) / 100) + 0.001;
  Senior += ((prices.Senior * percentage) / 100) + 0.001;
  Child += ((prices.Child * percentage) / 100) + 0.001;

  prices.Adult = Number(Adult.toFixed(2));
  prices.Senior = Number(Senior.toFixed(2));
  prices.Child = Number(Child.toFixed(2));
  return prices;
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
