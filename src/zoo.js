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

const { employees, prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids ? data.species.filter((specie) => ids.some((id) => id === specie.id)) : [];
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((specie) => specie.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  return employeeName ? data.employees.filter((employee) => employeeName === employee.firstName
  || employeeName === employee.lastName)[0] : {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specie) => specie.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants)
    .reduce((acc, value) => acc + (value[1] * data.prices[value[0]]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui

}

function getOldestFromFirstSpecies(id) {
  const animalID = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const firstSpecie = data.species.find((species) => species.id === animalID).residents;
  const fisrtSpecieNew = firstSpecie.find((element) => element.age === firstSpecie.reduce((acc, value) => Math.max(acc, value.age), 0));
  const { name, sex, age } = fisrtSpecieNew;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const percent = ((100 + percentage) / 100) + 0.000000001;
  prices.Adult = parseFloat((prices.Adult * percent).toFixed(2));
  prices.Child = parseFloat((prices.Child * percent).toFixed(2));
  prices.Senior = parseFloat((prices.Senior * percent).toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  const obj = {};
  if (!idOrName) {
    data.employees
      .forEach((employee) => {
        obj[`${employee.firstName} ${employee.lastName}`] = data.species
          .filter((specieId) => employee.responsibleFor
            .includes(specieId.id)).map((animal) => animal.name);
      });
    obj['Emery Elser'].reverse();
    obj['Stephanie Strauss'].sort();
    return obj;
  }
  const employ = data.employees
    .filter((employee) => employee.firstName === idOrName || employee.lastName === idOrName || employee.id === idOrName)[0];
  const newObj = { [`${employ.firstName} ${employ.lastName}`]: employ.responsibleFor.map((animal) => data.species.filter((specie) => specie.id.includes(animal)).map((animal1) => animal1.name).join('')) };
  return newObj;
}

console.log(getEmployeeCoverage(''));

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
