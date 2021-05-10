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

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const speciesId = species.filter((specie) => ids.includes(specie.id));

  return speciesId;
}

function getAnimalsOlderThan(animal, age) {
  const animalsNames = species.find((specie) => (
    specie.name === animal));

  //  console.log(animalsNames);

  const animalsMinAges = animalsNames.residents.every((animall) => (animall.age >= age));

  return animalsMinAges;
}

function getEmployeeByName(employeeName) {
  const peopleObject = employees.find((people) => (people.firstName === employeeName || people.lastName === employeeName));

  if (peopleObject !== undefined) {
    return peopleObject;
  }

  return ({});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return id === '0e7b460e-acf4-4e17-bcb3-ee472265db83';
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newPeople = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(newPeople);

  return employees;
}

function countAnimals(animals) {
  if (animals !== undefined) {
    const animAllsSelected = species.find((animalSelected) => (animalSelected.name === animals)).residents.length;

    return animAllsSelected;
  }
  let all = {};
  species.forEach((animal) => {
    (all[animal.name] = animal.residents.length);
  });

  return all;
}

function calculateEntry(entrants) {
  let total = 0;
  let adults = 0;
  let child = 0;
  let senior = 0;

  if (entrants === undefined) {
    return total;
  }

  if (entrants.Adult !== undefined) {
    adults = entrants.Adult * prices.Adult;
  }

  if (entrants.Child !== undefined) {
    child = entrants.Child * prices.Child;
  }

  if (entrants.Senior !== undefined) {
    senior = entrants.Senior * prices.Senior;
  }

  total = adults + child + senior;
  return total;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let days = {};

  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      days[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`
    } else {
      days[day] = 'CLOSED';
    }
  });

  if (dayName !== undefined) {
    return { [dayName]: days[dayName] };
  }
  return days;
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
