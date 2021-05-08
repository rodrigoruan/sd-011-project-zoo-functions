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
  if (species === undefined) {
    const newAnimalObject = {};
    data.species.forEach((animal) => { newAnimalObject[`${animal.name}`] = animal.residents.length; });
    return newAnimalObject;
  }
  const animalQuantity = data.species.find((specie) => specie.name === species).residents.length;
  return animalQuantity;
}

function calculateEntry(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultValue = Adult * data.prices.Adult;
  const childValue = Child * data.prices.Child;
  const seniorValue = Senior * data.prices.Senior;
  return adultValue + childValue + seniorValue;
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
