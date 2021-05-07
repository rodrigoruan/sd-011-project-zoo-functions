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
  return species.filter((especie) => ids.some((id) => especie.id === id))
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

function getAnimalsOlderThan(animal, age) {
  return species.find((value) => value.name === animal).residents.every((animalAge) => animalAge.age >= age);
}
// console.log(animalsOlderThan('otters', 7));

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {}
  }
  return data.employees.find((value) => value.firstName === employeeName || value.lastName === employeeName)
}
// console.log(employeeByName('Emery'));

function createEmployee(personalInfo, associatedWith) {
  return {...personalInfo, ...associatedWith};
}

function isManager(id) {
  return employees.some((funcionario) => funcionario.managers.includes(id))
}
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const pushEmployee = employees.push({id, firstName, lastName, managers, responsibleFor});
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

function countAnimals(species) {
  if (!species) {
    const countAnimal = data.species.map(({ name }) => name)
    const countResidentsAnimals = data.species.map(({ residents }) => residents.length)
    const listOfAnimals = (countAnimal, countResidentsAnimals) => countAnimal.map((animal, i) => {
      return ({[animal]: countResidentsAnimals[i]})
    });
    const animalsCounted = listOfAnimals(countAnimal, countResidentsAnimals);
    return Object.assign({}, ...animalsCounted)
}
else if (species) {
  const findAnimal = data.species.find((animal) => animal.name === species);
  return findAnimal.residents.length;
}
}
// console.log(animalCount('lions'));

function calculateEntry(entrants = 0) {
  return Object.keys(entrants).reduce((acc, value) => acc + prices[value] * entrants[value], 0)
}
// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

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
