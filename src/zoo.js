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
  // seu código aqui
  return data.species.filter((animal) => ids.some((id) => id === animal.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((animals) => animals.name === animal).residents.every((residentAge) => residentAge.age > age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  return employeeName ? data.employees.filter((Employee) => Employee.firstName === employeeName || Employee.lastName === employeeName)[0] : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((employees) => employees.managers.some((value) => value === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  if (!species) {
    return data.species.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specieName) => specieName.name === species).residents.length;
}

function calculateEntry(entrants = 0) {
  // seu código aqui
  return Object.entries(entrants).reduce((acc, person) => acc + (person[1] * data.prices[person[0]]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  if (!dayName) {
    dayName = Object.entries(data.hours);
  } else {
    dayName = Object.entries(data.hours).filter((date) => date[0] === dayName);
  }
  return dayName.reduce((acc, day) => {
    if (day[0] === 'Monday') {
      acc[day[0]] = 'CLOSED';
      return acc;
    }
    acc[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    return acc;
  }, {});
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const idAnimal = data.employees.find((empoyer) => empoyer.id === id).responsibleFor[0];
  const firstAnimal = data.species.find((nameSpecie) => nameSpecie.id === idAnimal).residents.filter((res, _, arr) => res.age === arr.reduce((acc, value) => Math.max(acc, value.age), 0))[0];
  const { name, sex, age } = firstAnimal;
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  let { Adult, Senior, Child } = data.prices;
  Child = Number(Child);
  Senior = Number(Senior);
  Adult = Number(Adult);

  Child += ((percentage * Child) / 100) + 0.001;
  Senior += ((percentage * Senior) / 100) + 0.001;
  Adult += ((percentage * Adult) / 100) + 0.001;
  data.prices.Adult = Number(Adult.toFixed(2));
  data.prices.Senior = Number(Senior.toFixed(2));
  data.prices.Child = Number(Child.toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  // let employerNames = [];
  // if (!idOrName) {
  //   employerNames = data.employees.map((employer) => [employer.firstName, employer.lastName]);
  // } else {
  //   employerNames = data.employees.filter((employe) => employe.id === idOrName || employe.firstName === idOrName || employe.lastName === idOrName ).map((employer) => [employer.firstName, employer.lastName]);
  // }
  // const animasIds = employerNames.map((employe) => data.employees.filter((animalId) => animalId.firstName === employe[0])[0].responsibleFor);
  // const animalsNames = animasIds.map((animalsName) => data.species.filter((anim) => animalsName.some((animal) => animal === anim.id)).map((nameAnimal) => nameAnimal.name));
  // const fullNames = employerNames.map((fullname) => `${fullname[0]} ${fullname[1]}`);
  // const objCoverage = fullNames.reduce((acc, element, index) => {
  //   acc[element] = animalsNames[index];
  //   return acc;
  // }, {})
  // return objCoverage;
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
