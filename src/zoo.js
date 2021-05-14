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
  let arrayIds = [];
  data.species.forEach((animal) => {
    if (ids.includes(animal.id)) {
      arrayIds.push(animal);
    }
  });
  return arrayIds;
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((bicho) => bicho.name === animal).residents.every((elementos) => elementos.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  let empregados;
  if (employeeName === undefined) {
    empregados = {};
  } else {
    empregados = data.employees.find((element) => element.firstName === employeeName || element.lastName === employeeName);
  }
  return empregados;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  let newObject = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newObject;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((element) => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newEmployee);
}

function countAnimals(species) {
  // seu código aqui
  let retorno = {};
  if (species === undefined) {
    data.species.forEach((element) => {
      retorno[`${element.name}`] = element.residents.length;
    });
  } else {
    retorno = data.species.find((element) => element.name === species).residents.length;
  }
  return retorno;
}

let adult = 0;
let senior = 0;
let child = 0;

function calculateParameter(element, entrants) {
  if (element === 'Adult') adult = entrants.Adult;
  if (element === 'Senior') senior = entrants.Senior;
  if (element === 'Child') child = entrants.Child;
}

function calculateEntry(entrants) {
  // seu código aqui
  let retorno = 0;
  if (entrants !== undefined && Object.keys(entrants).length !== 0) {
    Object.keys(entrants).forEach((element) => {
      calculateParameter(element, entrants);
    });
    retorno = (adult * 49.99) + (senior * 24.99) + (child * 20.99);
  }
  adult = 0;
  senior = 0;
  child = 0;
  return retorno;
}

function getAnimalMap(options) {
  // seu código aqui

}

function getSchedule(dayName) {
  // seu código aqui
  let retorno = { [`${dayName}`]: 'CLOSED' }; const chaves = Object.keys(data.hours); const valores = Object.values(data.hours);
  if (dayName === undefined) {
    retorno = {};
    chaves.forEach((element, index) => {
      retorno[`${element}`] = `Open from ${valores[index].open}am until ${valores[index].close - 12}pm`;
    });
    retorno.Monday = 'CLOSED';
  }
  if (dayName !== 'Monday' && dayName !== undefined) {
    retorno = {};
    const keys = Object(data.hours[`${dayName}`]);
    retorno = { [`${dayName.toString()}`]: `Open from ${keys.open}am until ${keys.close - 12}pm` };
  }
  return retorno;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const animal = data.employees.find((element) => element.id === id).responsibleFor[0];
  const bicho = data.species.find((element) => element.id === animal);
  let maisVelho = bicho.residents[0];
  bicho.residents.forEach((element) => {
    if (element.age > maisVelho.age) {
      maisVelho = element;
    }
  });
  const array = Object.values(maisVelho);
  return array;
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
