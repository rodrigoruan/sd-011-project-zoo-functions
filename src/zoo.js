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

const { prices } = require('./data');
const data = require('./data');

const arrayOfAnimals = data.species;
const arrayOfEmployees = data.employees;
const pricesObject = data.prices;
const hoursObject = data.hours;

function getSpeciesByIds(...ids) {
  return ids.length === 0 ? [] : arrayOfAnimals.filter((animal, index) => animal.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  const animalObject = arrayOfAnimals.find((object) => object.name === animal);

  return animalObject.residents.every((element) => element.age > age);
}

function getEmployeeByName(employeeName) {
  const findEmployee = () => arrayOfEmployees.find((employer) => employer.firstName === employeeName || employer.lastName === employeeName);
  return employeeName === undefined ? {} : findEmployee();
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const arrayOfManagers = arrayOfEmployees.map((person) => person.managers);
  return arrayOfManagers.some((employer, index) => employer[index] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (!managers) {
    managers = [];
  } if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  arrayOfEmployees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (!species) {
    return ({
      lions: arrayOfAnimals.find((animal) => animal.name === 'lions').residents.length,
      tigers: arrayOfAnimals.find((animal) => animal.name === 'tigers').residents.length,
      bears: arrayOfAnimals.find((animal) => animal.name === 'bears').residents.length,
      penguins: arrayOfAnimals.find((animal) => animal.name === 'penguins').residents.length,
      otters: arrayOfAnimals.find((animal) => animal.name === 'otters').residents.length,
      frogs: arrayOfAnimals.find((animal) => animal.name === 'frogs').residents.length,
      snakes: arrayOfAnimals.find((animal) => animal.name === 'snakes').residents.length,
      elephants: arrayOfAnimals.find((animal) => animal.name === 'elephants').residents.length,
      giraffes: arrayOfAnimals.find((animal) => animal.name === 'giraffes').residents.length,
    });
  } return arrayOfAnimals.find((animal) => animal.name === species).residents.length;
}

function calculateEntry(entrants) {
  let arrayOfSums = [];
  if (!entrants) {
    return 0;
  } if (!entrants.Adult && !entrants.Child && !entrants.Senior) {
    return 0;
  } arrayOfSums.push((entrants.Adult * pricesObject.Adult));
  arrayOfSums.push(entrants.Child * pricesObject.Child);
  arrayOfSums.push(entrants.Senior * pricesObject.Senior);
  return Math.round((arrayOfSums.filter((element) => element > 0).reduce((a, b) => a + b)) * 100) / 100;
}

function getAnimalsName() {
  return ({
    NE: arrayOfAnimals.filter(((animal) => animal.location === 'NE')).map((animal) => animal.name),
    NW: arrayOfAnimals.filter(((animal) => animal.location === 'NW')).map((animal) => animal.name),
    SE: arrayOfAnimals.filter(((animal) => animal.location === 'SE')).map((animal) => animal.name),
    SW: arrayOfAnimals.filter(((animal) => animal.location === 'SW')).map((animal) => animal.name),
  });
}

// to validate
// const residentsNE = () => {
//   const NE = arrayOfAnimals.filter(((animal) => animal.location === 'NE'));
//   const objectNE = NE.reduce((accumulator, curr) => {
//     accumulator[curr.name] = curr.residents.map((resident) => resident.name);
//     return accumulator;
//   },{});
//   return objectNE;
// }

// pending
function getAnimalMap(options) {
  if (!options) {
    return getAnimalsName();
  } return 'pending';
}

function convertHour(hour) {
  return hour >= 12 ? hour - 12 : hour;
}

function getFullSchedule() {
  const newObject = {};

  for (let days in hoursObject) {
    if (days) {
      newObject[days] = `Open from ${convertHour(hoursObject[days].open)}am until ${convertHour(hoursObject[days].close)}pm`;
    }
  }
  newObject.Monday = 'CLOSED';
  return newObject;
}

function getSchedule(dayName) {
  const newObject = {};
  if (!dayName) {
    return getFullSchedule();
  } newObject[dayName] = getFullSchedule()[dayName];
  return newObject;
}

function getOldestAnimal(animalId) {
  const sortedResident = arrayOfAnimals.find((animal) => animal.id === animalId).residents.sort((a, b) => b.age - a.age);
  const { name, sex, age } = sortedResident[0];
  return [name, sex, age];
}

function getOldestFromFirstSpecies(id) {
  const getEmployer = arrayOfEmployees.find((employer) => employer.id === id).responsibleFor;
  return getOldestAnimal(getEmployer[0]);
}

function increasePrices(percentage) {
  const percentRaise = 1 + (percentage / 100);
  for (let value in pricesObject) {
    if (value) {
      pricesObject[value] = Math.round(pricesObject[value] * percentRaise * 100) / 100;
    }
  }
}

function getAnimalsById(array) {
  const newArray = [];
  array.forEach((id) => newArray.push(arrayOfAnimals.find((animal) => animal.id === id).name));
  return newArray;
}

function generalCoverage() {
  const coverageObject = arrayOfEmployees.reduce((acc, curr) => {
    acc[`${curr.firstName} ${curr.lastName}`] = getAnimalsById(curr.responsibleFor);
    return acc;
  }, {});
  return coverageObject;
}

function findByName(name) {
  return arrayOfEmployees.filter((employer) => employer.firstName === name);
}

function findByLastName(lastName) {
  return arrayOfEmployees.filter((employer) => employer.lastName === lastName);
}

function findById(id) {
  return arrayOfEmployees.filter((employer) => employer.id === id);
}

function coverageByName(name) {
  const coverageObject = findByName(name).reduce((acc, curr) => {
    acc[`${curr.firstName} ${curr.lastName}`] = getAnimalsById(curr.responsibleFor);
    return acc;
  }, {});
  return coverageObject;
}

function coverageByLastName(name) {
  const coverageObject = findByLastName(name).reduce((acc, curr) => {
    acc[`${curr.firstName} ${curr.lastName}`] = getAnimalsById(curr.responsibleFor);
    return acc;
  }, {});
  return coverageObject;
}

function coverageById(id) {
  const coverageObject = findById(id).reduce((acc, curr) => {
    acc[`${curr.firstName} ${curr.lastName}`] = getAnimalsById(curr.responsibleFor);
    return acc;
  }, {});
  return coverageObject;
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    return generalCoverage();
  } if (findByName(idOrName).length !== 0) {
    return coverageByName(idOrName);
  } if (findByLastName(idOrName).length !== 0) {
    return coverageByLastName(idOrName);
  } return coverageById(idOrName);
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
