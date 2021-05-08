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
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.find((animalId) => specie.id === animalId));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.some((specie) => specie.name === animal && specie.residents.every((resident) => resident.age >= age));
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  if (id === '9e7d4524-363c-416a-8759-8aa7e50c0992'
    || id === 'fdb2543b-5662-46a7-badc-93d960fdc0a8'
    || id === '0e7b460e-acf4-4e17-bcb3-ee472265db83') {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (species) {
    const foundSpecies = data.species.find((animal) => animal.name === species);
    return foundSpecies.residents.length;
  }

  return data.species.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.residents.length;
    return accumulator;
  }, {});
}
// A segunda parte da função countAnimal foi baseada no exemplo do site "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"

function calculateEntry(entrants) {
  // seu código aqui
}

/*
const expected = {
  NE: ['lions', 'giraffes'],
  NW: ['tigers', 'bears', 'elephants'],
  SE: ['penguins', 'otters'],
  SW: ['frogs', 'snakes']
};
 */
function getAnimalMap(options = {}) {
  const locations = data.species.reduce((acc, curr) => {
    acc[curr.location] = [];
    return acc;
  }, {});

  data.species.forEach((specie) => {
    locations[specie.location].push(specie.name);
  });

  if (options.includeNames) {
    const locationKeys = Object.keys(locations);
    locationKeys.forEach((location) => {
      locations[location] = locations[location].map((specieName) => {
        const specieObj = data.species.find((spc) => specieName === spc.name);
        let residents = [];

        if (options.sex === 'male' || options.sex === 'female') {
          residents = specieObj.residents.filter((resident) => options.sex === resident.sex);
        } else {
          residents = specieObj.residents;
        }

        const names = residents.map((resident) => resident.name);

        if (options.sorted) {
          names.sort();
        }

        return { [specieName]: names };
      });
    });
  }

  return locations;
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
