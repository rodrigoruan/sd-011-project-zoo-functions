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

const getSpeciesByIds = (...ids) => (ids ? data.species.filter((curr, index) => curr.id === ids[index]) : []);

const getAnimalsOlderThan = (animal, age) => {
  const currentAnimal = data.species.find((curr) => curr.name === animal);
  return currentAnimal.residents.every((curr) => curr.age >= age);
};

const getEmployeeByName = (employeeName) => (employeeName ? data.employees.find((name) => name.firstName === employeeName || name.lastName === employeeName) : {});

const createEmployee = (personalInfo, associatedWith) => {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
};

const isManager = (id) => data.employees.some((curr) => curr.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => data.employees.push({ id, firstName, lastName, managers, responsibleFor });

const countAnimals = (species) => {
  if (species === undefined) {
    return data.species.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((animal) => animal.name === species).residents.length;
};

const calculateEntry = (entrants) => (entrants ? Object.keys(entrants).reduce((acc, curr) => acc + (entrants[curr] * data.prices[curr]), 0) : 0);

function getAnimalMap(options) {
  // seu código aqui
}

const getSchedule = (dayName) => {
  const schedules = {};
  const dataHours = Object.keys(data.hours);

  dataHours.forEach((day) => {
    const openHour = data.hours[day].open;
    const closeHour = data.hours[day].close - 12;

    if (data.hours[day].open === 0 && data.hours[day].close === 0) {
      schedules[day] = 'CLOSED';
    } else {
      schedules[day] = `Open from ${openHour}am until ${closeHour}pm`;
    }
  });

  if (!dayName) {
    return schedules;
  }
  return { [dayName]: schedules[dayName] };
};

function getOldestFromFirstSpecies(id) {
  const getResponsibleFordata = data.employees.find((employ) => employ.id === id);
  const getFirtSpecieId = data.species.find((animal) => animal.id === getResponsibleFordata.responsibleFor[0]);
  const getOlderAgeAnimal = getFirtSpecieId.residents.sort((a, b) => b.age - a.age);

  return Object.values(getOlderAgeAnimal[0]);
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
