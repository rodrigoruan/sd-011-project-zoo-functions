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

const _ = require('lodash');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids.length > 0) {
    const array = [];
    ids.forEach((difId) => array.push(data.species.filter((el) => difId === el.id)));
    return array.reduce((acc, curr) => acc.concat(curr));
  }
  return [];
}

function getAnimalsOlderThan(animal, age) {
  const selected = data.species.filter((el) => el.name === animal);
  const result = selected[0].residents.every((el) => el.age > age);
  return result;
}

function getEmployeeByName(employeeName) {
  const x = {};
  const getData = data.employees.find(
    (el) => el.firstName === employeeName || el.lastName === employeeName,
  );
  return typeof employeeName === 'undefined' ? x : getData;
}

const createEmployee = (personalInfo, associatedWith) => {
  const genEmployee = { ...personalInfo, ...associatedWith };
  return genEmployee;
};

function isManager(id) {
  const zooManagers = [
    '9e7d4524-363c-416a-8759-8aa7e50c0992',
    'fdb2543b-5662-46a7-badc-93d960fdc0a8',
    '0e7b460e-acf4-4e17-bcb3-ee472265db83',
  ];
  const idFilter = data.employees.find((el) => el.id === id);
  return zooManagers.some((el) => idFilter.id === el);

  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (species !== undefined) {
    const animals = data.species.find((el) => el.name === species);
    return animals.residents.length;
  }
  const allAnimals = data.species.map((el) => {
    const [animalName, animalNumber] = [el.name, el.residents.length];
    return { [`${animalName}`]: animalNumber };
  });
  const redux = (acc, item) => Object.assign(acc, item);
  return allAnimals.reduce(redux, {});
}

function calculateEntry(entrants) {
  if (_.isEmpty(entrants) === true || typeof entrants === 'undefined') {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  let calculate = Adult * 49.99 + Child * 20.99 + Senior * 24.99;
  return calculate;
  // seu código aqui
}
let map = { NE: [], NW: [], SE: [], SW: [] };
const regions = Object.keys(map);

const checkEmptyMap = (options) => {
  if (_.isEmpty(options) || !options.includeNames) {
    regions.forEach((region) => {
      const animals = data.species.filter((animal) => animal.location === region);
      map[region] = animals.map((el) => el.name);
    });
    return map;
  }
};

const sexCheck = (options) => {
  const { sorted, sex } = options;
  regions.forEach((region) => {
    const animalsInRegion = data.species.filter((animal) => animal.location === region);
    map[region] = animalsInRegion.map((animal) => {
      let animalList = animal.residents;
      if (sex) {
        animalList = animalList.filter((gen) => gen.sex === sex);
      }
      animalList = animalList.map((single) => single.name);
      if (sorted) {
        animalList = animalList.sort();
      }
      return {
        [animal.name]: animalList,
      };
    });
  });
};

const checkInclude = (options) => {
  const { includeNames } = options;
  if (includeNames) {
    sexCheck(options);

    return map;
  }
};

function getAnimalMap(options) {
  if (checkEmptyMap(options)) {
    return checkEmptyMap(options);
  }
  return checkInclude(options);
}

function weekCalendar(dayName) {
  let newObj = {};
  let obj;
  Object.keys(data.hours).forEach((el) => {
    let openTime = Object.values(data.hours[el])[0];
    let closeTime = Object.values(data.hours[el])[1] - 12;
    if (openTime < 1 && closeTime < 1) {
      obj = {
        [el]: 'CLOSED',
      };
    } else {
      obj = {
        [el]: `Open from ${openTime}am until ${closeTime}pm`,
      };
    }
    Object.assign(newObj, obj);
  });
  return newObj;
}

function getSchedule(dayName) {
  if (!dayName) {
    return weekCalendar();
  }
  let imported = { ...weekCalendar() };
  let newObject = { [dayName]: imported[dayName] };
  return newObject;
}

function getOldestFromFirstSpecies(id) {
  const animalArray = Object.keys(data.species).map((el) => Object.values(data.species[el])[0]);
  const employeeId = Object.keys(data.employees).find(
    (el) => Object.values(data.employees[el])[0] === id,
  );
  const getFirst = data.employees[employeeId].responsibleFor.find((el) => animalArray.includes(el));
  const selection = [
    Object.keys(data.species).find((el) => Object.values(data.species[el])[0] === getFirst),
  ];
  const getOldest = data.species[selection].residents;
  const redux = (acc, item) => (acc.age > item.age ? acc : item);
  const getTheOne = getOldest.reduce(redux);

  return [getTheOne.name, getTheOne.sex, getTheOne.age];
}

console.log(getOldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
