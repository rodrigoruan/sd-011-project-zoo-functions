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
  return data.species.filter((animal) => ids.some((id) => id === animal.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animalName) => animalName.name === animal).residents.every((val) => val.age >= age);
}

function getEmployeeByName(employeeName) {
  return !employeeName ? {} : data.employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // Método 1
  // return {
  // id,
  // firstName,
  // lastName,
  // managers,
  // responsibleFor,
  // }

  // Método 2
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((person) => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  const result = data.species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});

  return (!specie) ? result : result[specie];
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((sum, atual) => sum + (data.prices[atual] * entrants[atual]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // Array com objetos com todos os horários e dias da semana, que indicam abertura
  // e fechamento do zoológico.
  const hours = Object.values(data.hours);
  let weekDays;
  if (!dayName) {
    weekDays = Object.keys(data.hours);
  } else {
    weekDays = [dayName];
  }

  const result = weekDays.reduce((acc, curr, index) => {
    acc[curr] = `Open from ${hours[index].open}am until ${hours[index].close - 12}pm`;
    return acc;
  }, {});

  if (result.Monday) {
    result.Monday = 'CLOSED';
  }
  return result;
}

function getOldestFromFirstSpecies(id) {
  // Parte responsável por capturar o ID do primeiro animal, na qual a pessoa funcionárioa abaixo é responsável.
  const animalId = Object.entries(data.employees).find((person) => person[1].id === id)[1].responsibleFor[0];

  // Retorna a maior idade do animal requisitado!
  const oldAnimal = data.species.find((animal) => animal.id === animalId).residents.reduce((acc, curr) => Math.max(acc, curr.age), 0);

  const result = data.species.find((animal) => animalId === animal.id).residents.reduce((acc, curr) => {
    if (curr.age === oldAnimal) {
      acc.push(curr.name);
      acc.push(curr.sex);
      acc.push(curr.age);
    }
    return acc;
  }, []);

  return result;
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
