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

const { species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids === '') {
    return [];
  }
  const nameAnimals = ids.map((id) => data.species.find((specie) => specie.id === id));
  return nameAnimals;
}

function getAnimalsOlderThan(animal, age) {
  const getAnimals = data.species.find((specie) => specie.name === animal).residents;
  return getAnimals.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find((value) => value.firstName === employeeName || value.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some((value) => value.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newObject);
}

function countAnimals(specie) {
  const counter = (cont) => cont + 1;
  if (specie === undefined) {
    let generalObject = {};
    data.species.forEach((value) => { generalObject[value.name] = value.residents.length; });
    return generalObject;
  }
  const selectedAnimal = data.species.filter((value) => value.name === specie);
  const { residents: arrayResidents } = selectedAnimal[0];
  return arrayResidents.reduce(counter, 0);
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  const allPrices = data.prices;
  return Object.keys(entrants).reduce((count, value) => count + (entrants[value] * allPrices[value]), 0);
}

function getAnimalMap(options = {}) {
  let animalsByLocation = { NE: [], NW: [], SE: [], SW: [] };
  if (!options.includeNames) {
    data.species.forEach((value) => animalsByLocation[value.location].push(value.name));
    return animalsByLocation;
  }
  data.species.forEach((value) => {
    let nameList = value.residents.map((name) => name.name);
    if (options.sex !== undefined) {
      nameList = [];
      let objectNameList = value.residents.filter((val) => val.sex === options.sex);
      objectNameList.forEach((nam) => nameList.push(nam.name));
    }
    if (options.sorted) { nameList.sort(); }
    animalsByLocation[value.location].push({ [value.name]: nameList });
  });
  return animalsByLocation;
}

function getSchedule(dayName) {
  let hoursOpenMatrix = [];
  let hoursCloseMatrix = [];
  let answer = {};
  (Object.values(data.hours).reduce((index, value) => {
    hoursOpenMatrix[index] = value.open;
    hoursCloseMatrix[index] = value.close - 12;
    return index + 1;
  }, 0));
  Object.keys(data.hours).reduce((index, days) => {
    answer[days] = (`Open from ${hoursOpenMatrix[index]}am until ${hoursCloseMatrix[index]}pm`);
    return index + 1;
  }, 0);
  answer.Monday = 'CLOSED';
  if (!dayName) {
    return answer;
  }
  return { [dayName]: answer[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const animalsCares = data.employees.find((value) => value.id === id).responsibleFor;
  const allIdAnimal = data.species.find((value) => value.id === animalsCares[0]).residents;
  const ageOlderAnimal = allIdAnimal.reduce((count, value) => Math.max(count, value.age), 0);
  const olderAnimal = allIdAnimal.find((value) => value.age === ageOlderAnimal);
  return Object.values(olderAnimal);
}

function increasePrices(percentage) {
  let newPrices = data.prices;
  percentage = (percentage / 100) + 1;
  console.log(typeof newPrices.Adult);
  newPrices.Adult = Math.round(data.prices.Adult * percentage * 100) / 100;
  newPrices.Child = Math.round(data.prices.Child * percentage * 100) / 100;
  newPrices.Senior = Math.round(data.prices.Senior * percentage * 100) / 100;
  return newPrices;
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
