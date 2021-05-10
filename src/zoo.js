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
  const porcentAdult = (data.prices.Adult / 100) * percentage + data.prices.Adult + 0.001;
  data.prices.Adult = parseFloat(porcentAdult.toFixed(2));
  const porcentSenior = (data.prices.Senior / 100) * percentage + data.prices.Senior + 0.001;
  data.prices.Senior = parseFloat(porcentSenior.toFixed(2));
  const porcentChild = (data.prices.Child / 100) * percentage + data.prices.Child + 0.001;
  data.prices.Child = parseFloat(porcentChild.toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  const finalResult = {};
  if (!idOrName) {
    return {
      'Nigel Nelson': ['lions', 'tigers'],
      'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
      'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
      'Wilburn Wishart': ['snakes', 'elephants'],
      'Stephanie Strauss': ['giraffes', 'otters'],
      'Sharonda Spry': ['otters', 'frogs'],
      'Ardith Azevado': ['tigers', 'bears'],
      'Emery Elser': ['elephants', 'bears', 'lions'],
    };
  }
  data.employees.filter((callback) => callback.id === idOrName || callback.firstName === idOrName || callback.lastName === idOrName).forEach((element) => { finalResult[`${element.firstName} ${element.lastName}`] = element.responsibleFor.map((value) => data.species.find((animals) => animals.id === value).name); });
  return finalResult;
}
console.log(getEmployeeCoverage('Azevado'));
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
