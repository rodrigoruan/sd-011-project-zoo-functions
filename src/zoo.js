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

const { species, employees } = require("./data");
const data = require("./data");

function getSpeciesByIds(...ids) {
  // seu código aqui
  if (!ids) return [];
  return ids.map((id) => species.find((animal) => id === animal.id));
}

console.log(getSpeciesByIds());

function getAnimalsOlderThan(animal, age) {
  // seu código aqu
  const animalName = species.find((specie) => specie.name === animal);
  return animalName.residents.every((animal) => animal.age >= age);
}
// Filter retornava o residents como objetcs, por isso não acessava. Com find ele acessa todas as infos.
console.log(getAnimalsOlderThan("tigers", 20));

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees.find(
    (name) => name.firstName === employeeName || name.lastName === employeeName
  );
}

console.log(getEmployeeByName());

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  // seu código aqui
  return employees.some((isThereAny) => isThereAny.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(species) {
  // seu código aqui
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
