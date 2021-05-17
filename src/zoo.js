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
const { prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aquii
  return data.species.filter((species) => ids.includes(species.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find(((specie) => specie.name === animal)).residents.every((species) => species.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  let employee;
  if (employeeName === undefined) {
    employee = {};
  } else {
    employee = data.employees.find((element) => element.firstName === employeeName || element.lastName === employeeName);
  }
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  let objEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };

  return objEmployee;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((maneger) => maneger.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  const allAnimals = data.species.reduce((acc, crr) => {
    const { name, residents } = crr;
    const obj = {
      [`${name}`]: residents.length,
    };
    return Object.assign(acc, obj);
  }, {});
  if (species) {
    return allAnimals[species];
  }
  return allAnimals;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants || entrants === {}) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  if (!dayName) {
    return Object.keys(data.hours);
  }
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const getId = data.employees.find((emp) => emp.id === id).responsibleFor[0];
  const getAnimal = data.species.filter((animal) => animal.id === getId)[0].residents;
  const getAge = getAnimal.reduce((acc, crr) => Math.max(acc, crr.age), 0);
  const getAnimalAge = getAnimal.find((animal) => animal.age === getAge);
  return Object.values(getAnimalAge);
}

function increasePrices(percentage) {
  // seu código aqui
  const adult = ((data.prices.Adult * percentage) / 100) + data.prices.Adult + 0.001;
  const child = ((data.prices.Child * percentage) / 100) + data.prices.Child + 0.001;
  const senior = ((data.prices.Senior * percentage) / 100) + data.prices.Senior + 0.001;

  data.prices.Adult = Number(adult.toFixed(2));
  data.prices.Child = Number(child.toFixed(2));
  data.prices.Senior = Number(senior.toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  // Feito na sala junto com o Lima e Bruno Duarte.
  let result = {};
  if (!idOrName) {
    data.employees.forEach(({ firstName, lastName, responsibleFor }) => {
      result[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
    });
    return result;
  }
  data.employees.filter(({ firstName, lastName, id }) => firstName === idOrName || lastName === idOrName || id === idOrName).forEach(({ firstName, lastName, responsibleFor }) => {
    result[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
  });
  return result;
}
getEmployeeCoverage();

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
