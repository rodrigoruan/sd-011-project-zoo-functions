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
  return data.species.filter((e) => ids.includes(e.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species
    .find((animals) => animal.includes(animals.name))
    .residents.every((animals) => animals.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees
    .find((person) => employeeName.includes(person.firstName) || employeeName.includes(person.lastName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  // Recebi ajuda de Laura Gusmão e Mikaela Braga
  return data.employees
    .some((person) => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newPerson = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newPerson);
  return newPerson;
}

function countAnimals(species) {
  if (species === undefined) {
    return data.species.reduce((acc, animals) => {
      acc[animals.name] = animals.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((animals) => animals.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  // Recebi ajuda de Mikaela Braga
  return Object.keys(entrants)
    .reduce((acc, person) => acc + entrants[person] * data.prices[person], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const obj = Object.keys(data.hours).reduce((acc, cv, index) => {
    acc[cv] = `Open from ${Object.values(data.hours)[index].open}am until ${Object.values(data.hours)[index].close - 12}pm`;
    if (cv === 'Monday') {
      acc.Monday = 'CLOSED';
    }
    return acc;
  }, {});
  if (dayName === undefined) {
    return obj;
  }
  return Object.keys(obj).reduce((acc, cv, index) => {
    if (cv === dayName) {
      acc[cv] = Object.values(obj)[index];
    }
    return acc;
  }, {});
}
function getOldestFromFirstSpecies(id) {
  const person = data.employees.reduce((acc, element) => {
    if (element.id.includes(id)) {
      acc = element;
    }
    return acc;
  }, {});
  let animal = person.responsibleFor[0];
  animal = data.species
    .find((animals) => animals.id.includes(animal))
    .residents.sort((ageA, ageB) => ageB.age - ageA.age);
  return Object.values(animal[0]);
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((value) => {
    data.prices[value] += data.prices[value] * (percentage / 100);
    data.prices[value] = Math.round(data.prices[value] * 100) / 100;
  });
}

function getNameAnimals() {
  return data.employees.map((person) => data.species.reduce((acc2, animal) => {
    for (let index in person.responsibleFor) {
      if (person.responsibleFor[index] === animal.id) {
        acc2[index] = animal.name;
      }
    }
    return acc2;
  }, []));
}

function getEmployeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return data.employees.reduce((acc2, value, index) => {
      acc2[`${value.firstName} ${value.lastName}`] = getNameAnimals()[index];
      return acc2;
    }, {});
  }

  return data.employees.reduce((acc, value, index) => {
    if (value.id === idOrName || value.firstName === idOrName || value.lastName === idOrName) {
      acc[`${value.firstName} ${value.lastName}`] = getNameAnimals()[index];
    }
    return acc;
  }, {});
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
