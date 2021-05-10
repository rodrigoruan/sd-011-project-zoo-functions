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

const { TestScheduler } = require('jest');
const { species, employees, prices, hours } = require('./data');
const data = require('./data');

// função que retorna objeto dentro de um array, de acordo com parâmetro dado (nome ou id)
const findSpecie = (nameOrId, propertySpecie) => species.filter((specie) => specie[propertySpecie] === nameOrId);

function getSpeciesByIds(...ids) {
  let arraySpeciesById = [];
  ids.forEach((id) => arraySpeciesById.push(findSpecie(id, 'id')[0]));
  return arraySpeciesById;
}

function getAnimalsOlderThan(animal, age) {
  let allResidentsOlderThan;
  species.forEach((specie) => {
    if (specie.name === animal) {
      allResidentsOlderThan = specie.residents.every((resident) => resident.age > age);
    }
  });
  return allResidentsOlderThan;
}

function getEmployeeByName(employeeName) {
  if (typeof (employeeName) === 'undefined') {
    return {};
  }
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers[0] === id || employee.managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function countAnimals(animal) {
  let allSpecies = {};
  species.forEach((specie) => {
    allSpecies[specie.name] = (specie.residents).length;
  });

  if (!animal) {
    return allSpecies;
  }
  return allSpecies[animal];
}

function calculateEntry(entrants) {
  let totalEntrance = 0;
  if (!entrants) {
    return totalEntrance;
  }
  Object.keys(entrants).forEach((entrance) => {
    totalEntrance += prices[entrance] * entrants[entrance];
  });
  return totalEntrance;
}

function createAnimalMap(hello) {
  let locationsAndSpecies = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  Object.keys(locationsAndSpecies).forEach((location) => {
    const speciesbyLocation = species.filter((specie) => location === specie.location);
    locationsAndSpecies[location] = speciesbyLocation.map((element) => element.name);
    
  });
  const teste = Object.values(locationsAndSpecies).forEach((animal) => findSpecie(animal, 'name').residents)

  return locationsAndSpecies;
}

function getAnimalMap(options) {

  // refatorar
   if (!options) {
    return createAnimalMap();
  } else if (options.includeNames === true) {
    if (options.sex === 'male') {
      return 'teste1'
    } else if (options.sex === 'female') {
      return 'teste2'
    } if (options.sorted === true) {
      return 'teste4'
    }
    return 'teste3'   
  }
}

// console.log(getAnimalMap({ includeNames: true}))

function getSchedule(dayName) {
  let objectSchedule = {};
  Object.keys(hours).map((day) => Object.keys(hours[day]).forEach(() => {
    if (hours[day].open === 0) {
      objectSchedule[day] = 'CLOSED';
    } else {
      objectSchedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  }));
  if (!dayName) {
    return objectSchedule;
  }
  const daySchedule = { [dayName]: objectSchedule[dayName] };
  return daySchedule;
}

function getOldestFromFirstSpecies(id) {
  const firstSpecie = (employees.find((employee) => employee.id === id)).responsibleFor[0];
  const objectSpecie = species.find((specie) => specie.id === firstSpecie);
  const findOldestResident = objectSpecie.residents.reduce((oldestResident, resident) => {
    if (oldestResident.age < resident.age) {
      return resident;
    }
    return oldestResident;
  });

  const arrayOldestSpecie = Object.values(findOldestResident).map((element) => element);
  return arrayOldestSpecie;
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((entrance) => {
    prices[entrance] = Math.round(prices[entrance] * (1 + (percentage * 0.01)) * 100) / 100;
  });
}

// função que retorna array com os nomes dos animais que cuida
const generateArrayCoverage = (objectEmployee) => objectEmployee.responsibleFor.map((specieId) => findSpecie(specieId, 'id')[0].name);

function getEmployeeCoverage(idOrName) {
  let employeesAndSpecies = {};
  employees.forEach((employee) => {
    let temporaryString = `${employee.firstName} ${employee.lastName}`;
    employeesAndSpecies[temporaryString] = generateArrayCoverage(employee);
  });

  if (!idOrName) {
    return employeesAndSpecies;
  }
  const objectEmployee = employees.find((employee) => employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  const fullNameEmployee = `${objectEmployee.firstName} ${objectEmployee.lastName}`;

  return { [fullNameEmployee]: employeesAndSpecies[fullNameEmployee] };
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
