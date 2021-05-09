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
  return data.species.filter((specie) => (
    [...ids].includes(specie.id)
  ));
}

function getAnimalsOlderThan(animal, age) {
  const animalResidents = data.species.find((specie) => (
    animal.includes(specie.name)
  )).residents;
  return animalResidents.every((penguin) => penguin.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  return data.employees.find((employee) => (
    employeeName.includes(employee.firstName) || employeeName.includes(employee.lastName)
  ));
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const employee = data.employees.find((person) => (
    person.managers.includes(id)
  ));
  return employee !== undefined;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (species) {
    return data.species.find((animal) => species.includes(animal.name)).residents.length;
  }
  return data.species.reduce((animalAcc, { name, residents }) => {
    animalAcc[name] = residents.length;
    return animalAcc;
  }, {});
}

function calculateEntry(entrants = 0) {
  // Source: https://stackoverflow.com/questions/42488048/how-can-i-sum-properties-from-two-objects
  let multiple = 0;
  Object.keys(entrants).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(data.prices, key)) {
      multiple += entrants[key] * data.prices[key];
    }
  });
  return multiple;
}

function getAnimalMap(options) {
  // seu código aqui
}

const converterHour24ToAmPm = (hour) => (
  hour > 12 ? `${hour - 12}pm` : `${hour}am`
);

const hourScheduleDay = (open, close) => {
  if (`Open from ${converterHour24ToAmPm(open)} until ${converterHour24ToAmPm(close)}` === 'Open from 0am until 0am') {
    return 'CLOSED';
  }
  return `Open from ${converterHour24ToAmPm(open)} until ${converterHour24ToAmPm(close)}`;
};

function getSchedule(dayName) {
  let schedule = {};

  if (dayName === undefined) {
    Object.keys(data.hours).forEach((key) => {
      const { open, close } = data.hours[key];
      schedule[key] = hourScheduleDay(open, close);
    });
  } else {
    const { open, close } = data.hours[dayName];
    schedule[dayName] = hourScheduleDay(open, close);
  }

  return schedule;
}

function getOldestFromFirstSpecies(id) {
  const employee = data.employees.filter((person) => (
    id.includes(person.id)
  ))[0];

  const firstSpecieId = employee.responsibleFor[0];

  const residentsFromThisSpecie = data.species.filter((animal) => (
    firstSpecieId.includes(animal.id)
  ))[0].residents;

  // Source: https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
  const oldestAnimal = residentsFromThisSpecie.reduce((prev, current) => (
    prev.age > current.age ? prev : current
  ));

  return Object.values(oldestAnimal);
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
