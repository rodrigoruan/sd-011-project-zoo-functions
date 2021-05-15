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

const { species, prices, hours } = require('./data');
const { employees } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) => {
  const report = ids.map((id) => (
    species.find((specie) => specie.id === id)
  ));

  return report;
};

const getAnimalsOlderThan = (animal, age) => {
  const getAnimal = species.find((specie) => specie.name === animal);
  const checkAge = getAnimal.residents.every((resident) => resident.age >= age);

  return checkAge;
};

const getEmployeeByName = (employeeName) => {
  if (employeeName === undefined) {
    return {};
  }

  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
};

const createEmployee = (personalInfo, associatedWith) => (
  {
    ...personalInfo,
    ...associatedWith,
  }
);

const isManager = (id) => (
  employees.some((employee) => employee.managers.includes(id))
);

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specieName) {
  if (specieName) {
    return species.find(({ name }) => name === specieName).residents.length;
  }

  return species.reduce((animals, animal) => {
    animals[animal.name] = animal.residents.length;
    return animals;
  }, {});
}

function calculateEntry(entrants) {
  if (!entrants) { return 0; }

  const entrantKeys = Object.keys(entrants);

  if (entrantKeys.length === 0) { return 0; }

  return entrantKeys.reduce((total, key) => {
    total += prices[key] * entrants[key];
    return total;
  }, 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

const formatHour = (hour) => (hour <= 12 ? `${hour}am` : `${hour - 12}pm`);

const returnMessage = (scheduleDay) => {
  const { open, close } = scheduleDay;
  if (close === 0 && open === 0) {
    return 'CLOSED';
  }

  return `Open from ${formatHour(open)} until ${formatHour(close)}`;
};

function getSchedule(dayName) {
  if (dayName) {
    return {
      [dayName]: returnMessage(hours[dayName]),
    };
  }

  const days = Object.keys(hours);
  const result = {};

  days.forEach((day) => {
    result[day] = returnMessage(hours[day]);
  });

  return result;
}

function getOldestFromFirstSpecies(id) {
  const animalId = employees.find((employee) => employee.id === id).responsibleFor[0];
  const animal = species.find((specie) => specie.id === animalId);
  const olderResident = animal.residents.reduce((acc, curr) => (acc.age < curr.age ? curr : acc));
  const result = Object.values(olderResident);

  return result;
}

function increasePrices(percentage) {
  const keys = Object.keys(prices);

  return keys.forEach((key) => {
    prices[key] = Math.round(prices[key] * (1 + (percentage / 100)) * 100) / 100;
  });
}

const findAnimalName = (animalIds) => {
  let animals = []
  animalIds.forEach((animalId) => {
    animals.push(species.find((specie) => specie.id === animalId));
  });

  return animals.map((animal) => animal.name);
}

const employeeCoverageFullList = () => {
  const result = {};
  const employeeList = employees.map((employee) => `${employee.firstName} ${employee.lastName}`);
  const responsibleAnimals = employees.map((employee) => employee.responsibleFor);
  
  employeeList.forEach((employee, index) => {
    result[employee] = findAnimalName(responsibleAnimals[index]);
  });
  
  return result;
}

function getEmployeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return employeeCoverageFullList();
  }

  const result = {};
  const employee = employees.find(({id, firstName, lastName}) => id === idOrName || firstName === idOrName || lastName === idOrName);
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const responsibleAnimals = employee.responsibleFor;

  result[fullName] = findAnimalName(responsibleAnimals)

  return result;
}

console.log(getEmployeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
