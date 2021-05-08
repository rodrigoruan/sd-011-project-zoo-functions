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

const getSpeciesByIds = (...ids) => data.species.filter((spacies) => ids.some((id) => spacies.id === id));

// o Rodolfo Rezende me ajudou nessa turma 11.
function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((value) => value.name === animal).residents.every((value) => value.age >= age);
}

// o Rodolfo Rezende  e o Jean ambos da turma 11, me ajudou nessa.
function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((val) => val.firstName === employeeName || val.lastName === employeeName);
}

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });
// seu código aqui

const isManager = (id) => data.employees.some((getManeger) => getManeger.managers.includes(id));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  let result = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return result;
}

function countAnimals(specie) {
  // seu código aqui
  const animaisTotal = {};
  if (!specie) {
    data.species.forEach((value) => {
      animaisTotal[value.name] = value.residents.length;
    });
    return animaisTotal;
  }
  return data.species.find((spe) => specie === spe.name).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (entrants === undefined || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

// o Rodolfo Rezende me ajudou nessa.
function getSchedule(dayName) {
  // seu código aqui
  const result = {};
  if (dayName && dayName !== 'Monday') {
    result[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    return result;
  }
  if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
}

// o Rodolfo Rezende me ajudou nessa.
function getOldestFromFirstSpecies(id) {
  const getId = data.employees.filter((ids) => ids.id === id)[0].responsibleFor[0];
  const getAnimal = data.species.filter((value) => value.id === getId)[0].residents;
  const getOldSpecies = getAnimal.reduce((acc, list) => Math.max(acc, list.age), 0);
  const result = getAnimal.find((age) => age.age === getOldSpecies);
  return [result.name, result.sex, result.age];
}
// console.log(getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  const priceAdult = ((data.prices.Adult / 100) * percentage + data.prices.Adult + 0.001);
  const priceChild = ((data.prices.Child / 100) * percentage + data.prices.Child + 0.001);
  const priceSenior = ((data.prices.Senior / 100) * percentage + data.prices.Senior + 0.001);
  data.prices.Adult = Number(priceAdult.toFixed(2));
  data.prices.Child = Number(priceChild.toFixed(2));
  data.prices.Senior = Number(priceSenior.toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  const getAnimalEmployee = {};
  if (!idOrName) {
    data.employees.forEach((value) => {
      getAnimalEmployee[`${value.firstName} ${value.lastName}`] = value.responsibleFor.map((val) => data.species.find((specie) => specie.id === val).name);
    });
    return getAnimalEmployee;
  }
  data.employees.filter((employee) => employee.id === idOrName || employee.lastName === idOrName || employee.firstName === idOrName).forEach((value) => {
    getAnimalEmployee[`${value.firstName} ${value.lastName}`] = value.responsibleFor.map((val) => data.species.find((specie) => specie.id === val).name);
  });
  return getAnimalEmployee;
}
// console.log(getEmployeeCoverage());
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
