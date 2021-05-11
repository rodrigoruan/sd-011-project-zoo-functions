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
  return data.species.filter((element) => ids.includes(element.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((element) => animal.includes(element.name)).residents.every((element) => element.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  return employeeName ? data.employees.find((element) => element.firstName === employeeName || element.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  return data.employees.reduce((acc, curr) => `${acc}${curr.managers},`, []).split(',').some((element) => element === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  // https://stackoverflow.com/questions/56195959/return-object-from-map-function-not-array (O QUE ESTE ,acc depois do y.length faz???)
  // const allAnimals = data.species.reduce((acc, { name: x, residents: y }) => (acc[x] = y.length, acc), {});
  let arrayAnimals = {};
  const allAnimals = data.species.forEach((element) => { arrayAnimals[element.name] = element.residents.length; });
  return species ? data.species.find((element) => element.name === species).residents.length : arrayAnimals;
}

function calculateEntry(entrants) {
  // seu código aqui
  return entrants ? Object.keys(entrants).reduce((acc, curr) => acc + (data.prices[curr] * entrants[curr]), 0) : 0;
}

function getAnimalMap(options) {
}

function getSchedule(dayName) {
  // seu código aqui
  let schedule = {};
  Object.entries(data.hours).forEach((element) => {
    if (element[0] === 'Monday') schedule[element[0]] = 'CLOSED';
    else (schedule[element[0]] = `Open from ${element[1].open}am until ${element[1].close - 12}pm`);
  });
  if (!dayName) return schedule;
  let calledDay = Object.entries(schedule).find((element) => element[0] === dayName);
  return { [calledDay[0]]: calledDay[1] }; // https://stackoverflow.com/questions/47395070/how-to-fix-eslint-error-prefer-destructuring
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  let animalID = data.employees.find((element) => element.id === id).responsibleFor[0];
  return Object.values(data.species.find((element) => element.id === animalID)
    .residents
    .reduce((acc, curr) => (acc.age < curr.age ? curr : acc)));
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(data.prices).forEach((element) => { data.prices[element] *= (1 + (percentage / 100)); });
  // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  Object.keys(data.prices).forEach((element) => { data.prices[element] = Math.ceil(data.prices[element] * 100) / 100; });
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
