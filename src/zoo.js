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

const { species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const speciesById = [];
  if (!ids) return speciesById;
  // early return || escape condition
  ids.forEach((id) => {
    const speciesFound = data.species.find((specie) => specie.id === id);
    speciesById.push(speciesFound);
  });
  return speciesById;
}

function getAnimalsOlderThan(animal, age) {
  let overageResidents = 0;

  for (const specie of species) {
    let residents = specie.residents;

    if (specie.name === animal) {
      for (const resident of residents) {
        if (resident.age >= age) {
          overageResidents += 1;
        };
      };
      if (overageResidents === residents.length) {
        return true;
      } else {
        return false;
      };
    };
  };
}

function getEmployeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(species) {
  // seu código aqui
}

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
