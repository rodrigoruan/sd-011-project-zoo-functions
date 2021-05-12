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

const { species, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((especie) => ids.includes(especie.id));
}

function getAnimalsOlderThan(animal, age) {
  const findName = data.species.find((bichos) => bichos.name === animal);
  return findName.residents.every((idade) => idade.age > age);
}

function getEmployeeByName(employeeName) {
  const result = data.employees.reduce((acc, employ) => {
    if (employeeName === employ.lastName || employeeName === employ.firstName) {
      return employ;
    }
    return acc;
  }, {});
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    firstName: personalInfo.firstName,
    id: personalInfo.id,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((manager) => manager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(speciess) {
  const specieName = data.species.find((animals) => speciess === animals.name);
  const speciesNames = data.species.reduce((acc, animais) => {
    acc[animais.name] = animais.residents.length;
    return acc;
  }, {});
  if (speciess === undefined) {
    return speciesNames;
  }
  return specieName.residents.length;
}

function calculateEntry(entrants) {
  let total = 0;

  for (let value in entrants) {
    if (Object.keys(entrants)[value] === Object.keys(data.prices)[value]) {
      total += entrants[value] * data.prices[value];
    }
  }
  return total;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const days = data.hours;
  const horarios = {
    Friday: `Open from ${days.Friday.open}am until ${days.Friday.close - 12}pm`,
    Monday: 'CLOSED',
    Saturday: `Open from ${days.Saturday.open}am until ${days.Saturday.close - 12}pm`,
    Sunday: `Open from ${days.Sunday.open}am until ${days.Sunday.close - 12}pm`,
    Thursday: `Open from ${days.Thursday.open}am until ${days.Thursday.close - 12}pm`,
    Tuesday: `Open from ${days.Tuesday.open}am until ${days.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${days.Wednesday.open}am until ${days.Wednesday.close - 12}pm`,
  };

  for (let day in horarios) {
    if (dayName === day) {
      return { [day]: horarios[day] };
    }
  }
  return horarios;
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
