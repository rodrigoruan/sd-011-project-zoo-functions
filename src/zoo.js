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
const { TestScheduler } = require('@jest/core');
const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((checkId, index) => checkId.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  const animalList = species.find((animals) => animals.name === animal);
  return animalList.residents.every((item) => item.age > age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName === true) {
    return {};
  }
  return employees.find((item) => (item.firstName === employeeName || item.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  return employees.some((subject) => subject.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species1) {
  if (!species1 === true) {
    let animalObj = {};
    species.forEach((animal) => {
      animalObj[animal.name] = animal.residents.length;
    });
    return animalObj;
  }
  return species.find((animal) => animal.name === species1).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants === true) {
    return 0;
  }
  let adultPrice = prices.Adult * entrants.Adult;
  let seniorPrice = prices.Senior * entrants.Senior;
  let childPrice = prices.Child * entrants.Child;
  if (!entrants.Adult === true) {
    adultPrice = 0;
  }
  if (!entrants.Senior === true) {
    seniorPrice = 0;
  }
  if (!entrants.Child === true) {
    childPrice = 0;
  }
  return adultPrice + seniorPrice + childPrice;
}

function getAnimalMap(options) {
}

function getSchedule(dayName) {
  const allDays = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return allDays;
  }
  const day = dayName;
  let schedule = {};
  schedule[day] = allDays[day];
  return schedule;
}

function getOldestFromFirstSpecies(id) {
  const specie = employees.find((item) => item.id === id).responsibleFor[0];
  const animals = species.find((item) => item.id === specie);
  let oldest = 0;
  animals.residents.filter((older) => older.age === oldest);
  animals.residents.forEach((animalList) => {
    if (animalList.age > oldest) {
      oldest = animalList.age;
    }
  });
  return Object.values(animals.residents.find((older) => older.age === oldest));
}

function increasePrices(percentage) {
  const raiseFactor = (percentage / 100) + 1;
  prices.Adult = Math.round(prices.Adult * raiseFactor * 100) / 100;
  prices.Senior = Math.round(prices.Senior * raiseFactor * 100) / 100;
  prices.Child = Math.round(prices.Child * raiseFactor * 100) / 100;
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    let nameList = {};
    employees.forEach((employee) => {
      nameList[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((eachId) => species.find((animal) => animal.id === eachId).name);
    });
    return nameList;
  }

  if (employees.some((isId) => isId.id === idOrName)) {
    let nameList = {};
    const currentEmployee = employees.find((employee) => employee.id === idOrName);
    nameList[`${currentEmployee.firstName} ${currentEmployee.lastName}`] = currentEmployee.responsibleFor.map((eachId) => species.find((animal) => animal.id === eachId).name);
    return nameList;
  }

  if (employees.some((isFirstName) => isFirstName.firstName === idOrName)) {
    let nameList = {};
    const currentEmployee = employees.find((employee) => employee.firstName === idOrName);
    nameList[`${currentEmployee.firstName} ${currentEmployee.lastName}`] = currentEmployee.responsibleFor.map((eachId) => species.find((animal) => animal.id === eachId).name);
    return nameList;
  }

  if (employees.some((isLastName) => isLastName.lastName === idOrName)) {
    let nameList = {};
    const currentEmployee = employees.find((employee) => employee.lastName === idOrName);
    nameList[`${currentEmployee.firstName} ${currentEmployee.lastName}`] = currentEmployee.responsibleFor.map((eachId) => species.find((animal) => animal.id === eachId).name);
    return nameList;
  }
}
console.log(getEmployeeCoverage('Stephanie'));

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
