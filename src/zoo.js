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

const dataAny = data.species;
const allEmployees = data.employees;
function getSpeciesByIds(...ids) {
  return dataAny.filter((elemento) => ids.includes((elemento.id)));
}

function getAnimalsOlderThan(animal, age) {
  const infoAnimal = dataAny.filter((animalList) => animalList.name === animal).reduce((acc, elem) => elem.residents.age >= age);
  const verifyAges = infoAnimal.residents.every((value) => value.age >= age);
  return verifyAges;
}

function getEmployeeByName(employeeName = {}) {
  const getEmployee = allEmployees.filter((employeer) => employeer.firstName === employeeName || employeer.lastName === employeeName);
  const returnValue = getEmployee.length > 0 ? getEmployee[0] : {};
  return returnValue;
}

function createEmployee(personalInfo, associatedWith) {
  // const { firstName, id, lastName } = personalInfo;
  // const { managers, responsibleFor } = associatedWith;
  // return { firstName: firstName, id: id, lastName: lastName, managers: managers, responsibleFor: responsibleFor };
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return allEmployees.filter((element) => element.managers.some((elem) => elem === id)).length > 0;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push(createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));
}

function countAnimals(species = {}) {
  if (species.length > 0) {
    const getInfo = dataAny.filter((animal) => animal.name === species).reduce((act, prox) => prox.residents);
    return getInfo.residents.length;
  }
  const allInfos = dataAny.reduce(function (ant, now) {
    ant[now.name] = now.residents.length;
    return ant;
  }, {});
  return allInfos;
}

function calculateEntry(entrants = 0) {
  let total = 0;
  const getKeys = Object.keys(entrants);
  getKeys.forEach((pess) => { total += data.prices[pess] * entrants[pess]; });
  return total;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const getDay = data.hours[`${dayName}`];
  if (dayName === undefined) {
    let crtObj = {};
    const getDataKey = Object.keys(data.hours);
    getDataKey.forEach((element) => {
      crtObj[`${element}`] = getSchedule(element)[`${element}`];
    });
    return crtObj;
  }
  if (dayName === 'Monday') return { [dayName]: 'CLOSED' };
  return { [dayName]: `Open from ${getDay.open}am until ${getDay.close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const getPrices = Object.keys(data.prices);
  getPrices.forEach((price) => {
    data.prices[price] = Math.round(data.prices[price] * (1 + percentage / 100) * 100) / 100;
  });
}

function getSingleEmployeeCoverage(employee) {
  const responsibilities = [];

  employee.responsibleFor.forEach((id) => {
    responsibilities.push(data.species.find((species) => species.id === id).name);
  });

  return responsibilities;
}

function getEmployeeCoverage(idOrName) {
  const employeeCoverage = {};

  if (idOrName) {
    const employee = data.employees.find(({ id, firstName, lastName }) => id === idOrName || firstName === idOrName || lastName === idOrName);

    const fullName = `${employee.firstName} ${employee.lastName}`;
    employeeCoverage[fullName] = getSingleEmployeeCoverage(employee);

    return employeeCoverage;
  }

  for (let employee of data.employees) {
    const fullName = `${employee.firstName} ${employee.lastName}`;

    employeeCoverage[fullName] = getSingleEmployeeCoverage(employee);
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
