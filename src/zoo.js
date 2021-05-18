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
  return data.species.filter((species) => ids.includes(species.id));
}

function getAnimalsOlderThan(species, age) {
  return data.species.find(((specie) => specie.name === species)).residents.every((animal) => animal.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};

  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (species) {
    return data.species.find(({ name }) => name === species).residents.length;
  }

  return data.species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
}

function calculateEntry(entrants) {
  let total = 0;

  if (!entrants) {
    return total;
  }

  const entrantKeys = Object.keys(entrants);

  entrantKeys.forEach((key) => { total += data.prices[key] * entrants[key]; });

  return total;
}

function getAnimalMap(options) {
  const animalMap = getBaseMap();

  if (!options || !options.includeNames) {
    return animalMap;
  }

  const { sorted, sex } = options;

  manipulateRegions(animalMap, includeNamesInMap);

  if (sorted) manipulateRegions(animalMap, sortMap);

  if (sex) manipulateRegions(animalMap, filterMapBySex, sex);

  return animalMap;
}

function getSchedule(dayName) {
  const schedule = data.hours;

  if (dayName) {
    return { [dayName]: schedule[dayName] };
  }

  const scheduleKeys = Object.keys(schedule);

  scheduleKeys.forEach((day) => {
    schedule[day] = getSingleDayScheduleString(schedule[day]);
  });

  return schedule;
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
