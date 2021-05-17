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
const { employees } = require('./data');
// const { species } = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((species) => ids.some((id) => species.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find(({ name }) => name === animal).residents.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
  // seu código aqui
}

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

function isManager(id) {
  data.employees.some((manage) => manage.managers.includes(id));
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  // seu código aqui
}

function countAnimals(specie) {
  const total = {};
  if (!specie) {
    data.species.forEach(({ name, residents }) => {
      total[name] = residents.length;
    });
    return total;
  }
  return data.species.find(({ name }) => specie === name).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options = {}) {
  let result = {};
  let arrayRegions = ['NE', 'NW', 'SE', 'SW'];
  arrayRegions.forEach((regions) => {
    result[regions] = [];
  });
  data.species.map((animal) => (options.includeNames ? result[animal.location].push({ [animal.name]: getNameAnimal(animal.residents, options.sorted, options.sex) }) : result[animal.location].push(animal.name)));
  return result;
}

function getSchedule(dayName) {
  const result = {};
  if (dayName && dayName !== 'Monday') {
    result[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    return result;
  } if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED' };
}

function getOldestFromFirstSpecies(id) {
  const animalId = data.employees.filter((ids) => ids.id === id)[0].responsibleFor[0];
  const searchAnimal = data.species.filter((value) => value.id === animalId)[0].residents;
  const ageAnimalsAll = searchAnimal.reduce((acc, list) => Math.max(acc, list.age), 0);
  const result = searchAnimal.find((age) => age.age === ageAnimalsAll);
  return [result.name, result.sex, result.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const adultPrice = ((data.prices.Adult / 100) * percentage + data.prices.Adult + 0.001);
  const childPrice = ((data.prices.Child / 100) * percentage + data.prices.Child + 0.001);
  const seniorPrice = ((data.prices.Senior / 100) * percentage + data.prices.Senior + 0.001);

  data.prices.Adult = Number(adultPrice.toFixed(2));
  data.prices.Senior = Number(seniorPrice.toFixed(2));
  data.prices.Child = +childPrice.toFixed(2);
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  const consultAnimalEmployee = {};
  if (!idOrName) {
    employees.forEach((value) => {
      consultAnimalEmployee[`${value.firstName} ${value.lastName}`] = value.responsibleFor.map((valor) => data.species.find((specie) => specie.id === valor).name);
    });
    return consultAnimalEmployee;
  }
  data.employees.filter((employee) => employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName).forEach((value) => {
    consultAnimalEmployee[`${value.firstName} ${value.lastName}`] = value.responsibleFor.map((valor) => data.species.find((specie) => specie.id === valor).name);
  });
  return consultAnimalEmployee;
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
