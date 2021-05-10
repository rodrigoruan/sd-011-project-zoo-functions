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

const { species } = require('./data');
const { employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  const animalFiltered = species.find((specie) => specie.name === animal);
  return animalFiltered.residents.every((animalAge) => animalAge.age >= age);
}

function getEmployeeByName(employeeName) {
  const employeeFiltered = employees.find((name) => (name.firstName === employeeName || name.lastName === employeeName));
  return (employeeFiltered === undefined) ? {} : employeeFiltered;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  let arrayIdManager = [];
  const listIdManager = employees.forEach((employee) => {
    let findIdManager = employee.managers;
    arrayIdManager.push(...findIdManager);
  });
  return arrayIdManager.some((idManager) => idManager === id);
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

function countAnimals(specie) {
  if (specie) {
    return species.find((animal) => specie === animal.name).residents.length;
  }
  let objSpecies = {};
  species.forEach((animal) => {
    objSpecies[animal.name] = animal.residents.length;
  });
  return objSpecies;
}

function calculateEntry(entrants) {
  let totalValue = 0;

  if (entrants) {
    Object.entries(entrants).forEach((entrant) => {
      const actualPrice = Object.entries(data.prices).find((price) => price[0] === entrant[0]);
      totalValue += (actualPrice[1] * entrant[1]);
    });
  }
  return totalValue;
}

function createArrayResidentsNames(residents, sex) {
  let arrayResidentsNames;

  if (sex) {
    const residentsSex = residents.filter((element) => element.sex === sex);
    arrayResidentsNames = residentsSex.map((resident) => resident.name);
    return arrayResidentsNames;
  }
  arrayResidentsNames = residents.map((specie) => specie.name);
  return arrayResidentsNames;
}

function createAnimalResidents(array, animal, sorted) {
  let objResidents = {};
  if (sorted) {
    objResidents[animal.name] = array.sort();
    return objResidents;
  }
  objResidents[animal.name] = array;
  return objResidents;
}

function createResidents(animal, animalsSelected) {
  return animalsSelected.find((element) => (element.name === animal.name)).residents;
}

function getAnimalMap(options) {
  const positions = ['NE', 'NW', 'SE', 'SW'];
  const objAnimals = {};

  if (options) {
    const { includeNames, sorted, sex } = options;
    if (includeNames === true) {
      const selectAnimalsPositions = positions.forEach((position) => {
        const arrayPosition = [];
        const animalsSelected = species.filter((specie) => specie.location === position);
        const animalsNames = animalsSelected.forEach((animal) => {
          const residents = createResidents(animal, animalsSelected);
          let residentsNames = createArrayResidentsNames(residents, sex);
          const objAnimalResidents = createAnimalResidents(residentsNames, animal, sorted);
          arrayPosition.push(objAnimalResidents);
        });
        objAnimals[position] = arrayPosition;
      });
      return objAnimals;
    }
  }
  const selectAnimalsPositions = positions.forEach((position) => {
    const animalsSelected = species.filter((specie) => specie.location === position);
    const arrayAnimal = animalsSelected.map((animal) => animal.name);
    objAnimals[position] = arrayAnimal;
  });
  return objAnimals;
}

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
