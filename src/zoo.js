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
  if (ids.length === 0) return [];
  return data.species.filter((element) => ids.includes(element.id));
}

function getAnimalsOlderThan(animal, age) {
  let residents;
  data.species.forEach((element) => {
    if (element.name === animal) residents = element.residents;
  });
  return residents.every((element) => element.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find((element) => element.firstName === employeeName
    || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  let managersId = [];
  data.employees.forEach((element) => managersId.push(...element.managers));
  return managersId.includes(id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push(createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));
}

function countAnimals(species) {
  if (species === undefined) {
    let obj = {};
    data.species.forEach((element) => {
      obj[`${element.name}`] = countAnimals(element.name);
    });
    return obj;
  }
  let count = 0;
  data.species.forEach((element) => {
    if (element.name.includes(species)) {
      count += element.residents.length;
    }
  });
  return count;
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return Adult * 49.99 + Child * 20.99 + Senior * 24.99;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const objDay = data.hours[`${dayName}`];
  if (dayName === undefined) {
    let obj = {};
    const objDataKey = Object.keys(data.hours);
    objDataKey.forEach((element) => {
      obj[`${element}`] = getSchedule(element)[`${element}`];
    });
    return obj;
  }
  if (dayName === 'Monday') return { [dayName]: 'CLOSED' };
  return { [dayName]: `Open from ${objDay.open}am until ${objDay.close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  const employeeData = data.employees.find((employeeId) => employeeId.id === id);
  const specieId = employeeData.responsibleFor[0];
  const animalResidents = data.species.find((animalsId) => animalsId.id === specieId).residents;
  const orderAnimals = animalResidents.sort((a, b) => b.age - a.age)[0];

  return [orderAnimals.name, orderAnimals.sex, orderAnimals.age];
}

function increasePrices(percentage) {
  const perc = percentage / 100;

  data.prices.Adult = Math.round(data.prices.Adult * (1 + perc) * 100) / 100;
  data.prices.Senior = Math.round(data.prices.Senior * (1 + perc) * 100) / 100;
  data.prices.Child = Math.round(data.prices.Child * (1 + perc) * 100) / 100;
}
// const data = require('./data');

function getEmployeeCoverage(idOrName) {
  if (idOrName === undefined) {
    let obj = {};
    data.employees.forEach((element) => {
      obj[`${element.firstName} ${element.lastName}`] = getEmployeeCoverage(element.id)[`${element.firstName} ${element.lastName}`];
    });
    return obj;
  }
  const employeesData = data.employees.find((element) => element.firstName === idOrName
    || element.id === idOrName
    || element.lastName === idOrName);
  const animalsId = employeesData.responsibleFor;
  let animalsName = [];
  animalsId.forEach((elementFE) => animalsName.push(data.species.find((element) => element.id.includes(elementFE)).name));
  return { [`${employeesData.firstName} ${employeesData.lastName}`]: animalsName };
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
