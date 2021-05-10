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
  if (typeof ids === 'undefined') return [];
  return data.species.filter((species) => ids.includes(species.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animalObject) => animalObject.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  let employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(employee);
}

function countAnimals(specieName) {
  if (typeof specieName === 'undefined') {
    return data.species.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((animal) => animal.name === specieName).residents.length;
}

function calculateEntry(entrants) {
  let total = 0;

  for (let entrantAge in entrants) {
    if (entrantAge === 'Adult' || entrantAge === 'Child' || entrantAge === 'Senior') {
      total += data.prices[entrantAge] * entrants[entrantAge];
    }
  }
  return total;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = data.hours;
  if (typeof dayName === 'undefined') {
    return {
      Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
      Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
      Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
      Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
      Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
      Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
      Monday: 'CLOSED',
    };
  }

  if (dayName === 'Monday') {
    return {
      Monday: 'CLOSED',
    };
  }

  return {
    [dayName]: `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`,
  };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
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
