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

const { species, employees } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) => data.species.filter((value) => ids.includes(value.id));

const getAnimalsOlderThan = (animal, age) => data.species.find(((value) => value.name === animal)).residents.every((value) => value.age >= age);

const getEmployeeByName = (employeeName) => ((!employeeName)
  ? {}
  : data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName));

const createEmployee = (typealInfo, associatedWith) => ({ ...typealInfo, ...associatedWith });

const isManager = (id) => data.employees.some(({ managers }) => managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => data.employees.push({ id, firstName, lastName, managers, responsibleFor });

const countAnimals = (specie) => ((specie)
  ? data.species.find(({ name }) => name === specie).residents.length
  : data.species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {}));

function calculateEntry(entrants) {
  let total = 0;

  if (entrants) {
    const entrantKeys = Object.keys(entrants);
    entrantKeys.forEach((value) => { total += data.prices[value] * entrants[value]; });
  }

  return total;
}

const getAnimalMap = (options) => {
  // seu código aqui
};

const getSchedule = (dayName) => {
  const schedule = data.hours;

  if (dayName) {
    return { [dayName]: schedule[dayName] };
  }

  const scheduleKeys = Object.keys(schedule);

  const getString = (daySchedule) => {
    const format = (hour) => ((hour <= 12) ? `${hour}am` : `${hour - 12}pm`);

    return (daySchedule.close - daySchedule.open <= 0) ? 'CLOSED'
      : `Open from ${format(daySchedule.open)} until ${format(daySchedule.close)}`;
  };

  scheduleKeys.forEach((day) => schedule[day] = getString(schedule[day]));

  return schedule;
};

const getOldestFromFirstSpecies = (id) => {
  const { age, name, sex } = data.species.find((specie) => specie.id === data.employees.find((employee) => employee.id === id).responsibleFor[0]).residents.reduce((acc, curr) => (curr.age > acc.age ? curr : acc), { age: 0 });

  return [name, sex, age];
};

const increasePrices = (percentage) => {
  // seu código aqui
};

const getEmployeeCoverage = (idOrName) => {
  // seu código aqui
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
