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
const { employees, species, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return species.filter((especie) => ids.some((id) => especie.id === id));
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

function getAnimalsOlderThan(animal, age) {
  return species.find((value) => value.name === animal).residents.every((animalAge) => animalAge.age >= age);
}
// console.log(animalsOlderThan('otters', 7));

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees.find((value) => value.firstName === employeeName || value.lastName === employeeName);
}
// console.log(employeeByName('Emery'));

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((funcionario) => funcionario.managers.includes(id));
}
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const pushEmployee = employees.push({ id, firstName, lastName, managers, responsibleFor });
  return pushEmployee;
}
// console.log(addEmployee('4141da1c-a6ed-4cf7-90c4-99c657ba4ef3', 'Jane', 'Doe',
// [
//   '546fe3d4-2d81-4bb4-83a7-92d5b7048d17',
//   'a67a36ee-3765-4c74-8e0f-13f881f6588a',
// ],
// [
//   'ee6139bf-b526-4653-9e1e-1ca128d0ad2e',
//   '210fcd23-aa7b-4975-91b7-0230ebb27b99',
// ]));

function countAnimals(speciesOfAnimals) {
  if (!speciesOfAnimals) {
    const countAnimal = data.species.map(({ name }) => name);
    const countResidentsAnimals = data.species.map(({ residents }) => residents.length);
    const listOfAnimals = (listAnimal, listResidentsAnimals) => listAnimal.map((animal, i) => ({ [animal]: listResidentsAnimals[i] }));
    const animalsCounted = listOfAnimals(countAnimal, countResidentsAnimals);
    return Object.assign({}, ...animalsCounted);
  }
  {
    const findAnimal = data.species.find((animal) => animal.name === speciesOfAnimals);
    return findAnimal.residents.length;
  }
}
// console.log(animalCount('lions'));

function calculateEntry(entrants = 0) {
  return Object.keys(entrants).reduce((acc, value) => acc + prices[value] * entrants[value], 0);
}
// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const schedule = {};
  if (dayName && dayName !== 'Monday') {
    schedule[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    return schedule;
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
    Monday: 'CLOSED',
  };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const adultPrice = ((data.prices.Adult / 100) * percentage + data.prices.Adult + 0.001);
  const childPrice = ((data.prices.Child / 100) * percentage + data.prices.Child + 0.001);
  const seniorPrice = ((data.prices.Senior / 100) * percentage + data.prices.Senior + 0.001);

  data.prices.Adult = Number(adultPrice.toFixed(2));
  data.prices.Senior = Number(seniorPrice.toFixed(2));
  data.prices.Child = Number(childPrice.toFixed(2));
}

const nameRespons = (listEmployees, listReponsAnimals) => listEmployees.map((name, i) => ({ [name]: listReponsAnimals[i] }));
function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    const getEmployees = employees.map((name) => `${name.firstName} ${name.lastName}`);
    const getAnimalsRespons = employees.map((animalRes) => animalRes.responsibleFor);
    const arrayNames = [];
    getAnimalsRespons.forEach((animalIds) => {
      arrayNames.push(animalIds.map((id) => species.find((animal) => id === animal.id).name));
    });
    // console.log(arrayNames);
    const result = nameRespons(getEmployees, arrayNames);
    const resultObj = Object.assign({}, ...result);
    return resultObj;
  }
  const employeeAnimal = {};
  const filterEmployees = data.employees.filter((employee) => employee.firstName === idOrName || employee.lastName === idOrName || employee.id === idOrName).forEach((value) => {
    employeeAnimal[`${value.firstName} ${value.lastName}`] = value.responsibleFor.map((responsId) => data.species.find((specie) => specie.id === responsId).name);
  });
  return employeeAnimal;
}
// console.log(getEmployeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
