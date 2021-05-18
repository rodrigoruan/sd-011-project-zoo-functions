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

const { species, employees, hours, prices } = data;

function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((animal) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const { residents } = species.find((el) => el.name === animal);

  return residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};

  return employees.find((el) => el.firstName === employeeName || el.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.reduce((found, el) => found || el.managers.some((el2) => el2 === id), false);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push(createEmployee(
    { id, firstName, lastName },
    { managers, responsibleFor },
  ));
}

function countAnimals(animalName) {
  if (animalName) {
    return species.find((el) => el.name === animalName).residents.length;
  }

  // Referece: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
  return species.reduce((object, { name, residents }) =>
    Object.assign(object, { [name]: residents.length }), {});
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;

  return Object.entries(entrants).reduce((total, [category, amount]) =>
    total + prices[category] * amount, 0);
}

function getResidentsNames(id, sorted, sexFilter) {
  const residentsNames = species
    .find((animal) => animal.id === id)
    .residents.filter((animal) => (sexFilter ? animal.sex === sexFilter : true))
    .map((el) => el.name);

  return sorted ? residentsNames.sort() : residentsNames;
}

function buildMapWithNames(map, sorted, sex) {
  species.forEach((el) => map[el.location].push({ [el.name]: getResidentsNames(el.id, sorted, sex) }));
}

function buildMapWithoutNames(map) {
  species.forEach((el) => map[el.location].push(el.name));
}

function getMapTemplate() {
  return species.reduce((map, { location: sector }) =>
    (map[sector] ? map : Object.assign(map, { [sector]: [] })), {});
}

function getAnimalMap(options) {
  const map = getMapTemplate();

  if (!options || !options.includeNames) buildMapWithoutNames(map);
  else {
    if (!options.sex) options.sex = false;
    buildMapWithNames(map, !!options.sorted, options.sex);
  }

  return map;
}

function getScheduleReducer(formattedHours, day) {
  let readableHours = '';

  if (hours[day].open === 0 && hours[day].close === 0) {
    readableHours = 'CLOSED';
  } else {
    readableHours = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
  }

  return Object.assign(formattedHours, { [day]: readableHours });
}

function getSchedule(dayName) {
  let hoursArray = Object.keys(hours);
  hoursArray = dayName ? [dayName] : hoursArray;

  return hoursArray.reduce(getScheduleReducer, {});
}

function getOldestFromFirstSpecies(id) {
  const firstSpeciesId = employees.find((employee) => employee.id === id).responsibleFor[0];
  const [firstSpecies] = getSpeciesByIds(firstSpeciesId);
  const oldestAnimal = firstSpecies.residents.reduce((oldest, animal) =>
    (animal.age > oldest.age ? animal : oldest));

  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  Object.entries(prices).forEach(function ([category, price]) {
    prices[category] = Math.ceil((price * (1 + percentage / 100)) * 100) / 100;
  });
}

function getEmployByLabel(label) {
  return employees.find((el) =>
    label === el.firstName || label === el.lastName || label === el.id);
}

function buildEmployeeCoverageData(idOrName) {
  const employee = getEmployByLabel(idOrName);
  const employeeFullName = `${employee.firstName} ${employee.lastName}`;
  const employeeCoverage = employee.responsibleFor.map((id) => getSpeciesByIds(id)[0]);
  const employeeCoverageNames = employeeCoverage.map((el) => el.name);

  return { [employeeFullName]: employeeCoverageNames };
}

function getEmployeeCoverage(idOrName) {
  if (idOrName) {
    return buildEmployeeCoverageData(idOrName);
  }

  return employees.reduce((employeesCoverage, employee) =>
    Object.assign(employeesCoverage, buildEmployeeCoverageData(employee.id)), {});
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
