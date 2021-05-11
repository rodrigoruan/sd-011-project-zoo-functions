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
  if (entrants) {
    let { Adult = 0, Senior = 0, Child = 0 } = entrants;
    return (Adult * 49.99 + Senior * 24.99 + Child * 20.99);
  }

  return 0;
}

/* FUNCTION GET ANIMAL MAP */
function locationsFunctions() {
  let locationsFctn = data.species.reduce((acc, curr) => {
    acc[curr.location] = [];
    return acc;
  }, {});
  return locationsFctn;
}

function locationKeys(options, locations) {
  const locationKey = Object.keys(locations);
  locationKey.forEach((location) => {
    locations[location] = locations[location].map((specieName) => {
      const specieObj = data.species.find((spc) => specieName === spc.name);
      let residents = [];

      if (options.sex) {
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

function getAnimalMap(options = {}) {
  const locations = locationsFunctions();
  const theOptions = options;

  data.species.forEach((specie) => {
    locations[specie.location].push(specie.name);
  });

  if (theOptions.includeNames) {
    locationKeys(theOptions, locations);
  }

  return locations;
}

function onlyDay(day) {
  const schedule = {
    Tuesday: { open: 8, close: 18 },
    Wednesday: { open: 8, close: 18 },
    Thursday: { open: 10, close: 20 },
    Friday: { open: 10, close: 20 },
    Saturday: { open: 8, close: 22 },
    Sunday: { open: 8, close: 20 },
    Monday: { open: 0, close: 0 },
  };

  if (day === 'Monday') {
    return { [day]: 'CLOSED' };
  }

  return { [day]: `Open from ${schedule[day].open}am until ${schedule[day].close - 12}pm` };
}

function getSchedule(dayName) {
  if (dayName !== undefined) {
    return onlyDay(dayName);
  }

  const scheduleObj = (schedule = data.hours) => {
    Object.keys(schedule).forEach((key) => {
      if (schedule[key].open !== 0) {
        schedule[key] = `Open from ${schedule[key].open}am until ${schedule[key].close - 12}pm`;
      } else { schedule[key] = 'CLOSED'; }
    });

    return schedule;
  };

  return scheduleObj();
}

function getOldestFromFirstSpecies(id) {
  const employ = data.employees.find((employee) => employee.id === id);
  const firstSpecies = data.species.find((firstSpecie) => firstSpecie.id === employ.responsibleFor[0]);
  let ageArray = () => {
    let age = [];
    for (let i = 0; i < firstSpecies.residents.length; i += 1) {
      age.push(firstSpecies.residents[i].age);
    }
    age.sort((a, b) => b - a);
    return age;
  };
  const result = firstSpecies.residents.find((resident) => resident.age === ageArray()[0]);
  return [result.name, result.sex, result.age];
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
