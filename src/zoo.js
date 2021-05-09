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
  if (ids.length === 0) {
    return [];
  }
  const filterSpecies = data.species.filter((animal) => ids.some((id) => id === animal.id));
  return filterSpecies;
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((listanimal) => listanimal.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees.find((predicate) => predicate.firstName === employeeName
  || predicate.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((value) => value.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  const arrayQuantityResidents = data.species.map((animal) => (animal.residents).length);
  const arrayOfNames = data.species.map((animal) => (animal.name));
  let objOfSpecies = {};
  arrayOfNames.forEach((name, index) => {
    objOfSpecies[name] = arrayQuantityResidents[index];
  });
  return species ? objOfSpecies[species] : objOfSpecies;
}

function calculateEntry(entrants = 0) {
  return Object.keys(entrants).reduce((acumulador, value) => acumulador + (data.prices[value] * entrants[value]), 0);
}

function getAnimalMap(options) {
}

function getSchedule(dayName) {
  let legibeWekken = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return legibeWekken;
  }
  if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  const dayOfTheWeek = Object.keys(data.hours).find((nameWeeken) => (nameWeeken === dayName));
  return {
    [dayOfTheWeek]: `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  // const worker = data.employees.find((callback) => callback.id === id);
  // const animalSeacrh = data.species.find((callback) => callback.id === worker.responsibleFor[0]);
  // const findOldestAnimal = animalSeacrh.residents.filter((callback) => callback.age);
  // return findOldestAnimal
  // Sala A me ajudou
  const animalId = data.employees.find((callback) => callback.id === id).responsibleFor[0];
  const residentListanimalId = data.species.filter((callback) => callback.id === animalId)[0].residents;
  const oldAnimal = residentListanimalId.sort((a, b) => b.age - a.age)[0];
  return Object.values(oldAnimal);
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
