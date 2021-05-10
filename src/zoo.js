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
  return ids.map((id) => data.species.find((specie) => specie.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const specieFind = data.species.find((specie) => specie.name === animal);
  return specieFind.residents.every((animalSelect) => animalSelect.age >= age);
}

function getEmployeeByName(employeeName) {
  const employeeFunction = (e) => ([e.firstName, e.lastName].includes(employeeName));
  return (employeeName) ? data.employees.find(employeeFunction) : {};
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
  const manager = (r, e) => r.concat(e.managers);
  const managers = data.employees.reduce(manager, []);
  return managers.includes(id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function countAnimals(species) {
  if (!species) {
    let result = {};
    const each = ({ name, residents }) => { result[name] = residents.length; };
    data.species.forEach(each);
    return result;
  }
  return data.species.find(({ name }) => name === species).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  const keys = Object.keys(entrants);
  return keys.reduce((res, key) => res + entrants[key] * data.prices[key], 0);
}

function createObject(key, value) {
  let obj = {};
  obj[key] = value;
  return obj;
}

function getAnimalMap(options) {
  let object = {};
  const locations = ['NE', 'NW', 'SE', 'SW'];
  locations.forEach((loc) => {
    object[loc] = data.species.filter(({ location }) => location === loc);

    if (options.includeNames) {
      object[loc] = object[loc].map((v) => (
        createObject(v.name, v.residents.map((animal) => animal.name))
      ));
    } else {
      object[loc] = object[loc].map(({ name }) => name);
    }
  });
  return object;
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
