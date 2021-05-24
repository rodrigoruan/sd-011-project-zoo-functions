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
const { species, employees, prices, hours } = require('./data');

function getSpeciesByIds(ids = [], ids2 = undefined) {
  if (ids !== undefined) {
    const speciesOfAnimals = species.filter((animals) => animals.id === ids);
    if (ids2 !== undefined) {
      const speciesOfAnimals2 = species.filter((animals) => animals.id === ids2);
      return [...speciesOfAnimals, ...speciesOfAnimals2];
    }
    return speciesOfAnimals;
  }
  return ids;
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((el) => el.name.includes(animal))
    .residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName !== undefined) {
    return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some((funcionario) => funcionario.managers.some((value) => value === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
  return data.employes;
}

function countAnimals(speciees) {
  if (!speciees) {
    return data.species.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specie) => specie.name === speciees).residents.length;
}

function calculateEntry(entrants) {
  return (!entrants || Object.keys(entrants).length === 0) ? 0
    : Object.keys(entrants).reduce((acc, key) => acc + prices[key] * entrants[key], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let schedule = {};
  Object.keys(hours).forEach((day) => {
    schedule[day] = `Open from ${hours[day].open}am until ${(hours[day].close) - 12}pm`;
    if (day === 'Monday') {
      schedule[day] = 'CLOSED';
    }
  });

  if (dayName !== undefined) {
    return { [dayName]: schedule[dayName] };
  }
  return schedule;
}

function getOldestFromFirstSpecies(id) {
  const idAnimals = employees.find((emp) => emp.id === id).responsibleFor[0];
  const animals = species.find((spec) => spec.id === idAnimals).residents;
  return Object.values(animals.sort((animalA, animalB) => animalA.age - animalB.age).reverse()[0]);
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.round(prices[key] * (1 + percentage / 100) * 100) / 100;
  });
}

function getEmployeeCoverage(idOrName) {
  const objeect = {};
  if (!idOrName) {
    data.employees.forEach(({ firstName, lastName, responsibleFor }) => {
      objeect[`${firstName} ${lastName}`] = responsibleFor.map((idEntradaAnimal) => data.species.find(({ id }) => id === idEntradaAnimal).name);
    });
  }
  data.employees.filter(({ firstName, lastName, id }) => firstName === idOrName || lastName === idOrName || id === idOrName).forEach(({ firstName, lastName, responsibleFor }) => { objeect[`${firstName} ${lastName}`] = responsibleFor.map((idEntradaAnimal) => data.species.find(({ id }) => id === idEntradaAnimal).name); });
  return objeect;
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
