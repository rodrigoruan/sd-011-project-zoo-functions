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
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
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
  // seu código aqui
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
