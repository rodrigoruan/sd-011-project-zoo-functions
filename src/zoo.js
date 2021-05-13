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
  return employeeName ? data.employees.find((Employee) => Employee.firstName === employeeName || Employee.lastName === employeeName) : {};
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

const InsertAnimalNames = (objAll, animalNames, sorted) => {
  if (sorted) {
    objAll = Object.entries(objAll).reduce((acc, value) => {
      acc[value[0]] = value[1].map((animal) => ({ [animal]: animalNames[animal].sort() }));
      return acc;
    }, {});
    return objAll;
  }
  objAll = Object.entries(objAll).reduce((acc, value) => {
    acc[value[0]] = value[1].map((animal) => ({ [animal]: animalNames[animal] }));
    return acc;
  }, {});
  return objAll;
};

function getAnimalMap(options = {}) {
  // seu código aqui
  let objAll = data.species.reduce((acc, value) => {
    if (!acc[value.location]) {
      acc[value.location] = [];
    }
    acc[value.location].push(value.name);
    return acc;
  }, {});
  if (!options.includeNames) {
    return objAll;
  }
  let animalNames = {};
  if (options.sex) {
    animalNames = data.species.reduce((acc, value) => {
      acc[value.name] = value.residents.filter((al) => al.sex === options.sex).map((an) => an.name);
      return acc;
    }, {});
  } else {
    animalNames = data.species.reduce((acc, value) => {
      acc[value.name] = value.residents.map((al) => al.name);
      return acc;
    }, {});
  }
  objAll = InsertAnimalNames(objAll, animalNames, options.sorted);
  return objAll;
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
  Child += ((percentage * Child) / 100) + 0.001;
  Senior += ((percentage * Senior) / 100) + 0.001;
  Adult += ((percentage * Adult) / 100) + 0.001;
  data.prices.Adult = Number(Adult.toFixed(2));
  data.prices.Senior = Number(Senior.toFixed(2));
  data.prices.Child = Number(Child.toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  const employerNames = data.employees.map((employer) => [employer.firstName, employer.lastName, employer.responsibleFor]);
  const animalsNames = employerNames.map((animalsId) => animalsId[2].map((anima) => data.species.find((an) => an.id === anima).name));
  const fullNames = employerNames.map((fullname) => `${fullname[0]} ${fullname[1]}`);
  const objCoverage = fullNames.reduce((acc, element, index) => {
    acc[element] = animalsNames[index];
    return acc;
  }, {});
  if (!idOrName) {
    return objCoverage;
  }
  const employe = data.employees.find((value) => Object.values(value).find((values) => values === idOrName));
  const employeFullName = `${employe.firstName} ${employe.lastName}`;
  return ({ [employeFullName]: objCoverage[employeFullName] });
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
