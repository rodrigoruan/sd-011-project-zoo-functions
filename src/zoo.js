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
  const arrayOfAnimals = data.species;

  return ids.length === 0 ? [] : arrayOfAnimals.filter((animal, index) => animal.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  const arrayOfAnimals = data.species;
  const animalObject = arrayOfAnimals.find((object) => object.name === animal);

  return animalObject.residents.every((element) => element.age > age);
}

function getEmployeeByName(employeeName) {
  const arrayOfEmployees = data.employees;
  const findEmployee = () => arrayOfEmployees.find((employer) => employer.firstName === employeeName || employer.lastName === employeeName);
  return employeeName === undefined ? {} : findEmployee();
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const arrayOfEmployees = data.employees;
  const arrayOfManagers = arrayOfEmployees.map((person) => person.managers);
  return arrayOfManagers.some((employer, index) => employer[index] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const arrayOfEmployees = data.employees;
  if (managers === undefined) {
    managers = [];
  } if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  arrayOfEmployees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  const arrayOfAnimals = data.species;
  if (species === undefined) {
    return ({
      lions: arrayOfAnimals.find((animal) => animal.name === 'lions').residents.length,
      tigers: arrayOfAnimals.find((animal) => animal.name === 'tigers').residents.length,
      bears: arrayOfAnimals.find((animal) => animal.name === 'bears').residents.length,
      penguins: arrayOfAnimals.find((animal) => animal.name === 'penguins').residents.length,
      otters: arrayOfAnimals.find((animal) => animal.name === 'otters').residents.length,
      frogs: arrayOfAnimals.find((animal) => animal.name === 'frogs').residents.length,
      snakes: arrayOfAnimals.find((animal) => animal.name === 'snakes').residents.length,
      elephants: arrayOfAnimals.find((animal) => animal.name === 'elephants').residents.length,
      giraffes: arrayOfAnimals.find((animal) => animal.name === 'giraffes').residents.length,
    });
  } return arrayOfAnimals.find((animal) => animal.name === species).residents.length;
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
