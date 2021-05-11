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
// const assert = require('assert');

const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';

function getSpeciesByIds(...ids) {
  let array = [];
  ids.forEach((iD) => array.push(data.species.find((specie) => specie.id === iD)));
  return array;
}

function getAnimalsOlderThan(animal, age) {
  let animalOlderThen;
  data.species.forEach((specie) => {
    if (specie.name === animal) {
      animalOlderThen = (specie.residents.every((resident) => resident.age >= age));
    }
  });
  return animalOlderThen;
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((employe) => employe.firstName === employeeName || employe.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const object = { ...personalInfo, ...associatedWith };
  return object;
}

function isManager(id) {
  if (id === stephanieId || id === olaId || id === burlId) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees.push(newEmployee);
}

function countAnimals(species) {
  let animalsObject = {};
  let animalsCount = 0;
  if (!species) {
    data.species.forEach((specie) => {
      animalsObject[specie.name] = specie.residents.length;
    });
    return animalsObject;
  }
  data.species.forEach((specie) => {
    if (specie.name === species) {
      animalsCount = specie.residents.length;
    }
  });

  return animalsCount;
}

function calculateEntry(entrants) {
  let total = 0;
  Object.keys(entrants).forEach((key) => {
    if (key === 'Adult') {
      total += entrants[key] * data.prices.Adult;
    } else if (key === 'Senior') {
      total += entrants[key] * data.prices.Senior;
    } else {
      total += entrants[key] * data.prices.Child;
    }
  });
  return total;
}

function animalMap() {
  const animalMapObject = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };

  data.species.forEach((specie) => {
    if (specie.location === 'NE') {
      animalMapObject.NE.push(specie.name);
    }
  });
  data.species.forEach((specie) => {
    if (specie.location === 'NW') {
      animalMapObject.NW.push(specie.name);
    }
  });
  data.species.forEach((specie) => {
    if (specie.location === 'SE') {
      animalMapObject.SE.push(specie.name);
    }
  });
  data.species.forEach((specie) => {
    if (specie.location === 'SW') {
      animalMapObject.SW.push(specie.name);
    }
  });

  return animalMapObject;
}

function getAnimalNames(name) {
  const residentsNames = [];
  data.species.forEach((specie) => {
    if (specie.name === name) {
      specie.residents.forEach((resident) => {
        residentsNames.push(resident.name);
      });
    }
  });
  return { [name]: residentsNames };
}

function getAnimalNamesBySex(name, sex) {
  const residentsNames = [];
  data.species.forEach((specie) => {
    if (specie.name === name) {
      specie.residents.forEach((resident) => {
        if (resident.sex === sex) {
          residentsNames.push(resident.name);
        }
      });
    }
  });
  return { [name]: residentsNames };
}

function animalWithNameMap(object) {
  Object.keys(object).forEach((region) => {
    object[region].forEach((animal, index) => {
      object[region][index] = getAnimalNames(animal);
    });
  });
}

function animalWithNameMapBySex(object, sex) {
  Object.keys(object).forEach((region) => {
    object[region].forEach((animal, index) => {
      object[region][index] = getAnimalNamesBySex(animal, sex);
    });
  });
}

function animalsSort(object, sort) {
  if (sort === true) {
    Object.keys(object).forEach((region) => {
      object[region].forEach((animal) => {
        animal[Object.keys(animal)].sort();
      });
    });
  }
}

function getAnimalMap(options = {}) {
  let objectAnimalMap = animalMap();

  if (options.includeNames === true) {
    if (options.sex !== undefined) {
      animalWithNameMapBySex(objectAnimalMap, options.sex);
    } else {
      animalWithNameMap(objectAnimalMap);
    }
    animalsSort(objectAnimalMap, options.sorted);
  }
  return objectAnimalMap;
}

function getSchedule(dayName) {
  let schedule = {};
  Object.keys(data.hours).forEach((day) => {
    schedule[day] = `Open from ${data.hours[day].open}am until ${(data.hours[day].close) - 12}pm`;
    if (day === 'Monday') {
      schedule[day] = 'CLOSED';
    }
  });

  if (dayName !== undefined) {
    return { [dayName]: schedule[dayName] };
  }
  return schedule;
}

console.log(getSchedule('Monday'));

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
  animalMap,
  animalsSort,
  animalWithNameMap,
  animalWithNameMapBySex,
  getAnimalNames,
  getAnimalNamesBySex,
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
