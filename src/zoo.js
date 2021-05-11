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

const { species, employees, hours, prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((animal) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const animalTypeObject = species.find((oneSpecie) => oneSpecie.name === animal);
  return animalTypeObject.residents.every((element) => element.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  return employees.some((person) => person.managers.some((manage) => manage === id) === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function countAnimals(animalName) {
  if (animalName === undefined) {
    return species.reduce((allAnimals, animal) => {
      allAnimals[animal.name] = animal.residents.length;
      return allAnimals;
    }, {});
  }
  const animalSelected = species.find((animal) => animal.name === animalName);
  return animalSelected.residents.length;
}

function calculateEntry(entrants = {}) {
  const entries = [entrants.Adult, entrants.Child, entrants.Senior];
  const validEntry = entries.reduce((justValidEntry, entry) => {
    if (entry === undefined) {
      justValidEntry.push(0);
    } else {
      justValidEntry.push(entry);
    }
    return justValidEntry;
  }, []);
  return validEntry[0] * 49.99 + validEntry[1] * 20.99 + validEntry[2] * 24.99;
}

const findAnimalPerLocation = (location) => species.filter((animal) => animal.location === location);

function getAnimalMap(options = {}) {
  const alllMap = { NE: [], NW: [], SE: [], SW: [] };
  if (options.includeNames !== true) {
    findAnimalPerLocation('NE').forEach((animal) => { alllMap.NE.push(animal.name); });
    findAnimalPerLocation('NW').forEach((animal) => { alllMap.NW.push(animal.name); });
    findAnimalPerLocation('SE').forEach((animal) => { alllMap.SE.push(animal.name); });
    findAnimalPerLocation('SW').forEach((animal) => { alllMap.SW.push(animal.name); });
    return alllMap;
  }
  findAnimalPerLocation('NE').forEach((animal) => {
    const animalWithNames = {};
    animalWithNames[animal.name] = animal.residents.map((animalWithName) => animalWithName.name);
    alllMap.NE.push(animalWithNames);
  });
  findAnimalPerLocation('NW').forEach((animal) => {
    const animalWithNames = {};
    animalWithNames[animal.name] = animal.residents.map((animalWithName) => animalWithName.name);
    alllMap.NW.push(animalWithNames);
  });
  findAnimalPerLocation('SE').forEach((animal) => {
    const animalWithNames = {};
    animalWithNames[animal.name] = animal.residents.map((animalWithName) => animalWithName.name);
    alllMap.SE.push(animalWithNames);
  });
  findAnimalPerLocation('SW').forEach((animal) => {
    const animalWithNames = {};
    animalWithNames[animal.name] = animal.residents.map((animalWithName) => animalWithName.name);
    alllMap.SW.push(animalWithNames);
  });
  return alllMap;
}

const printAllSchedule = () => {
  const zooHours = Object.entries(hours);
  return zooHours.reduce((allSchedule, weekDate) => {
    if (weekDate[1].open === 0) {
      allSchedule[weekDate[0]] = 'CLOSED';
    } else {
      allSchedule[weekDate[0]] = `Open from ${weekDate[1].open}am until ${weekDate[1].close - 12}pm`;
    }
    return allSchedule;
  }, {});
};

function getSchedule(dayName) {
  const zooHours = Object.entries(hours);
  if (dayName === undefined) {
    return printAllSchedule();
  }
  const myDate = zooHours.find((weekDate) => weekDate[0] === dayName);
  const objectReturn = {};
  if (myDate[1].open === 0) {
    objectReturn[myDate[0]] = 'CLOSED';
    return objectReturn;
  }
  objectReturn[myDate[0]] = `Open from ${myDate[1].open}am until ${myDate[1].close - 12}pm`;
  return objectReturn;
}

function getOldestFromFirstSpecies(id) {
  const employeeSelected = employees.find((employee) => employee.id === id);
  const animalSelected = species.find((animal) => animal.id === employeeSelected.responsibleFor[0]);
  const oldestOne = animalSelected.residents.reduce((oldestAnimal, animal) => {
    if (oldestAnimal.age > animal.age) {
      return oldestAnimal;
    }
    return animal;
  });
  return [oldestOne.name, oldestOne.sex, oldestOne.age];
}

function increasePrices(percentage) {
  prices.Senior *= (1 + percentage / 100);
  prices.Child *= (1 + percentage / 100);
  prices.Adult *= (1 + percentage / 100);
  prices.Child = Math.round((prices.Child + Number.EPSILON) * 100) / 100;
  prices.Senior = Math.round((prices.Senior + Number.EPSILON) * 100) / 100;
  prices.Adult = Math.round((prices.Adult + Number.EPSILON) * 100) / 100;
  return prices;
}

function getEmployeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return employees.reduce((allEmployee, employee) => {
      const keyOfAllEmployee = `${employee.firstName} ${employee.lastName}`;
      const responsibleWithNames = employee.responsibleFor.map((idAnimal) => {
        const animalFound = species.find((animal) => animal.id === idAnimal);
        return animalFound.name;
      });
      allEmployee[keyOfAllEmployee] = responsibleWithNames;
      return allEmployee;
    }, {});
  }
  const employeeSelected = employees.find((employee) => employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  const keyOfEmployee = `${employeeSelected.firstName} ${employeeSelected.lastName}`;
  const responsibleWithNames = employeeSelected.responsibleFor.map((idAnimal) => {
    const animalFound = species.find((animal) => animal.id === idAnimal);
    return animalFound.name;
  });
  const myEmployeeCoverage = {};
  myEmployeeCoverage[keyOfEmployee] = responsibleWithNames;
  return myEmployeeCoverage;
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
