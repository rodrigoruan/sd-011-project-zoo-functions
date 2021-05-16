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
  return data.species.filter((specie, index) => specie.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((specie) => specie.name === animal).residents.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((emp) => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((emp) => emp.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(animal) {
  if (!animal) {
    const cutes = {};
    data.species.forEach((specie) => {
      cutes[specie.name] = specie.residents.length;
    });
    return cutes;
  }
  return data.species.find((specie) => specie.name === animal).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const horas = Object.values(data.hours);
  let diasSemana;
  if (!dayName) {
    diasSemana = Object.keys(data.hours);
  } else {
    diasSemana = [dayName];
  }
  const resultado = diasSemana.reduce((acc, curr, index) => {
    acc[curr] = `Open from ${horas[index].open}am until ${horas[index].close - 12}pm`;
    return acc;
  }, {});
  if (resultado.Monday) {
    resultado.Monday = 'CLOSED';
  }
  return resultado;
}

function getOldestFromFirstSpecies(id) {
  const getId = data.employees.find((emp) => emp.id === id).responsibleFor[0];
  const getAnimal = data.species.filter((animal) => animal.id === getId)[0].residents;
  const getAge = getAnimal.reduce((acc, curr) => Math.max(acc, curr.age), 0);
  const getAnimalAge = getAnimal.find((animal) => animal.age === getAge);
  return Object.values(getAnimalAge);
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
