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

const data = require('./data');
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

function getOldestFromFirstSpecies(tag) {
  const responsible = employees.find((employee) => employee.id === tag).responsibleFor[0];
  const oldestAnimal = species.find((specie) => specie.id === responsible).residents.sort((a, b) => b.age - a.age);

  return Object.values(oldestAnimal[0]);
}

function increasePrices(percentage) {
  const entries = data.prices;
  // ?importar novamente para alterar a referencia
  const increase = percentage / 100 + 1;

  Object.keys(entries).forEach((price) => { entries[price] = Math.round((entries[price] * increase) * 100) / 100; });

  return entries;
}

function getEmployeeCoverage(idOrName) {
  const employeeCoverage = {};

  // employees.forEach((employee) => {
  //   const coveredAnimals = employee.responsibleFor.map((id) => {for (const specie of species) {
  //     (specie.id === id) ? specie.name
  //   }));
  //   employeeCoverage[`${employee.firstName} ${employee.lastName}`] = coveredAnimals;
  // });

  // if (!day) return employeeCoverage;
  // else {
  //   return ;
  // }
  if (!idOrName) {
    employees.forEach((employee) => {
      employeeCoverage[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((animalId) => species.find((specie) => specie.id === animalId).name);
    });
  }

  employees.forEach((employee) => {
    if (employee.firstName === idOrName || employee.lastName === idOrName || employee.id === idOrName) {
      employeeCoverage[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((covered) => species.find((animal) => animal.id === covered).name);
    }
  });

  return employeeCoverage;
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
