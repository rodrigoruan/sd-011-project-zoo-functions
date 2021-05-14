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

function getAnimalsOlderThan(animal, age) {
  return data.species.find(((element) => element.name === animal)).residents.every((species) => species.age >= age);
}

function getEmployeeByName(employeeName) {
  const collaborator = data.employees.find((items) => items.firstName === employeeName || items.lastName === employeeName);
  if (collaborator !== undefined) {
    return collaborator;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  const employees = data.employees.map((values) => values.managers);
  const manager = employees.some((items) => items.some((value) => value === id));
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
  return data.employees;
}

function countAnimals(species1) {
  if (!species1) {
    return data.species.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specie) => specie.name === species1).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants)
    .reduce((acc, current) => acc + (current[1] * data.prices[current[0]]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const schedule = {
    Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close - 12}pm`,
    Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
    Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return schedule;
  }
  return {
    [dayName]: schedule[dayName],
  };
}

function getOldestFromFirstSpecies(id) {
  const employeeId = data.employees.find((value) => value.id === id);
  const firstEspecies = employeeId.responsibleFor[0];
  const infoEspecies = data.species.find((value) => value.id === firstEspecies);
  const sortAge = infoEspecies.residents.sort((age1, age2) => age2.age - age1.age);
  return [sortAge[0].name, sortAge[0].sex, sortAge[0].age];
}

function increasePrices(percentage) {
  const adult = ((data.prices.Adult / 100) * percentage) + data.prices.Adult + 0.001;
  const child = ((data.prices.Child / 100) * percentage) + data.prices.Child + 0.001;
  const senior = ((data.prices.Senior / 100) * percentage) + data.prices.Senior + 0.001;
  data.prices.Adult = Number(adult.toFixed(2));
  data.prices.Child = Number(child.toFixed(2));
  data.prices.Senior = Number(senior.toFixed(2));
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
