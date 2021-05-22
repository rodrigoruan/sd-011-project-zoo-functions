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

// PROJECT ZOO FUNCTIONS
// Gabriel Lennox - TRYBE T11

const { species, employees, prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  const speciesById = [];
  if (!ids) return speciesById;
  // early return || escape condition
  ids.forEach((id) => {
    const speciesFound = species.find((specie) => specie.id === id);
    speciesById.push(speciesFound);
  });
  return speciesById;
}

function getAnimalsOlderThan(animal, age) {
  // !complexidade acima do permitido
  // let overageResidents = 0;

  // for (const specie of species) {
  //   let residents = specie.residents;

  //   if (specie.name === animal) {
  //     for (const resident of residents) {
  //       if (resident.age >= age) {
  //         overageResidents += 1;
  //       }
  //     }

  //     if (overageResidents === residents.length) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // }
  const speciesFound = species.find((specie) => specie.name === animal);
  return speciesFound.residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  const employeeByName = {};

  if (!employeeName) return employeeByName;

  const employeeFound = employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);

  return employeeFound;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const managerFound = employees.some((employee) => employee.managers.includes(id));
  return managerFound;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // estruturacao de novo objeto
  // *importante declarar tipos de valores
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
  // sem retorno
  // ?modifica array
}

function countAnimals(specie) {
  if (specie !== undefined) {
    const speciesFound = species.find((animal) => animal.name === specie);
    return speciesFound.residents.length;
  }
  return species.reduce((acc, crr) => {
    acc[crr.name] = crr.residents.length;
    return acc;
  }, {});
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  // !HOF nao itera objetos
  return Object.keys(entrants).reduce((acc, crr) => acc + entrants[crr] * prices[crr], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const schedule = {};

  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') schedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    else schedule[day] = 'CLOSED';
  });

  if (dayName) {
    return { [dayName]: schedule[dayName] };
  }

  return schedule;
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
