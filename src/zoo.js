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

const { employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((catchSpecies) => ids.some((id) => catchSpecies.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animals) => animals.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((name) => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  if (data.employees.find((name) => (name.id === id)).managers.length === 1) return true;
  return false;
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((acumulator, current) => {
      acumulator[current.name] = current.residents.length;
      return acumulator;
    }, {});
  }
  return data.species.find((animal) => animal.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((acumulator, current) => acumulator + (current[1] * data.prices[current[0]]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let schedule = {};
  Object.keys(data.hours).forEach((day) => {
    schedule[day] = `Open from ${data.hours[day].open}am until ${(data.hours[day].close) - 12}pm`;
    if (day === 'Monday') {
      schedule[day] = 'CLOSED';
    }
  });

  if (dayName !== undefined) {
    return { [dayName]: schedule[dayName] };
  }
  return schedule;
}

function getOldestFromFirstSpecies(id) {
  let employeeId;
  data.employees.forEach((employee) => {
    if (employee.id === id) {
      const [firstSpecie] = employee.responsibleFor;
      employeeId = firstSpecie;
    }
  });
  const specie = getSpeciesByIds(employeeId);
  const ages = specie[0].residents.map((resident) => resident.age);
  const older = Math.max(...ages);
  const oldest = specie[0].residents.find((resident) => resident.age === older);
  return Object.values(oldest);
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((price) => {
    data.prices[price] += data.prices[price] * (percentage / 100);
    data.prices[price] = Math.round(data.prices[price] * 100) / 100;
  });
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
