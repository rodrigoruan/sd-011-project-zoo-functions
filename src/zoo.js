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
  // seu código aqui
  return ids ? data.species.filter(({ id: speciesId }) => ids.some((givenId) => givenId === speciesId)) : [];
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find(({ name: speciesName }) => speciesName === animal).residents.every(({ age: animalAge }) => animalAge > age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  return employeeName ? data.employees.find(({ firstName, lastName }) => (employeeName === firstName || employeeName === lastName)) : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(({ managers }) => managers.some((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  return species ? data.species.find(({ name }) => name === species).residents.length : data.species.reduce(((result, { name: speciesName, residents }) => ({ ...result, [speciesName]: residents.length })), {});
}

function calculateEntry(entrants) {
  // seu código aqui
  return (!entrants || Object.keys(entrants).length === 0) ? 0 : Object.entries(entrants).map((num) => num[1] * data.prices[num[0]]).reduce((result, pricePerAge) => result + pricePerAge, 0);
}

const getSpecies = (region) => data.species.filter(({ location }) => location === region).map(({ name: speciesName }) => speciesName);
const getAniNames = (string, options) => {
  const selecSpecies = data.species.find(({ name }) => name === string);
  let names = {};
  if (options.sex) {
    names = { [string]: selecSpecies.residents.filter((resident) => resident.sex === options.sex).map((resident) => resident.name) };
  } else {
    names = { [string]: selecSpecies.residents.map((resident) => resident.name) };
  }
  if (options.sorted) names[string].sort();
  return names;
};

function getAnimalMap(options = {}) {
  // seu código aqui
  let animalMap = { NE: [], NW: [], SE: [], SW: [] };
  animalMap = Object.keys(animalMap).reduce((result, region) => ({ ...result, [region]: getSpecies(region) }), {});
  if (options.includeNames) {
    animalMap = Object.keys(animalMap).reduce((result, region) => ({ ...result, [region]: animalMap[region].map((string) => getAniNames(string, options)) }), {});
  }
  return animalMap;
}

function getSchedule(dayName) {
  // seu código aqui
  const ifMonday = (string, hour) => ((string === 'Monday') ? { [string]: 'CLOSED' } : { [string]: `Open from ${hour.open}am until ${(hour.close) - 12}pm` });
  return (!dayName) ? Object.entries(data.hours).reduce((result, day) => ({ ...result, ...ifMonday(day[0], day[1]) }), {}) : ifMonday(dayName, data.hours[dayName]);
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const firstCode = data.employees.find(({ id: employeeId }) => employeeId === id).responsibleFor[0];
  return Object.values(data.species.find(({ id: speciesId }) => speciesId === firstCode).residents.reduce((a, b) => (a.age < b.age ? b : a)));
}

function increasePrices(percentage) {
  // seu código aqui
  const sumPercentage = (value) => parseFloat((value + (Math.round(value * percentage) / 100)).toFixed(2));
  data.prices = Object.entries(data.prices).reduce((result, [age, price]) => ({ ...result, [age]: sumPercentage(price) }), {});
}

function getEmployeeCoverage(idOrName = {}) {
  // seu código aqui
  const findResponsabilities = (employee) => employee.responsibleFor.map((responsability) => data.species.find(({ id: speciesId }) => speciesId === responsability).name);
  if (Object.keys(idOrName).length === 0) return data.employees.reduce((result, employee) => ({ ...result, [`${employee.firstName} ${employee.lastName}`]: findResponsabilities(employee) }), {});
  const selecEmployee = data.employees.find(({ id, firstName, lastName }) => id === idOrName || firstName === idOrName || lastName === idOrName);
  return { [`${selecEmployee.firstName} ${selecEmployee.lastName}`]: findResponsabilities(selecEmployee) };
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
