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
const { species, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((specie) => ids.find((id) => specie.id === id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const selectedAnimals = data.species.find((specie) => (animal === specie.name)).residents.every((resident) => (resident.age > age));
  return selectedAnimals;
}

// Requisito 03
const getEmployeeByName = (employeeName) => (!employeeName ? {} : data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName));

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const pushEmployee = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return pushEmployee;
}

function countAnimals(speciesOfAnimals) {
  // seu código aqui
//   if (!speciesOfAnimals) {
//     const countAnimal = data.species.map(({ name }) => name);
//     const countResidentAnimals = data.species.map(({ residents }) => residents.length);
//     const listOfAnimals = (listAnimal, listResidentsAnimals) => listAnimal.map((animal, i) => ({ [animal]:
//     listResidentsAnimals[i] })
//   });
//   const animalsCounted = listOfAnimals(countAnimal, countResidentAnimals);
//   return Object.assign({}, ...animalsCounted)
// } else (speciesOfAnimals) {
//   const findAnimal = data.species.find((animal) => animal.name === species);
//   return findAnimal.residents.length;
// }
// };
}

function calculateEntry(entrants = 0) {
  // seu código aqui
  return Object.keys(entrants).reduce((acc, value) => acc + data.prices[value] * entrants[value], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  // let result = {};

  // if (dayName === 'Monday') => {
  //   return { Monday: 'Closed' };
  // }  else {
  //   hours.forEach((hour) => {
  //     result[hours] = Object.entries(hour);
  //     return result[hour];
  //   });
  // }
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  // const foundFirstAnimal = data.employees.find((person) => person.id === id).responsibleFor[0];
  // const foundAnimal = data.species.find((animal) => animal.id === foundFirstAnimal);
  // const oldestAge = Math.max.apply(Math, foundAnimal.residents.map(function (o) { return o.age; }));
  // const oldestAnimal = foundAnimal.residents.find((currentResident) => currentResident.age === oldestAge);
  // return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  // seu código aqui
  const pricesByAgeGroup = Object.entries(data.prices);
  pricesByAgeGroup.forEach((priceGroup) => {
    priceGroup[1] *= (1 + percentage / 100);
    data.prices[`${priceGroup[0]}`] = Math.round(priceGroup[1] * 100) / 100;
  });
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
