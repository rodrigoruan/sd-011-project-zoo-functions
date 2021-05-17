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

// Adicionando para commit inicial
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return (data.species.some((specie) => specie.name === animal && specie.residents
    .every((resident) => resident.age > age)));
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find((employer) => employer.firstName === employeeName || employer.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employer) => employer.managers.includes(id));
}

function addEmployee(id = {}, firstName = {}, lastName = {}, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function countAnimals(species) {
  if (!species) {
    const allAnimals = {};
    data.species.forEach((specie) => {
      allAnimals[specie.name] = specie.residents.length;
    });
    return allAnimals;
  }
  return data.species.find((specie) => specie.name.includes(species)).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === {} || !entrants) return 0;
  return Object.keys(entrants).reduce((accumulator, currentValue) => accumulator + (entrants[currentValue] * data.prices[currentValue]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let calendar = {};
  Object.keys(data.hours).forEach((weekDay) => {
    calendar[weekDay] = `Open from ${data.hours[weekDay].open}am until ${data.hours[weekDay].close - 12}pm`;
    if (weekDay === 'Monday') calendar[weekDay] = 'CLOSED';
  });
  if (dayName !== undefined) {
    return { [dayName]: calendar[dayName] };
  }
  return calendar;
}

console.log(getSchedule('Monday'));
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
