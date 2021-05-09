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
  const speciesList = [];
  const { species } = data;
  if (!ids) {
    return speciesList;
  }
  species.forEach((animal) => {
    ids.forEach((id) => {
      if (id === animal.id) { speciesList.push(animal); }
    });
  });
  return speciesList;
}

function getAnimalsOlderThan(animal, minAge) {
  const { species } = data;
  const animalGroup = () => species.find((animals) => animals.name === animal);
  return animalGroup().residents.every((resident) => resident.age >= minAge);
}

function getEmployeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) { return {}; }
  return employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { employees } = data;
  personalInfo.managers = associatedWith.managers;
  personalInfo.responsibleFor = associatedWith.responsibleFor;
  employees.push(personalInfo);
  return personalInfo;
}

function isManager(id) {
  const { employees } = data;
  let validation = false;
  employees.forEach(({ managers }) => {
    managers.forEach((manager) => {
      if (manager === id) {
        validation = true;
      }
    });
  });
  return validation;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function countAnimals(speciesName) {
  const { species } = data;
  const finalObject = {};
  const animalGroup = () => species.find((speciesGroup) => speciesGroup.name === speciesName);
  if (!speciesName) {
    species.forEach((animals) => {
      finalObject[animals.name] = animals.residents.length;
    });
  } else {
    return animalGroup().residents.length;
  }
  return finalObject;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return ((Adult * 49.99) + (Child * 20.99) + (Senior * 24.99));
}

// function getAnimalMap(options = {}) {
//   const { species } = data;
//   const output = {}
//   const locations = ['NE','NW', 'SE', 'SW']
//   const filteredAnimals = () => {
//     const filteredLocation = species.filter(({ location }) => {
//     return output[location] === location;
//   })
//   }
//   if (options.length = 0) {
//     // return species.map((animal) => {
//     //   return output[animal.location] = species.filter(({ location }) => location === output[animal.location])
//     // })
//     location.forEach((locationFiltered) => {
//       output.locationFiltered = species.filter(({ location }) => location === output[locationFiltered])
//     })
//   }
// }

function returnAllAnimals() {
  const { species } = data;
  const outputObj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  Object.keys(outputObj).forEach((objLocation) => {
    const filteredAnimals = species.filter(({ location }) => location === objLocation)
      .map(({ name }) => name);
    outputObj[objLocation] = filteredAnimals;
  });
  return outputObj;
}

function getAnimalMap(options = {}) {
  const { includeNames, sorted, sex } = options;
  if (includeNames === true) {
    const { species } = data;
    const outputObj = {
      NE: [],
      NW: [],
      SE: [],
      SW: [],
    };
    Object.keys(outputObj).forEach((objLocation) => {
      const filteredAnimals = species.filter(({ location }) => objLocation === location).map(({ name, residents }) => {
        let animalNames = [];
        residents.forEach(({ name }) => {
          animalNames.push(name);
        });
        if (sorted === true) {
          animalNames.sort();
        }
        return { [name]: animalNames };
      });
      outputObj[objLocation] = filteredAnimals;
    });
    return outputObj;
  }
  return returnAllAnimals();
}

console.log(getAnimalMap({ includeNames: true }));
/// /////
// const { species } = data;
// const test = () => {
//   const filteredLocation = species.filter(({ location }) => {
//     return location === 'NE';
//   })
//   return filteredLocation.map((animals) => animals.name)
// }
// console.log(test())
/// //////

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
