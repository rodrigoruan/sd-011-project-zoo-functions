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

const { species: animalSpecies, employees, prices, hours } = require('./data');

const getSpeciesByIds = (...ids) => animalSpecies.filter((value) => ids.includes(value.id));

const getAnimalsOlderThan = (animal, age) => animalSpecies.find(((value) => value.name === animal)).residents.every((value) => value.age >= age);

const getEmployeeByName = (employeeName) => ((!employeeName) ? {}
  : employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName));

const createEmployee = (typealInfo, associatedWith) => ({ ...typealInfo, ...associatedWith });

const isManager = (id) => employees.some(({ managers }) => managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => employees.push({ id, firstName, lastName, managers, responsibleFor });

const countAnimals = (species) => ((species)
  ? animalSpecies.find(({ name }) => name === species).residents.length
  : animalSpecies.reduce((acc, { name, residents }) => ({ ...acc, [name]: residents.length }), {}));

function calculateEntry(entrants) {
  if (!entrants) return 0;

  return Object.entries(entrants).reduce((fee, [type, qtt]) => fee + prices[type] * qtt, 0);
}

const getAnimalMap = (options) => {
  // seu código aqui
};

const getString = (daySchedule) => {
  const format = (hour) => ((hour <= 12) ? `${hour}am` : `${hour - 12}pm`);

  return (daySchedule.close - daySchedule.open <= 0) ? 'CLOSED'
    : `Open from ${format(daySchedule.open)} until ${format(daySchedule.close)}`;
};

const getSchedule = (dayName) => {
  const schedule = hours;

  if (dayName) return { [dayName]: schedule[dayName] };

  const scheduleKeys = Object.keys(schedule);

  scheduleKeys.forEach((day) => { schedule[day] = getString(schedule[day]); });

  return schedule;
};

const getOldestFromFirstSpecies = (id) => {
  const { name, sex, age } = animalSpecies.find((specie) => specie.id === employees.find((employee) => employee.id === id).responsibleFor[0]).residents.reduce((acc, curr) => (curr.age > acc.age ? curr : acc), { age: 0 });

  return [name, sex, age];
};

// tive que usar Math.round, usando toFixed dá erro de 1 centavo
const increasePrices = (percentage) => Object.keys(prices).forEach((priceKey) => { prices[priceKey] = Math.round(prices[priceKey] * (1 + percentage / 100) * 100) / 100; });

const getEmployeeCoverage = (idOrName) => {
  let filteredEmployees = employees;

  if (idOrName) {
    const hasName = getEmployeeByName(idOrName);
    filteredEmployees = hasName ? [hasName] : [employees.find((employee) => employee.id === idOrName)];
  }

  const employeesWithSpecies = filteredEmployees.reduce((coverage, employee) => ({ ...coverage, [`${employee.firstName} ${employee.lastName}`]: employee.responsibleFor, }), {});

  Object.entries(employeesWithSpecies).forEach(([key, animalsId]) => { employeesWithSpecies[key] = animalsId.map((animalId) => animalSpecies.find((specie) => specie.id === animalId).name); });

  return employeesWithSpecies;
};

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
