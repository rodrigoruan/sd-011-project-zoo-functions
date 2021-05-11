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

const { TestScheduler } = require('jest');
const { species, employees, prices, hours } = require('./data');
const data = require('./data');

// função que retorna o objeto de uma determinada espécie, de acordo com parâmetro dado ('name' ou 'id')
function findSpecie(nameOrId, propertySpecie) {
  return (species.filter((specie) => specie[propertySpecie] === nameOrId))[0];
}

function getSpeciesByIds(...ids) {
  let arraySpeciesById = [];
  ids.forEach((id) => arraySpeciesById.push(findSpecie(id, 'id')));
  return arraySpeciesById;
}

function getAnimalsOlderThan(animal, age) {
  let allResidentsOlderThan;
  species.forEach((specie) => {
    if (specie.name === animal) {
      allResidentsOlderThan = specie.residents.every((resident) => resident.age > age);
    }
  });
  return allResidentsOlderThan;
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function countAnimals(animal) {
  let allSpecies = {};
  species.forEach((specie) => {
    allSpecies[specie.name] = (specie.residents).length;
  });

  if (!animal) {
    return allSpecies;
  }
  return allSpecies[animal];
}

function calculateEntry(entrants) {
  let totalEntrance = 0;
  if (!entrants) {
    return totalEntrance;
  }
  Object.keys(entrants).forEach((entrance) => {
    totalEntrance += prices[entrance] * entrants[entrance];
  });
  return totalEntrance;
}

function createAnimalMap() {
  let locationsAndSpecies = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  Object.keys(locationsAndSpecies).forEach((location) => {
    const speciesbyLocation = species.filter((specie) => location === specie.location);
    locationsAndSpecies[location] = speciesbyLocation.map((element) => element.name);
  });
  return locationsAndSpecies;
}

function mapWithResidents(options) {
  let locationsAndSpecies = createAnimalMap();
  Object.keys(locationsAndSpecies).forEach((location) => {
    locationsAndSpecies[location].forEach((element, index) => {
      let arrayResidents = findSpecie(element, 'name').residents;

      if (options.sex) { // quando definido o sexo
        let residentsNames = arrayResidents.filter((resident) => resident.sex === options.sex);
        residentsNames = { [locationsAndSpecies[location][index]]: residentsNames.map((resident) => resident.name) };
        locationsAndSpecies[location][index] = residentsNames;
      } else {
        let residentsNames = { [locationsAndSpecies[location][index]]: arrayResidents.map((resident) => resident.name) };
        locationsAndSpecies[location][index] = residentsNames;
      }
    });
  });
  return locationsAndSpecies;
}

function sortNames(object) {
  Object.keys(object).forEach((location) => {
    object[location].forEach((specie) => {
      Object.values(specie).forEach((animal) => animal.sort());
    });
  });
  return object;
}

const animalsWithName = (options) => {
  if (options.sex) {
    if (options.sorted) {
      return sortNames(mapWithResidents(options));
    }
    return mapWithResidents(options);
  } if (options.sorted) {
    return sortNames(mapWithResidents(options));
  }
  return mapWithResidents(options);
};

function getAnimalMap(options) {
  if (!options || !options.includeNames) {
    return createAnimalMap();
  }
  if (options.includeNames) {
    return animalsWithName(options);
  }
}

function getSchedule(dayName) {
  let objectSchedule = {};
  Object.keys(hours).map((day) => Object.keys(hours[day]).forEach(() => {
    if (hours[day].open === 0) {
      objectSchedule[day] = 'CLOSED';
    } else {
      objectSchedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  }));

  if (!dayName) {
    return objectSchedule;
  }
  const daySchedule = { [dayName]: objectSchedule[dayName] };
  return daySchedule;
}

function getOldestFromFirstSpecies(id) {
  const firstSpecie = (employees.find((employee) => employee.id === id)).responsibleFor[0];
  const objectSpecie = species.find((specie) => specie.id === firstSpecie);
  const findOldestResident = objectSpecie.residents.reduce((oldestResident, resident) => {
    if (oldestResident.age < resident.age) {
      return resident;
    }
    return oldestResident;
  });

  const arrayOldestSpecie = Object.values(findOldestResident);
  return arrayOldestSpecie;
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((entrance) => {
    prices[entrance] = Math.round(prices[entrance] * (1 + (percentage * 0.01)) * 100) / 100;
  });
}

// função que retorna array com os nomes dos animais que o funcionário cuida / parâmetro é o objeto do funcionário
function generateArrayCoverage(objectEmployee) {
  return objectEmployee.responsibleFor.map((specieId) => findSpecie(specieId, 'id').name);
}

function getEmployeeCoverage(idOrName) {
  let employeesAndSpecies = {};
  employees.forEach((employee) => {
    let temporaryString = `${employee.firstName} ${employee.lastName}`;
    employeesAndSpecies[temporaryString] = generateArrayCoverage(employee);
  });

  if (!idOrName) {
    return employeesAndSpecies;
  }
  const objectEmployee = employees.find((employee) => employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  const fullNameEmployee = `${objectEmployee.firstName} ${objectEmployee.lastName}`;
  return { [fullNameEmployee]: employeesAndSpecies[fullNameEmployee] };
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
