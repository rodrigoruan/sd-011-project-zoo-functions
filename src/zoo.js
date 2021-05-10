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
const { employees, prices, species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((spec) => ids.some((id) => id === spec.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((specie) => animal === specie.name).residents.every((specie) => specie.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees.find((people) => employeeName === people.firstName || employeeName === people.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((employ) => employ.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const object = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(object);
}

function countAnimals(spe) {
  // seu código aqui
  if (spe) {
    return data.species.find(({ name }) => name === spe).residents.length;
  }
  return data.species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
}
countAnimals();

function calculateEntry(entrants = {}) {
  // seu código aqui
  let result = 0;
  const {
    Senior = 0,
    Adult = 0,
    Child = 0,
  } = entrants;
  result += Senior * data.prices.Senior;
  result += Adult * data.prices.Adult;
  result += Child * data.prices.Child;
  return result;
}

function getAnimalMap(options) {
  // seu código aqui
}

function formatHourFrom24to12(hourIn24) {
  if (hourIn24 <= 12) {
    return `${hourIn24}am`;
  }
  return `${hourIn24 - 12}pm`;
}
function sigleDayScheduleString(daySchedule) {
  if (daySchedule.close - daySchedule.open <= 0) {
    return 'CLOSED';
  }
  return `Open from ${formatHourFrom24to12(daySchedule.open)} until ${formatHourFrom24to12(daySchedule.close)}`;
}
function getSchedule(dayName) {
  const schedule = data.hours;

  if (dayName) {
    return { [dayName]: schedule[dayName] };
  }

  const keysSchedule = Object.keys(schedule);

  keysSchedule.forEach((day) => {
    schedule[day] = sigleDayScheduleString(schedule[day]);
  });

  return schedule;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const responsible = data.employees.find((employee) => employee.id === id);
  const allAnimalsFromFirstSpecies = data.species.find((specie) => specie.id === responsible.responsibleFor[0]);
  const { age, name, sex } = allAnimalsFromFirstSpecies.residents.reduce((acc, curr) => (curr.age > acc.age ? curr : acc), { age: 0 });

  return [name, sex, age];
}

// requisito 12
const modifyNumber = (number, modifier) => Math.round(number * modifier * 100) / 100;

const increasePrices = (percentage) => {
  const modifier = 1 + (percentage / 100);

  Object.keys(prices).forEach((key) => {
    prices[key] = modifyNumber(prices[key], modifier);
  });
  return prices;
};

function singleCoverage(employee) {
  const responsabile = [];

  employee.responsibleFor.forEach((id) => {
    responsabile.push(data.species.find((speci) => speci.id === id).name);
  });
  return responsabile;
}
function getEmployeeCoverage(idOrName) {
  const employeeCoverage = {};

  if (idOrName) {
    const employee = data.employees.find(({ id, firstName, lastName }) => id === idOrName || firstName === idOrName || lastName === idOrName);

    const fullName = `${employee.firstName} ${employee.lastName}`;

    employeeCoverage[fullName] = singleCoverage(employee);

    return employeeCoverage;
  }

  for (let employee of data.employees) {
    const fullName = `${employee.firstName} ${employee.lastName}`;

    employeeCoverage[fullName] = singleCoverage(employee);
  }

  return employeeCoverage;
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
