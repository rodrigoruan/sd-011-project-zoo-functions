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

const getString = (day) => ((day.close - day.open <= 0)
  ? 'CLOSED'
  : `Open from ${day.open}am until ${day.close}pm`);

const getSchedule = (dayName) => {
  const schedule = data.hours;

  if (schedule[dayName].close > 12) schedule[dayName] -= 12;

  if (dayName) return { [dayName]: schedule[dayName] };

  for (let day = 0; day < schedule.length; day += 1) {
    schedule[day] = getString(schedule[day]);
  }

  return schedule;
};

const getOldestFromFirstSpecies = (id) => {
  const responsible = data.employees.find((employee) => employee.id === id);
  const firstAnimalId = data.species.find((species) => species.id === responsible.responsibleFor[0]);
  const { age, name, sex } = firstAnimalId.residents.reduce((acc, curr) => (curr.age > acc.age ? curr : acc), { age: 0 });

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
