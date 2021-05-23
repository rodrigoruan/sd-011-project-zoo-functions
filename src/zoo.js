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
const { employees, animals, hours } = require('./data');
const { prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((actualId) => (animals.find((animal) => actualId === animal.id)));
}

// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce'))

function getAnimalsOlderThan(animal, age) {
  const especie = data.animals.find((specie) => specie.name === animal);
  return especie.residents.every((obj) => obj.age > age);
}

// console.log(getAnimalsOlderThan('lions', 12))

function getEmployeeByName(name) {
  let employee = data.employees.find((emp) => emp.firstName === name || emp.lastName === name);
  if (!name) employee = {};
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalNum() {
  return data.animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
}

function countAnimals(species) {
  const countAnimalSpecies = animalNum();
  if (!species) return countAnimalSpecies;
  return countAnimalSpecies[species];
}

console.log(countAnimals())

function calculateEntry(entrants) {
  if (!entrants) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (data.prices.Adult * Adult) + (data.prices.Child * Child) + (data.prices.Senior * Senior);
}

// function getAnimalMap(options) {
//   // seu código aqui
// }

function getSchedule(day) {
  const objResult = {};
  if (day && day !== 'Monday') {
    objResult[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    return objResult;
  }
  if (day === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
}

console.log(getSchedule('Wednesday'));

function getOldestFromFirstSpecies(id) {
  const helper = data.employees.find((person) => person.id === id).responsibleFor[0];
  const answer = data.animals.find((creature) => creature.id === helper).residents
    .sort((creature1, creature2) => creature2.age - creature1.age)[0];
  return [answer.name, answer.sex, answer.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const arrayOptions = Object.keys(prices);
  const porcentagem = 1 + (percentage / 100);
  arrayOptions.forEach((currentValue) => {
    prices[currentValue] = (Math.round((prices[currentValue] * porcentagem) * 100)) / 100;
  });
}

const consultAnimalsById = (...arr) => (
  arr.map((id) => animals.find((animal) => animal.id === id)).map((specie) => specie.name)
);

const returnEmployee = (par) => {
  const fullName = `${par.firstName} ${par.lastName}`;
  return { [fullName]: consultAnimalsById(...par.responsibleFor) };
};

function getEmployeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return employees.reduce((acc, act) => Object.assign(acc, returnEmployee(act)), {});
  }
  const findEmployee = employees.find((element) => element.id === idOrName
      || element.firstName === idOrName || element.lastName === idOrName);
  return { ...returnEmployee(findEmployee) };
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  // getAnimalMap,
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
