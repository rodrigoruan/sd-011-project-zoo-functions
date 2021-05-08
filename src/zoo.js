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
  if (ids === []) {
    return [];
  }
  const arrayIds = ids.map((ID) => data.species.find((specie) => specie.id === ID));
  return arrayIds;
}

function getAnimalsOlderThan(animal, age) {
  const verifyAge = data.species.some((specie) => specie.name === animal && specie.residents.every((resident) => resident.age >= age));
  return verifyAge;
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const getEmployee = data.employees.filter((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return getEmployee[0];
}

function createEmployee(personalInfo, associatedWith) {
  // const { id, firstName, lastName } = personalInfo;
  // const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  const manage = data.employees.some((employee) => employee.managers.includes(id));
  return manage;
}

function addEmployee(idInput, firstNameInput, lastNameInput, managersInput = [], responsibleForInput = []) {
  const newEmployees = {
    id: idInput,
    firstName: firstNameInput,
    lastName: lastNameInput,
    managers: managersInput,
    responsibleFor: responsibleForInput,
  };

  return data.employees.push(newEmployees);
}

function countAnimals(species) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
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
