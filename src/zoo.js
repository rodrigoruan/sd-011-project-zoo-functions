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

const { species, employees, hours, prices } = data;

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.some((id) => id === specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find(({ name }) => name === animal).residents.every(({ age: ages }) => ages >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find((value) => (value.firstName === employeeName || value.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  if (data.employees.find((value) => (value.id === id)).managers.length === 1) return true;
  return false;
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(animal) {
  if (typeof animal === 'undefined') {
    const object = {};
    species.forEach((specie) => { object[specie.name] = specie.residents.length; });
    return object;
  }
  return species.find((specie) => specie.name === animal).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
}

function getSchedule(dayName) {
  const result = {};
  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      result[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else { result[day] = 'CLOSED'; }
  });
  if (!dayName) return result;
  return { [dayName]: result[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const employee = data.employees.find((value) => value.id === id);
  const specie = data.species.find((value) => value.id === employee.responsibleFor[0]);
  const animal = specie.residents.reduce((acc, currentValue) => {
    if (currentValue.age > acc.age) return currentValue;
    return acc;
  });
  return Object.values(animal);
}

function increasePrices(percentage) {
  return Object.keys(prices).forEach((ageGroup) => {
    prices[ageGroup] *= (1 + (percentage / 100));
    prices[ageGroup] = Math.round(prices[ageGroup] * 100) / 100;
  });
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    const result = {};

    const speciesEmployeeResponsable = employees.map((employee) => employee.responsibleFor.map((specieId) => species.find((specie) => specie.id === specieId).name));
    employees.forEach((employee, index) => {
      result[`${employee.firstName} ${employee.lastName}`] = speciesEmployeeResponsable[index];
    });
    return result;
  }
  const findEmployee = employees.find((employee) => employee.id === idOrName
    || employee.firstName === idOrName || employee.lastName === idOrName);
  return {
    [`${findEmployee.firstName} ${findEmployee.lastName}`]: findEmployee.responsibleFor.map((specieId) => species.find((specie) => specie.id === specieId).name) };
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
