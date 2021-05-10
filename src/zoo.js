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

const { species, employees, hours, prices } = data;

function getSpeciesByIds(...ids) {
  return species.filter((animal) => ids.some((id) => id === animal.id));
}
function getAnimalsOlderThan(animal, age) {
  return species.some((obj) => obj.name === animal && obj.residents.every((resident) => resident.age > age));
}

/* pergunta sobre setar o ud no paramentro */function getEmployeeByName(employeeName) {
  return !employeeName ? {} : employees.filter((funcionario) => funcionario.firstName === employeeName || funcionario.lastName === employeeName)[0];
}
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((funcionario) => funcionario.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  if (!specie) {
    const animais = species.map((animal) => [animal.name, animal.residents.length]);
    return animais.reduce((acc, value) => {
      const [ani, quant] = value;
      acc[ani] = quant;
      return acc;
    }, {});
  }
  return species.find((animal) => animal.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, value) => acc + (prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
}
function getSchedule(dayName) {
  const dia = {}; 

  if (!dayName) {
    const dias = Object.keys(hours);
    const horas = Object.values(hours);
    for (let index = 0; index < dias.length - 1; index += 1) {
      dia[dias[index]] = `Open from ${horas[index].open}am until ${horas[index].close - 12}pm`;
    }
    dia.Monday = 'CLOSED';
    return dia;
  }
  if (dayName === 'Monday') {
    dia.Monday = 'CLOSED';
    return dia;
  }
  /* alberto */
  dia[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  return dia;
}

console.log(getSchedule('Monday'));

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
