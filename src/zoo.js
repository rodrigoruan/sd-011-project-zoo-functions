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

const { species, employees } = data;

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
console.log(countAnimals());

function calculateEntry(entrants) {
}
/* console.log(calculateEntry());
 */
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
