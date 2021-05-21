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
const { species, employees, hours } = require('./data');

function getSpeciesByIds(ids = [], ids2 = undefined) {
  if (ids !== undefined) {
    const speciesOfAnimals = species.filter((animals) => animals.id === ids);
    if (ids2 !== undefined) {
      const speciesOfAnimals2 = species.filter((animals) => animals.id === ids2);
      return [...speciesOfAnimals, ...speciesOfAnimals2];
    }
    return speciesOfAnimals;
  }
  return ids;
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((el) => el.name.includes(animal))
    .residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName !== undefined) {
    return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
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
  return data.employees.some((el) => el.managers.includes(id));
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

function countAnimals(species0) {
  if (!species0) {
    return data.species.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specie) => specie.name === species0).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((acc, current) => acc + (current[1] * data.prices[current[0]]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const schedule = {
    Monday: 'CLOSED',
    Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close - 12}pm`,
    Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
    Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
  };
  if (!dayName) {
    return schedule;
  }
  return { [dayName]: schedule[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const specieId = data.employees.find((employeeId) => employeeId.id.includes(id)).responsibleFor[0];
  const residentsList = data.species.find((speci) => speci.id.includes(specieId)).residents;
  const result = residentsList.sort((a, b) => a.age - b.age).splice(-1);
  return result.reduce((acc, re) => Object,value(re), []);
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
  let obj = {};

  if (!idOrName) {
    data.employees.forEach((employee) => { obj[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((animal) => data.species.find(({id }) => id === animal).name); });
  } else {
    const employeeResponsabity = data.employees.find(({ id, firstName, lastName}) => idOrName === id || idOrName === firstName || idOrName === lastName);

    obj[`${employeeResponsabity.firstName} ${employeeResponsabity.lastName}`] = employeeResponsabity.responsibleFor.map((animal) => data.species.find(({ id}) => animal === id).name);
  }
  return obj;
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
