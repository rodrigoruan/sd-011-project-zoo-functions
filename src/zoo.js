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
// solução com o apoio do plantão e consultas aos sites:
// https://desenvolvimentoparaweb.com/javascript/every-some-find-includes-javascript/
// https://renatofreire.dev/metodos-do-array-includes-javascript/

const data = require('./data');

function getSpeciesByIds(...ids) {
  const animalIds = data.species.filter((specie) => ids.includes(specie.id));
  return animalIds;
}
// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

// const { species } = require('./data');

// const data = require('./data');
// solução com o apoio do plantão e consultas aos sites:
// https://desenvolvimentoparaweb.com/javascript/every-some-find-includes-javascript/
// https://medium.com/reactbrasil/curtinhas-javascript-map-filter-e-reduce-1987502d679c

function getAnimalsOlderThan(animal, age) {
  const checkAnimal = data.species.find((specieName) => specieName.name === animal);
  const checkAge = checkAnimal.residents.every((specieAge) => specieAge.age >= age);
  return checkAge;
}
// console.log(getAnimalsOlderThan('otters', 7));
// console.log(getAnimalsOlderThan('penguins', 10));

// solução com o apoio da aula de revisão de Trybers e consultas aos sites:
// https://www.youtube.com/watch?v=rAzHvYnQ8DY
// https://www.youtube.com/watch?v=nYRIRZBHQ3s
// const { employees } = require('./data');

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const employeeData = data.employees.find((employee) => employeeName === employee.firstName || employeeName === employee.lastName);
  return employeeData;
}

// console.log(getEmployeeByName());
// console.log(getEmployeeByName('Emery'));
// console.log(getEmployeeByName('Wishart'));

//Solução com o apoio dos colegas Matheus Alexandre, Vinicius Gouveia e Alberto Candido

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

const { employees, prices } = require('./data');

//Solução com o apoio dos colegas Matheus Alexandre, Vinicius Gouveia e Alberto Candido

function isManager(id) {
  // const checkManager = employees.some((employee) => id === employees.id);
  const checkPerson = employees.some((employee) => (id === employees.id || employee.managers.includes(id)));
  return checkPerson;
}

// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

//Solução com o apoio dos colegas Matheus Alexandre, Vinicius Gouveia e Alberto Candido

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id, firstName, lastName, managers, responsibleFor,
  };
  return employees.push(newEmployee);
}

//Solução com o apoio dos colegas Matheus Alexandre, Vinicius Gouveia e Alberto Candido

function countAnimals(species) {
  const animalQtd = data.species.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});

  if (!species) {
    return animalQtd;
  }
  return animalQtd[species];
}
// console.log(countAnimals());

//Solução com o apoio dos colegas Matheus Alexandre, Vinicius Gouveia e Alberto Candido

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
  }
  function soma({ Adult = 0, Child = 0, Senior = 0 }) {
    let entrySum = 0;
    entrySum += ((Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior));
    return entrySum;
  }
  return soma(entrants);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

//Solução com o apoio dos colegas Matheus Alexandre, Vinicius Gouveia e Alberto Candido

function getOldestFromFirstSpecies(id) {
  const employeeData = data.employees.find((employee) => id === employee.id).responsibleFor[0];
  const speciesOld = data.species.find((specie) => specie.id === employeeData).residents.sort((age1, age2) => age2.age - age1.age)[0];
  return [speciesOld.name, speciesOld.sex, speciesOld.age];
}
// console.log(getOldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

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
