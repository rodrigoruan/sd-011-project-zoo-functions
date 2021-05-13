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
  const { species } = data;

  const speciesFound = species.filter((specie) => ids.includes(specie.id));
  return speciesFound;
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const { species } = data;

  const specieFound = species.find((specie) => animal === specie.name);
  const isNewerThan = specieFound.residents.every((resident) => resident.age >= age);

  return isNewerThan;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  const { employees } = data;
  if (!employeeName) {
    return {};
  }

  const employeeFound = employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);

  return employeeFound;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const { employees } = data;
  const isManagerVerification = employees.find((employee) => employee.managers.includes(id));

  if (!isManagerVerification) {
    return false;
  }
  return true;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  const { employees } = data;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: !managers ? [] : managers,
    responsibleFor: !responsibleFor ? [] : responsibleFor,
  };
  employees.push(newEmployee);
}

function countAnimals(animals) {
  // seu código aqui
  const { species } = data;

  if (!animals) {
    const allSpecies = {};
    species.forEach((specie) => {
      allSpecies[specie.name] = specie.residents.length;
    });
    return allSpecies;
  }
  const specieFound = species.find((specie) => specie.name === animals);
  return specieFound.residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants) {
    return 0;
  }

  const { prices } = data;

  const adultTicketsValue = (prices.Adult * entrants.Adult || 0);
  const seniorTicketsValue = (prices.Senior * entrants.Senior || 0);
  const childTicketsValue = (prices.Child * entrants.Child || 0);

  const TicketsPriceSum = adultTicketsValue + seniorTicketsValue + childTicketsValue;
  return TicketsPriceSum;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  const { hours } = data;
  const fullSchedule = {};

  Object.keys(hours).forEach((day) => {
    fullSchedule[day] = hours[day].open === 0 ? 'CLOSED' : `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
  });

  if (!dayName) {
    return fullSchedule;
  }

  return {
    [dayName]: fullSchedule[dayName],
  };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const { species, employees } = data;

  const employeeFound = employees.find((employee) => employee.id === id);
  const firstSpecieId = employeeFound.responsibleFor[0];
  const specieFound = species.find((specie) => specie.id === firstSpecieId);
  const oldestAnimal = specieFound.residents.sort((accumulator, currentAnimal) => currentAnimal.age - accumulator.age);

  return Object.values(oldestAnimal[0]);
}
console.log(getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

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
