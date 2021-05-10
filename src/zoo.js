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

// const { species } = require('./data');
const { species, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((specie) => ids.find((id) => specie.id === id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const selectedAnimals = data.species.find((specie) => (animal === specie.name)).residents.every((resident) => (resident.age > age));
  return selectedAnimals;
}

// Requisito 03
const getEmployeeByName = (employeeName) => (!employeeName ? {} : data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName));

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const pushEmployee = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return pushEmployee;
}

function countAnimals(animal) {
  // seu código aqui
  if (animal) {
    return data.species.find((element) => element.name === animal).residents.length;
  }
  let result = {};
  data.species.forEach((bicho) => {
    result[bicho.name] = bicho.residents.length;
  });
  return result;
//   if (!speciesOfAnimals) {
//     const countAnimal = data.species.map(({ name }) => name);
//     const countResidentAnimals = data.species.map(({ residents }) => residents.length);
//     const listOfAnimals = (listAnimal, listResidentsAnimals) => listAnimal.map((animal, i) => ({ [animal]:
//     listResidentsAnimals[i] })
//   });
//   const animalsCounted = listOfAnimals(countAnimal, countResidentAnimals);
//   return Object.assign({}, ...animalsCounted)
// } else (speciesOfAnimals) {
//   const findAnimal = data.species.find((animal) => animal.name === species);
//   return findAnimal.residents.length;
// }
// };
}

function calculateEntry(entrants = 0) {
  // seu código aqui
  return Object.keys(entrants).reduce((acc, value) => acc + data.prices[value] * entrants[value], 0);
}

const animalsName = (options, sex, sorted) => {
  // if (sex) {
  //   if (sorted) {
  //     return sortNames(mapWithResidentsAndSex(options.sex));
  //   }
  //   return mapWithResidentsAndSex(options.sex);
  // } if (sorted) {
  //   return sortNames(mapWithResidents());
  // }
  // return mapWithResidents();
};

function getAnimalMap(options) {
  // seu código aqui
  // if (!options || !options.includeNames) {
  //   return createAnimalMap();
  // }
  // const sex = (options.sex === 'male' || options.sex === 'female');
  // const sorted = (options.sorted === true);
  // const includeNames = (options.includesNames === true);

  // if (includeNames) {
  //   return animalsName(options, sex, sorted);
  // }
}

function getSchedule(dayName) {
  // seu código aqui
  const week = Object.entries(data.hours);
  const humanCalendar = {};
  week.forEach((dayHour) => {
    if (dayHour[0] !== 'Monday') humanCalendar[dayHour[0]] = `Open from ${dayHour[1].open}am until ${dayHour[1].close % 12}pm`;
    if (dayHour[0] === 'Monday') humanCalendar[dayHour[0]] = 'CLOSED';
  });
  if (typeof dayName === 'undefined') return humanCalendar;
  return { [dayName]: humanCalendar[dayName] };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const foundFirstAnimal = data.employees.find((person) => person.id === id).responsibleFor[0];
  const foundAnimal = data.species.find((animal) => animal.id === foundFirstAnimal);
  const oldestAge = foundAnimal.residents.reduce((acc, current) => ((current.age > acc) ? current.age : acc), 0);
  const oldestAnimal = foundAnimal.residents.find((currentResident) => currentResident.age === oldestAge);
  return Object.values(oldestAnimal);

  // const foundFirstAnimal = data.employees.find((person) => person.id === id).responsibleFor[0];
  // const foundAnimal = data.species.find((animal) => animal.id === foundFirstAnimal);
  // const oldestAge = Math.max.apply(Math, foundAnimal.residents.map(function (o) { return o.age; }));
  // const oldestAnimal = foundAnimal.residents.find((currentResident) => currentResident.age === oldestAge);
  // return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  // seu código aqui
  const pricesByAgeGroup = Object.entries(data.prices);
  pricesByAgeGroup.forEach((priceGroup) => {
    priceGroup[1] *= (1 + percentage / 100);
    data.prices[`${priceGroup[0]}`] = Math.round(priceGroup[1] * 100) / 100;
  });
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
