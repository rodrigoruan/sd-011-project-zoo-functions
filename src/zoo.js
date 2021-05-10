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
  // seu código aqui
  if (!ids) return [];
  return data.species.filter((species) => ids.includes(species.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const animals = data.species.find((specie) => specie.name === animal);
  return animals.residents.every((obj) => obj.age > age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees.find((emplooyee) => emplooyee.firstName === employeeName || emplooyee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((employee) => employee.managers.some((em) => em === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  if (!species) {
    return data.species.reduce((accumulator, current) => {
      accumulator[current.name] = current.residents.length;
      return accumulator;
    }, {});
  }
  return data.species.find((animal) => animal.name === species).residents
    .length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (data.prices.Child * Child + data.prices.Senior * Senior + data.prices.Adult * Adult);
}

function getAnimalMap(options) {
  // seu código aqui
}

const formatTimeShow = (h24) => {
  var h = h24 % 12;
  if (h === 0) h = 12;
  return (h < 10 ? '' : '') + h + (h24 < 12 ? 'am' : 'pm');
};

function getSchedule(dayName) {
  const days = data.hours;
  const workingHours = Object.keys(days);
  if (dayName) {
    return { [dayName]: days[dayName] };
  }
  const getOneDay = (day) => {
    if (day.open === 0) return 'CLOSED';
    return `Open from ${formatTimeShow(day.open)} until ${formatTimeShow(day.close)}`;
  };

  workingHours.forEach((day) => { (days[day] = getOneDay(days[day])); });
  return days;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const responsibleFor = data.employees.find((el) => el.id === id).responsibleFor[0];
  const animal = data.species.find((el) => el.id === responsibleFor).residents.sort((a, b) => b.age - a.age)[0];
  return [animal.name, animal.sex, animal.age];
}

function increasePrices(percentage) {
  const prices = Object.keys(data.prices);
  let porcentagem = (1 + percentage / 100);
  prices.forEach((element) => { data.prices[element] = Math.round((data.prices[element] * porcentagem) * 100) / 100; });
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
