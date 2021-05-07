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
  if (ids.length === 0) {
    return [];
  }
  const idsFiltered = data.species.filter((value) => {
    console.log('------');
    console.log('value id', value.id, value.name);
    let existeElementoMatch = ids.includes(value.id);
    // for (let i = 0; i < ids.length; i += 1) {
    //   console.log(`verificando se ${value.id} === ${ids[i]}`);
    //   if (value.id === ids[i]) {
    //     existeElementoMatch = true;
    //     break;
    //   }
    // }
    console.log(`retornando ${existeElementoMatch} `);
    return existeElementoMatch;
  });
  return idsFiltered;
}

function getAnimalsOlderThan(animal, age) {
  const verifyAge = data.species.some((value) => {
    let condicao1 = value.name === animal;
    let condicao2 = value.residents.every((resident) => resident.age >= age);
    //  let condicao2 = true;
    //  for (let i = 0; i < value.residents.length; i +=1) {
    //    let currentAge = value.residents[i].age;
    //     if (currentAge < age) {
    //       condicao2 = false;
    //       break;
    //     }
    //  }
    return condicao1 && condicao2;
  });
  return verifyAge;
}

function getEmployeeByName(...employeeNames) {
  if (employeeNames.length === 0) {
    return {};
  }
  let firstOrSecondName = employeeNames[0];
  const verifyFirstName = data.employees.filter((value) => (value.firstName === firstOrSecondName || value.lastName === firstOrSecondName));
  return verifyFirstName[0];
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((value) => value.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function countAnimals(species) {
  if (species === undefined) {
    let response = data.species.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
    return response;
  }
  const result = data.species.filter((value) => value.name === species);
  return result[0].residents.length;
}
countAnimals();

function calculateEntry(entrants) {
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
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
