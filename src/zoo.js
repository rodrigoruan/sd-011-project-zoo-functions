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
  return species.filter((specie) => ids.some((id) => specie.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return species.find((specie) => specie.name === animal).residents.every((specie) => specie.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((pessoa) => pessoa.firstName === employeeName || pessoa.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((pessoa) => pessoa.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push(({ id, firstName, lastName, managers, responsibleFor }));
}

function countAnimals(animal) {
  if (animal === undefined) {
    const count = {};
    species.forEach((specie) => { count[specie.name] = specie.residents.length; });
    return count;
  }
  return species.find((specie) => (specie.name === animal)).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acc, curr) => acc + entrants[curr] * prices[curr], 0);
}

function getAnimalMap(options) {
}

function getSchedule(dayName) {
  let schedule = {};

  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') schedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    else schedule[day] = 'CLOSED';
  });

  if (dayName) {
    return { [dayName]: schedule[dayName] };
  }
  return schedule;
}

function getOldestFromFirstSpecies(id) {
  const firstSpecie = employees.find((pessoa) => pessoa.id === id).responsibleFor[0];
  const animais = species.filter((specie) => specie.id === firstSpecie)[0].residents;
  const ages = [];
  animais.forEach((animal) => ages.push(animal.age));
  const oldAge = ages.reduce((acc, curr) => {
    if (acc > curr) return acc;
    return curr;
  }, 0);
  const string = animais.find((animal) => animal.age === oldAge);
  return Object.values(string);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((visit) => {
    prices[visit] = Math.round((prices[visit] + prices[visit] * (percentage / 100)) * 100) / 100;
  });
}

function animalPessoa(idOrName) {
  const pessoa = employees.find(({ firstName, lastName, id }) => firstName === idOrName || lastName === idOrName || id === idOrName);
  const animais = pessoa.responsibleFor.map((id) => species.find((animal) => animal.id === id).name);
  return { [`${pessoa.firstName} ${pessoa.lastName}`]: animais };
}

function getEmployeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const pessoasEanimais = {};
    employees.forEach(({ id }) => Object.assign(pessoasEanimais, animalPessoa(id)));
    return pessoasEanimais;
  }
  return animalPessoa(idOrName);
}
console.log(getEmployeeCoverage());
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
