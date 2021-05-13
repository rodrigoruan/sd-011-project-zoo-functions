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
  return species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return species.find(({ name }) => name === animal).residents.every(({ age: capturedAge }) => capturedAge >= age);
}

function getEmployeeByName(employeeName) {
  const { employees } = data;
  return (!employeeName) ? {} : employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployee);
}

function countAnimals(specie) {
  const animal = {};
  if (!specie) {
    data.species.forEach((element) => {
      animal[element.name] = element.residents.length;
    });
    return animal;
  }
  return data.species.find((animalName) => animalName.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  const { Adult, Child, Senior } = entrants;
  let sum = 0;
  if (typeof Adult === 'number') sum += Adult * data.prices.Adult;
  if (typeof Child === 'number') sum += Child * data.prices.Child;
  if (typeof Senior === 'number') sum += Senior * data.prices.Senior;
  return sum;
}

const getAnimalByLocation = () => {
  const obj = {};
  species.forEach((animal) => {
    if (!obj[animal.location]) {
      obj[animal.location] = [];
    }
    obj[animal.location].push(animal.name);
  });
  return obj;
};

const getAnimalByNames = (sorted, sex) => {
  const animalsLocations = { NE: [], NW: [], SE: [], SW: [] };
  species.forEach((animalName) => {
    let animalNames;
    if (sex) {
      animalNames = animalName.residents.filter((animalSex) => animalSex.sex === sex).map(({ name }) => name);
    } else {
      animalNames = animalName.residents.map(({ name }) => name);
    }
    if (sorted) {
      animalNames.sort();
    }
    animalsLocations[animalName.location].push({ [animalName.name]: animalNames });
  });
  return animalsLocations;
};

function getAnimalMap(options = {}) {
  let emptyObj = {};
  const { includeNames, sex, sorted } = options;
  if (includeNames) {
    emptyObj = getAnimalByNames(sorted, sex);
  } else {
    emptyObj = getAnimalByLocation();
  }
  return emptyObj;
}

function getSchedule(dayName) {
  const days = Object.keys(data.hours);
  const openingHours = {};
  days.forEach((day, index) => {
    const opening = data.hours[day].open;
    const closure = data.hours[day].close - 12;
    if (index === 6) {
      openingHours[day] = 'CLOSED';
    } else {
      openingHours[day] = `Open from ${opening}am until ${closure}pm`;
    }
  });
  if (!dayName) return openingHours;
  return { [dayName]: openingHours[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const animalAtResponsible = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const residentsAtResponsible = species.find((animals) => animalAtResponsible === animals.id).residents;
  const residentsSorted = residentsAtResponsible.sort((a, b) => b.age - a.age);
  const { name, sex, age } = residentsSorted[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  data.prices.Adult = parseFloat((Adult + (Math.ceil(Adult * percentage) / 100)).toFixed(2));
  data.prices.Child = parseFloat((Child + (Math.ceil(Child * percentage) / 100)).toFixed(2));
  data.prices.Senior = parseFloat((Senior + (Math.ceil(Senior * percentage) / 100)).toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  const responsible = {};
  if (!idOrName) {
    data.employees.forEach(({ firstName, lastName, responsibleFor }) => {
      responsible[`${firstName} ${lastName}`] = responsibleFor
        .map((animalId) => data.species.find(({ id }) => id === animalId).name);
    });
    return responsible;
  }
  data.employees.filter(({ id, firstName, lastName }) => id === idOrName || firstName === idOrName || lastName === idOrName)
    .forEach(({ firstName, lastName, responsibleFor }) => {
      responsible[`${firstName} ${lastName}`] = responsibleFor
        .map((animalId) => data.species.find(({ id }) => id === animalId).name);
    });
  return responsible;
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
