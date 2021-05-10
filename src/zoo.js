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

// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));

function countAnimals(species = '') {
  const animals = data.species;
  const findAllAnimals = animals.reduce((accumulator, { name, residents }) =>
    ({ ...accumulator, [name]: residents.length }),
  {});
  return species === '' ? findAllAnimals : findAllAnimals[species];
}

function calculateEntry(entrants) {
  if (entrants === 0 || {}) return 0;
}

// console.log(calculateEntry({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
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
