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

// const { species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((animalSpecie) => ids.some((id) => id === animalSpecie.id));
} // Muda a lógica para uso de spreed operator e função some. https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animals) => animals.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  const getEmployee = data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return { ...getEmployee };
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.some((idVerify) => idVerify === id));
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
  if (species === undefined) {
    const specieName = {};
    data.species.forEach((specie) => { specieName[specie.name] = specie.residents.length; });
    return specieName;
  }
  const getSpecie = data.species.find((specie) => specie.name === species);
  return getSpecie.residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined) {
    return 0;
  }

  const typeEntrants = Object.keys(entrants);
  const priceTicket = data.prices;
  return typeEntrants.reduce((acc, curr) => acc + (priceTicket[curr] * entrants[curr]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let schedule = {};
  const getHour = Object.values(data.hours);

  Object.keys(data.hours).forEach((day, index) => {
    if (dayName === undefined) {
      schedule[day] = `Open from ${getHour[index].open}am until ${getHour[index].close - 12}pm`;
    }
    if (day === dayName) {
      schedule[day] = `Open from ${getHour[index].open}am until ${getHour[index].close - 12}pm`;
    }
    if (schedule.Monday) {
      schedule.Monday = 'CLOSED';
    }
  });
  return schedule;
}

function getOldestFromFirstSpecies(id) {
  const firstResponsabity = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const firstAnimal = data.species.find((animal) => animal.id === firstResponsabity);
  return Object.values(firstAnimal.residents.reduce((acc, curr) => (acc.age > curr.age ? acc : curr)));
}

function increasePrices(percentage) {
  const percent = 1 + (percentage / 100);
  data.prices.Adult = (parseFloat(data.prices.Adult * percent * 100).toPrecision(4) / 100);
  data.prices.Child = (parseFloat(data.prices.Child * percent * 100).toPrecision(4) / 100);
  data.prices.Senior = (parseFloat(data.prices.Senior * percent * 100).toPrecision(4) / 100);
}

function getEmployeeCoverage(idOrName) {
  let obj = {};

  if (!idOrName) {
    data.employees.forEach((employee) => { obj[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((animal) => data.species.find(({ id }) => id === animal).name); });
  } else {
    const employeeResponsabity = data.employees.find(({ id, firstName, lastName }) => idOrName === id || idOrName === firstName || idOrName === lastName);

    obj[`${employeeResponsabity.firstName} ${employeeResponsabity.lastName}`] = employeeResponsabity.responsibleFor.map((animal) => data.species.find(({ id }) => animal === id).name);
  }
  return obj;
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
