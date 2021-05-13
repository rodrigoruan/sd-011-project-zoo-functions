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

const { employees, prices, species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((specie) => ids.some((id) => id === specie.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((specie) => animal === specie.name).residents.every((specie) => specie.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees.find((pessoas) => employeeName === pessoas.firstName || employeeName === pessoas.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((employ) => employ.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const objt = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(objt);
}

function countAnimals(specie) {
  // seu código aqui
  if (!specie) {
    return data.species.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }

  return data.species.find((spec) => spec.name === specie).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants || Object.keys(entrants).length === 0) return 0;

  return Object.keys(entrants)
    .reduce((acc, people) => acc + entrants[people] * data.prices[people], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  const agenda = {};
  Object.keys(data.hours).forEach((day) => {
    if (day !== 'Monday') agenda[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    else agenda[day] = 'CLOSED';
  });
  if (dayName) {
    return { [dayName]: agenda[dayName] };
  } return agenda;
}

function getOldestFromFirstSpecies(idFuncionario) {
  // seu código aqui
  const compareId = data.employees.find((employe) => employe.id === idFuncionario).responsibleFor[0];
  const oldAnimal = data.species.find((animais) => animais.id === compareId).residents.sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = oldAnimal;

  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  const calcule = (percentage / 100) + 1;
  const pricePeople = data.prices;

  Object.keys(pricePeople).forEach((price) => { pricePeople[price] = Math.round((pricePeople[price] * calcule) * 100) / 100; });

  return pricePeople;
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
