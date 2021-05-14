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

const { prices, employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids.length === 0) {
    return [];
  } return data.species.filter((animal) => ids.includes(animal.id));
}

function getAnimalsOlderThan(animal, age) {
  const filterAnimal = data.species.find((specie) => specie.name === animal);
  return filterAnimal.residents.every((animalFiltered) => animalFiltered.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  } return data.employees.find((people) => employeeName.includes(people.firstName) || employeeName.includes(people.lastName));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((manager) => manager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) {
    managers = [];
  }
  if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}

function countAnimals(species) {
  if (species === undefined) {
    return data.species.reduce((acc, crr) => {
      acc[crr.name] = crr.residents.length;
      return acc;
    }, {});
  }
  const speciePopulation = data.species.find((specie) => specie.name === species);
  return speciePopulation.residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, crr) => acc + (entrants[crr] * prices[crr]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const days = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName !== undefined) {
    return { [dayName]: days[dayName] };
  } return days;
}

function getOldestFromFirstSpecies(id) {
  const employeeSlected = data.employees.find((employee) => employee.id === id);
  const specieSelected = data.species.find((specie) => specie.id === employeeSlected.responsibleFor[0]);
  let age = 0;
  let oldest = [];
  specieSelected.residents.forEach((animal) => {
    if (animal.age > age) {
      age = animal.age;
      oldest = [animal.name, animal.sex, animal.age];
    }
  });
  return oldest;
}

function increasePrices(percentage) {
  data.prices = {
    Adult: Math.round((data.prices.Adult * (percentage / 100 + 1)) * 100) / 100,
    Senior: Math.round((data.prices.Senior * (percentage / 100 + 1)) * 100) / 100,
    Child: Math.round((data.prices.Child * (percentage / 100 + 1)) * 100) / 100,
  };
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
