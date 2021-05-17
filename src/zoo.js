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

const { species, employees, hours, prices } = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((specie) => specie.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  return employeeName
    ? employees.find((emp) => emp.firstName === employeeName || emp.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((emp) => emp.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specieName) {
  return specieName
    ? species.find((spec) => spec.name === specieName).residents.length
    : species.reduce((acc, specie) => {
      acc[specie.name] = specie.residents.length;
      return acc;
    }, {});
}

function calculateEntry(entrants) {
  return (!entrants || Object.keys(entrants).length === 0) ? 0
    : Object.keys(entrants).reduce((acc, key) => acc + prices[key] * entrants[key], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

const fulLSchedule = (hour) => {
  const result = Object.keys(hours).reduce((acc, curr, index) => {
    acc[curr] = `Open from ${hour[index].open}am until ${hour[index].close - 12}pm`;
    return acc;
  }, {});
  if (result.Monday) result.Monday = 'CLOSED';
  return result;
};

const schedulePerDay = (dayName, hour) => {
  const result = [dayName].reduce((acc, curr, index) => {
    acc[curr] = `Open from ${hour[index].open}am until ${hour[index].close - 12}pm`;
    return acc;
  }, {});
  if (result.Monday) result.Monday = 'CLOSED';
  return result;
};

function getSchedule(dayName) {
  const hour = Object.values(hours);
  return !dayName ? fulLSchedule(hour) : schedulePerDay(dayName, hour);
}

function getOldestFromFirstSpecies(id) {
  const idAnimals = employees.find((emp) => emp.id === id).responsibleFor[0];
  const animals = species.find((spec) => spec.id === idAnimals).residents;
  return Object.values(animals.sort((animalA, animalB) => animalA.age - animalB.age).reverse()[0]);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.round(prices[key] * (1 + percentage / 100) * 100) / 100;
  });
}

function getEmployeeCoverage(idOrName) {
  const fullList = () =>
    employees.reduce((acc, emp) => {
      acc[`${emp.firstName} ${emp.lastName}`] = emp.responsibleFor.map((animal) =>
        species.find((spec) => spec.id === animal).name);
      return acc;
    }, {});

  const byIdOrName = () => {
    const employee = employees.find(({ id, firstName, lastName }) => id === idOrName || firstName === idOrName || lastName === idOrName);
    const fullName = `${employee.firstName} ${employee.lastName}`;
    return {
      [fullName]: employee.responsibleFor.map((animal) => species.find((spec) => spec.id === animal).name),
    };
  };

  return idOrName ? byIdOrName() : fullList();
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
