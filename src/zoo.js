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

const { species } = data;

function getSpeciesByIds(...ids) {
  let result = [];
  ids.forEach((id) => {
    species.forEach((specie) => {
      if (specie.id === id) result.push(specie);
    });
  });
  return result;
}

function getAnimalsOlderThan(animal, age) {
  let result = true;
  species.forEach((specie, index) => {
    if (specie.name === animal) {
      const { residents } = species[index];
      residents.forEach((resident) => {
        if (resident.age < age) result = false;
      });
    }
  });
  return result;
}

const { employees } = data;

function getEmployeeByName(employeeName) {
  let result = {};
  employees.forEach((employee) => {
    if (employee.firstName === employeeName || employee.lastName === employeeName) {
      result = employee;
    }
  });
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const managersGroups = employees.map((employee) => employee.managers);
  let managers = [];
  managersGroups.forEach((managerGroup) => {
    managers = [...managers, ...managerGroup];
  });
  const result = managers.some((manager) => manager === id);
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees = [...data.employees, {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  }];
}

function countAnimals(searchSpecie) {
  let result = {};
  if (searchSpecie === undefined) {
    species.forEach((specie) => {
      result[specie.name] = specie.residents.length;
    });
    return result;
  }
  const selectedSpecie = species.find((specie) => specie.name === searchSpecie);
  result = selectedSpecie.residents.length;
  return result;
}

const { prices } = data;

function calculateEntry(entrants = { Adult: 0, Child: 0, Senior: 0 }) {
  let total = 0;
  if (entrants.Adult !== undefined) total = entrants.Adult * prices.Adult;
  if (entrants.Child !== undefined) total += entrants.Child * prices.Child;
  if (entrants.Senior !== undefined) total += entrants.Senior * prices.Senior;
  return total;
}

const namedAnimalMap = (result, includeNames) => {
  if (includeNames === false) return result; 
  const { NE, NW, SE, SW } = result;
  const newResult = result;
  NE.forEach((specieNE) => {
    newResult.NE[specieNE] = [];
    const specieInfoNE = species.find((specie) => specie.name === specieNE);
    specieInfoNE.residents.forEach((resident) => newResult.NE[specieNE].push(resident.name));
  });
  NW.forEach((specieNW) => {
    newResult.NW[specieNW] = [];
    const specieInfoNW = species.find((specie) => specie.name === specieNW);
    specieInfoNW.residents.forEach((resident) => newResult.NW[specieNW].push(resident.name));
  });
  SE.forEach((specieSE) => {
    newResult.SE[specieSE] = [];
    const specieInfoSE = species.find((specie) => specie.name === specieSE);
    specieInfoSE.residents.forEach((resident) => newResult.SE[specieSE].push(resident.name));
  });
  SW.forEach((specieSW) => {
    newResult.SW[specieSW] = [];
    const specieInfoSW = species.find((specie) => specie.name === specieSW);
    specieInfoSW.residents.forEach((resident) => newResult.SW[specieSW].push(resident.name));
  });
  return newResult;
};

const genreAnimalMap = (result, sex) => {

};

const sortedAnimalMap = (result, sorted) => {

};

function getAnimalMap(options = { includeNames: false, sex: '', sorted: false }) {
  const { includeNames, sex, sorted } = options;
  let result = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  }
  species.forEach((specie) => {
    if (specie.location === 'NE') result.NE.push(specie.name);
    if (specie.location === 'NW') result.NW.push(specie.name);
    if (specie.location === 'SE') result.SE.push(specie.name);
    if (specie.location === 'SW') result.SW.push(specie.name);
  });
  result = namedAnimalMap(result, includeNames);
  // result = genreAnimalMap(result, sex);
  // result = sortedAnimalMap(result, sorted);
  return result;
}

console.log(getAnimalMap({ includeNames: true}));

function getSchedule(dayName) {
  // seu código aqui
}

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
