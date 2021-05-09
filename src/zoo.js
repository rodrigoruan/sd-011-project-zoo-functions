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

function getSpeciesByIds(...ids) {
  // seu código aqui
  if (ids.length === 0) return [];
  return data.species.filter((animal) => ids.some((id) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((value) => value.name === animal).residents.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees.find((value) => value.firstName === employeeName || value.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((element) => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return newEmployee;
}

function countAnimals(specie) {
  // seu código aqui
  const countCuties = {};
  if (!specie) {
    data.species.forEach((animal) => {
      countCuties[animal.name] = animal.residents.length;
    });
    return countCuties;
  }
  return data.species.find((cuties) => specie === cuties.name).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants) return 0;
  const visitors = Object.entries(entrants);
  return visitors.reduce((acc, currentValue) => acc + (currentValue[1] * data.prices[currentValue[0]]), 0);
}

const findAnimals = (residents, sorted, sex) => {
  const animalsNames = residents.reduce((acc, value) => ((sex && value.sex !== sex) ? acc : acc.concat(value.name)) ,[]);
  return sorted ? animalsNames.sort() : animalsNames;
}
//Rodrigo Ruan.
function getAnimalMap(options= {}) {
  // seu código aqui
  const objeto = { NE: [], NW: [], SE: [], SW: [] };
  data.species.forEach((value) => (options.includeNames ? objeto[value.location].push({ [value.name]: findAnimals(value.residents, options.sorted, options.sex) }) : objeto[value.location].push(value.name)));
  return objeto;
}

console.log(getAnimalMap());

function getSchedule(dayName) {
  // seu código aqui
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
  // seu código aqui
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
