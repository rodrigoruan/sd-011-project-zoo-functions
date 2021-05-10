const data = require('./data');

function getSpeciesByIds(...ids) {
  const { species } = data;
  return ids.map((id) => species.find((animal) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const { species } = data;
  return species.find((specieName) => specieName.name === animal).residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const CE = {};
  return Object.assign(CE, personalInfo, associatedWith);
}

function isManager(id) {
  // consulta em https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  const { employees } = data;
  return employees.some((people) => people.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  const numberOfAnimals = data.species.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
  if (species) {
    return numberOfAnimals[species];
}
  return numberOfAnimals;
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
