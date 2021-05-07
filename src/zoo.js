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
  return data.species.filter((oneSpecies) => ids.includes(oneSpecies.id));
}

function getAnimalsOlderThan(animal, age) {
  const { residents } = data.species.find((oneSpecies) => oneSpecies.name === animal);
  const areOlderThan = residents.every((resident) => resident.age >= age);
  return areOlderThan;
}

function getEmployeeByName(employeeName) {
  const employeeObject = data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return { ...employeeObject };
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  data.employees.push(newEmployee);
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species) {
  const counts = {};
  data.species.forEach((oneSpecies) => {
    counts[oneSpecies.name] = oneSpecies.residents.length;
  });
  if (species) {
    return counts[species];
  }
  return counts;
}

function calculateEntry(entrants = {}) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return Adult * data.prices.Adult + Child * data.prices.Child + Senior * data.prices.Senior;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
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
