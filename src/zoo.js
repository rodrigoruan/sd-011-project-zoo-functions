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

// const { species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids === undefined) return [];
  const filterSpecie = ({ id }, index) => id === ids[index];
  return data.species.filter(filterSpecie);
}

function getAnimalsOlderThan(animal, ages) {
  const residentsArray = data.species;
  const find = residentsArray.find(({ name }) => name === animal);
  const result = find.residents.every(({ age }) => age > ages);
  return result;
}

function getEmployeeByName(employeeName) {
  const employeesList = data.employees;
  const chooseEmployeByName = ({ firstName, lastName }) => {
    const choose = firstName === employeeName || lastName === employeeName;
    return choose;
  };

  const findEmployee = employeesList.find(chooseEmployeByName);

  return employeeName === undefined ? {} : findEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(employeId) {
  const employeesList = data.employees;
  const employee = employeesList.map(({ managers }) => managers);
  const managers = employee.reduce((accumulator, manager) => {
    const arrayOfIds = accumulator.concat(manager);
    return arrayOfIds;
  }, []);
  const checkManager = managers.some((id) => id === employeId);
  return checkManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employeesList = data.employees;
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  const newEmployee = createEmployee(personalInfo, associatedWith);
  const addNewEmployee = employeesList.push(newEmployee);
  return addNewEmployee;
}

function countAnimals(species = '') {
  const animals = data.species;
  const findAllAnimals = animals.reduce((accumulator, { name, residents }) =>
    ({ ...accumulator, [name]: residents.length }),
  {});
  return species === '' ? findAllAnimals : findAllAnimals[species];
}

function calculateEntry(entrants = {}) {
  if (!entrants) return 0;

  const entrantKeys = Object.keys(entrants);
  return entrantKeys.reduce((accumulator, key) => accumulator + entrants[key] * data.prices[key], 0);
}

function getAnimalMap(options) {
  // const animals = data.species;
  // const animalsMap = animals.reduce((accumulator, { name, location }) => {
  //   return {...accumulator, [location]: [name] }
  // }, {});
  // return animalsMap;
}

Object.filter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate));

function getSchedule(dayName) {
  const operatingHour = data.hours;
  const operatingHourValues = Object.values(operatingHour);
  const operatingHourKeys = Object.keys(operatingHour);

  const standardMessage = operatingHourKeys.reduce((accumulator, current, index, array) => {
    const isLastItem = index === array.length - 1;
    const lastMessage = 'CLOSED';
    const currentMessage = `Open from ${operatingHourValues[index].open}am until ${operatingHourValues[index].close - 12}pm`;
    return isLastItem ? { ...accumulator, [current]: lastMessage } : { ...accumulator, [current]: currentMessage };
  }, {});

  const filtered = Object.filter(standardMessage, ([name]) => name === dayName);

  return (!dayName) ? standardMessage : filtered;
}

function getOldestFromFirstSpecies(employeeId) {
  const { employees } = data;
  const animals = data.species;
  const searchEmployee = employees.find(({ id }) => id === employeeId);
  const firstAnimalOfEmployee = searchEmployee.responsibleFor[0];
  const searchAnimals = animals.find(({ id }) => id === firstAnimalOfEmployee);
  const { residents } = searchAnimals;
  const findOldest = residents.sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = findOldest;
  const odlestAsArray = [name, sex, age];

  return odlestAsArray;
}

function increasePrices(percentage) {
  const adults = ((data.prices.Adult / 100) * percentage) + data.prices.Adult + 0.001;
  const seniors = ((data.prices.Senior / 100) * percentage) + data.prices.Senior + 0.001;
  const childs = ((data.prices.Child / 100) * percentage) + data.prices.Child + 0.001;

  data.prices.Adult = Number(adults.toFixed(2));
  data.prices.Senior = Number(seniors.toFixed(2));
  data.prices.Child = Number(childs.toFixed(2));
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
