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

const { hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((getSpecies) => ids.includes(getSpecies.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animals) => animals.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  return employeeName ? data.employees.find((name) => name.firstName === employeeName || name.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.some((value) => value === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((animal) => animal.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((acc, current) => acc + (current[1] * data.prices[current[0]]), 0);
}

function getAnimalsByLocation() {
  const object = {};
  data.species.forEach((animal) => {
    if (!object[animal.location]) {
      object[animal.location] = [];
    }
    object[animal.location].push(animal.name);
  });
  return object;
}

function returnAnimalNames(sorted, sex) {
  const object = { NE: [], NW: [], SE: [], SW: [] };
  data.species.forEach((animal) => {
    let animalNames;

    if (sex) {
      animalNames = animal.residents.filter((elemento) => elemento.sex === sex).map(({ name }) => name);
    } else {
      animalNames = animal.residents.map(({ name }) => name);
    }

    if (sorted) {
      animalNames.sort();
    }
    object[animal.location].push({ [animal.name]: animalNames });
  });

  return object;
}

function getAnimalMap(options = {}) {
  let obj = {};
  const { includeNames, sorted, sex } = options;

  if (includeNames) {
    obj = returnAnimalNames(sorted, sex);
  } else {
    obj = getAnimalsByLocation();
  }

  return obj;
}

function getSchedule(dayName) {
  const getDays = Object.keys(data.hours);
  const hour = {};

  getDays.forEach((value, index) => {
    const openHour = data.hours[value].open;
    const closeHour = data.hours[value].close - 12;

    if (index === 6) {
      hour[value] = 'CLOSED';
    } else {
      hour[value] = `Open from ${openHour}am until ${closeHour}pm`;
    }
  });
  if (!dayName) {
    return hour;
  }
  return { [dayName]: hour[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const getAnimal = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const animalArr = data.species.find((animal) => getAnimal === animal.id).residents;
  const getOldest = animalArr.sort((a, b) => b.age - a.age);
  const { name, sex, age } = getOldest[0];

  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;

  data.prices.Adult = parseFloat((Adult + (Math.ceil(Adult * percentage) / 100)).toFixed(2));
  data.prices.Senior = parseFloat((Senior + (Math.ceil(Senior * percentage) / 100)).toFixed(2));
  data.prices.Child = parseFloat((Child + (Math.ceil(Child * percentage) / 100)).toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  const object = {};

  if (!idOrName) {
    data.employees.forEach(({ firstName, lastName, responsibleFor }) => {
      object[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
    });
  }
  data.employees.filter(({ firstName, lastName, id }) => firstName === idOrName || lastName === idOrName || id === idOrName).forEach(({ firstName, lastName, responsibleFor }) => { object[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name); });

  return object;
}
console.log(getEmployeeCoverage('Nigel'));

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
