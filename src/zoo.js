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

const { prices, hours } = require('./data');
const data = require('./data');

const { species, employees } = data;

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.some((id) => id === specie.id));
}

// function getSpeciesByIds(...ids) {
//   return species.filter((value, index) => value.id === ids[index]);
// };

function getAnimalsOlderThan(animal, age) {
  return species.find((specie) => specie.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.filter(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName)[0];
}

// function getEmployeeByName(employeeName) {
//   if (employeeName === undefined) {
//     return {};
//   }
//   const obj = employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
//   return obj;
// }
// console.log(getEmployeeByName('Nigel'));

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function countAnimals(species1) {
  const obj = species.reduce((specieAccumulator, specie) => {
    specieAccumulator[specie.name] = specie.residents.length;
    return specieAccumulator;
  }, {});
  if (species1 !== undefined) {
    return obj[species1];
  }
  return obj;
}

// function countAnimals(species1) {
//   if(species1 === undefined) {
//    return species.map((specie) => `${specie.name}: ${specie.residents.length}`);
//   }
//   return species.find((specie) => specie.name === species1).residents.length;
// }
// console.log(countAnimals('lions'));

function calculateEntry(entrants) {
  // if (!entrants || Object.keys(entrants).length === 0) {
  //   return 0;
  // }

  // if (!entrants.Adult) {
  //   entrants.Adult = 0;
  // }

  // if (!entrants.Senior) {
  //   entrants.Senior = 0;
  // }

  // if (!entrants.Child) {
  //   entrants.Child = 0;
  // }

  // const tickets = [
  //   entrants.Adult,
  //   entrants.Senior,
  //   entrants.Child,
  // ];
  // const arrayPrices = Object.values(prices);
  // let multi = [];
  // tickets.forEach((ammount, index) => {
  //   multi.push(ammount * arrayPrices[index]);
  // });
  // let sumPrices = multi[0] + multi[1] + multi[2];
  // return sumPrices;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let list = {};
  const workingDays = Object.keys(hours);
  workingDays.forEach((day) => {
    let open1 = hours[day].open;
    let close1 = hours[day].close;
    if (day !== 'Monday') {
      list[day] = `Open from ${open1}am until ${close1 - 12}pm`;
    } else {
      list[day] = 'CLOSED';
    }
  });
  if (!dayName) {
    return list;
  }
  return { [dayName]: list[dayName] };
}

function getOldestFromFirstSpecies(id) {
  let firstAnimal = employees.find((employee) => id === employee.id).responsibleFor[0];
  let arrayOfAnimals = getSpeciesByIds(firstAnimal);
  let objOfAnimals = arrayOfAnimals[0];
  let objOfSpecie = objOfAnimals.residents;
  let oldestAnimal = objOfSpecie.sort((a, b) => b.age - a.age)[0];
  return Object.values(oldestAnimal);
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
