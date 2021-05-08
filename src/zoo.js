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

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (!ids) return [];
  return ids.map((element) => {
    let acc = [];
    acc = species.find((item) => item.id === element);
    return acc;
  });
}
function getAnimalsOlderThan(animal, age) {
  const animalsList = species.find((item) => item.name === animal);
  return animalsList.residents.every((item) => item.age > age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.some((item) => item === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(animal) {
  if (!animal) {
    const allCounts = {};
    species.forEach(({ name, residents }) => { allCounts[name] = residents.length; });
    return allCounts;
  }
  return species.find(({ name }) => name === animal).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const totalCost = (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
  return totalCost;
}

function baseResponse() {
  const NE = species.filter((item) => item.location === 'NE');
  const NW = species.filter((item) => item.location === 'NW');
  const SE = species.filter((item) => item.location === 'SE');
  const SW = species.filter((item) => item.location === 'SW');
  return { NE, NW, SE, SW };
}

function defaultResponse({ NE, NW, SE, SW }) {
  NE = NE.map((current) => current.name);
  NW = NW.map((current) => current.name);
  SE = SE.map((current) => current.name);
  SW = SW.map((current) => current.name);
  return { NE, NW, SE, SW };
}

function responseWithNames({ NE, NW, SE, SW }) {
  NE = NE.map((item) => ({ [item.name]: item.residents.map((current) => current.name) }));
  NW = NW.map((item) => ({ [item.name]: item.residents.map((current) => current.name) }));
  SE = SE.map((item) => ({ [item.name]: item.residents.map((current) => current.name) }));
  SW = SW.map((item) => ({ [item.name]: item.residents.map((current) => current.name) }));
  return { NE, NW, SE, SW };
}

function sortedResponse({ NE, NW, SE, SW }) {
  NE.map((item) => item[Object.keys(item)].sort());
  NW.map((item) => item[Object.keys(item)].sort());
  SE.map((item) => item[Object.keys(item)].sort());
  SW.map((item) => item[Object.keys(item)].sort());
  return { NE, NW, SE, SW };
}

function responseWithSex({ NE, NW, SE, SW }, sex) {
  if (!sex) return responseWithNames({ NE, NW, SE, SW });
  NE = NE.map((item) => ({ [item.name]: item.residents.filter((current) => current.sex === sex)
    .map((element) => element.name) }));
  NW = NW.map((item) => ({ [item.name]: item.residents.filter((current) => current.sex === sex)
    .map((element) => element.name) }));
  SE = SE.map((item) => ({ [item.name]: item.residents.filter((current) => current.sex === sex)
    .map((element) => element.name) }));
  SW = SW.map((item) => ({ [item.name]: item.residents.filter((current) => current.sex === sex)
    .map((element) => element.name) }));
  return { NE, NW, SE, SW };
}

function getAnimalMap(options) {
  let coordinates = baseResponse();
  if (!options || !options.includeNames) {
    coordinates = defaultResponse(coordinates);
    return coordinates;
  }
  coordinates = responseWithSex(coordinates, options.sex);
  if (options.sorted === true) {
    coordinates = sortedResponse(coordinates);
  }
  return coordinates;
}

function getSchedule(dayName) {
  const schedule = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };

  if (!dayName) {
    return schedule;
  }
  const day = {};
  day[dayName] = schedule[dayName];
  return day;
}

function getOldestFromFirstSpecies(id) {
  const specieId = employees.find((item) => item.id === id).responsibleFor[0];
  const animalsList = species.find((object) => object.id === specieId).residents;
  const { name, sex, age } = animalsList.reduce((acc, current) => (acc.age > current.age ? acc : current));
  return [name, sex, age];
}

function increasePrices(percentage) {
  percentage = 1 + (percentage / 100);
  prices.Adult = Math.round(prices.Adult * percentage * 100) / 100;
  prices.Child = Math.round(prices.Child * percentage * 100) / 100;
  prices.Senior = Math.round(prices.Senior * percentage * 100) / 100;
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    const employeesList = {};
    employees.forEach((item) => {
      const animalsList = item.responsibleFor.map((id) => species.find((current) => current.id === id).name);
      employeesList[`${item.firstName} ${item.lastName}`] = animalsList;
    });
    return employeesList;
  }
  const employee = employees.find((item) =>
    item.firstName === idOrName
    || item.lastName === idOrName || item.id === idOrName);
  const animalsList = employee.responsibleFor.map((id) => species.find((current) => current.id === id).name);
  return { [`${employee.firstName} ${employee.lastName}`]: animalsList };
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
