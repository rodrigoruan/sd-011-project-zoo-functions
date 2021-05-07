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

const { species, employees, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((animal) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const animalTypeObject = species.find((oneSpecie) => oneSpecie.name === animal);
  return animalTypeObject.residents.every((element) => element.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  return employees.some((person) => person.managers.some((manage) => manage === id) === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function countAnimals(animalName) {
  if (animalName === undefined) {
    return species.reduce((allAnimals, animal) => {
      allAnimals[animal.name] = animal.residents.length;
      return allAnimals;
    }, {});
  }
  const animalSelected = species.find((animal) => animal.name === animalName);
  return animalSelected.residents.length;
}

function calculateEntry(entrants = {}) {
  const entries = [entrants.Adult, entrants.Child, entrants.Senior];
  const validEntry = entries.reduce((justValidEntry, entry) => {
    if (entry === undefined) {
      justValidEntry.push(0);
    } else {
      justValidEntry.push(entry);
    }
    return justValidEntry;
  }, []);
  return validEntry[0] * 49.99 + validEntry[1] * 20.99 + validEntry[2] * 24.99;
}

function getAnimalMap(options) {
  // seu código aqui
}

const printAllSchedule = () => {
  const zooHours = Object.entries(hours);
  return zooHours.reduce((allSchedule, weekDate) => {
    if (weekDate[1].open === 0) {
      allSchedule[weekDate[0]] = 'CLOSED';
    } else {
      allSchedule[weekDate[0]] = `Open from ${weekDate[1].open}am until ${weekDate[1].close - 12}pm`;
    }
    return allSchedule;
  }, {});
};

function getSchedule(dayName) {
  const zooHours = Object.entries(hours);
  if (dayName === undefined) {
    return printAllSchedule();
  }
  const myDate = zooHours.find((weekDate) => weekDate[0] === dayName);
  const objectReturn = {};
  if (myDate[1].open === 0) {
    objectReturn[myDate[0]] = 'CLOSED';
    return objectReturn;
  }
  objectReturn[myDate[0]] = `Open from ${myDate[1].open}am until ${myDate[1].close - 12}pm`;
  return objectReturn;
}

function getOldestFromFirstSpecies(id) {
  const employeeSelected = employees.find((employee) => employee.id === id);
  const animalSelected = species.find((animal) => animal.id === employeeSelected.responsibleFor[0]);
  const oldestOne = animalSelected.residents.reduce((oldestAnimal, animal) => {
    if (oldestAnimal.age > animal.age) {
      return oldestAnimal;
    }
    return animal;
  });
  return [oldestOne.name, oldestOne.sex, oldestOne.age];
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
