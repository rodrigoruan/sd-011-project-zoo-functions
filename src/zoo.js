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
const { prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((specie) => specie.name === animal)
    .residents.every((element) => element.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employees) => employees.managers.some((managers) => managers === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees.push(newEmployee);
}

function countAnimals(species) {
  if (species) {
    return data.species.find((specie) => specie.name === species).residents.length;
  }

  const specieSelected = data.species.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.residents.length;

    return accumulator;
  }, {});

  return specieSelected;
}

function calculateEntry({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  return Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
}

const specieLocationWithoutParameters = (arrCardinalsLocations) => {
  const resultLocations = {};

  arrCardinalsLocations.forEach((location) => {
    const filterResult = data.species.filter((specie) => specie.location === location)
      .map((specie) => specie.name);
    resultLocations[location] = filterResult;
  });

  return resultLocations;
};

const filteredParameters = (arrCardinalsLocations, sorted, sex) => {
  const filteredResultParameters = {};
  arrCardinalsLocations.forEach((location) => {
    const filterResult = data.species.filter((specie) => specie.location === location)
      .map((specie) => {
        let objSpeciesKey;
        let objSpeciesValue;
        if (sex) {
          objSpeciesKey = specie.name;
          objSpeciesValue = specie.residents
            .filter((resident) => resident.sex === sex)
            .map((resident) => resident.name);
        } else {
          objSpeciesKey = specie.name;
          objSpeciesValue = specie.residents.map((resident) => resident.name);
        } if (sorted === true) {
          return { [objSpeciesKey]: objSpeciesValue.sort() };
        } return { [objSpeciesKey]: objSpeciesValue };
      });
    filteredResultParameters[location] = filterResult;
  }); return filteredResultParameters;
};

const parametersSelected = (options) => {
  if (options && options.sorted) {
    const { sorted } = options;
    return sorted;
  }

  if (options && options.sex) {
    const { sex } = options;
    return sex;
  }
};

function getAnimalMap(options) {
  const arrCardinalsLocations = ['NE', 'NW', 'SE', 'SW'];
  parametersSelected(options);

  if (options && options.includeNames === true) {
    const { sex } = options;
    const { sorted } = options;

    return filteredParameters(arrCardinalsLocations, sorted, sex);
  }
  return specieLocationWithoutParameters(arrCardinalsLocations);
}

function getSchedule(dayName) {
  const schedule = {};
  const days = Object.values(hours);

  days.forEach((day, index) => {
    const time = Object.keys(hours)[index];
    const hour = days[index];
    Object.assign(schedule, { [time]: `Open from ${hour.open}am until ${hour.close - 12}pm` });
  });

  Object.assign(schedule, { Monday: 'CLOSED' });
  return (dayName !== undefined ? { [dayName]: schedule[dayName] } : schedule);
}

function getOldestFromFirstSpecies(id) {
  const responsible = data.employees.find((employee) => employee.id === id);
  const firstAnimalsSpecies = data.species.find((specie) => specie.id === responsible.responsibleFor[0]);
  const { age, name, sex } = firstAnimalsSpecies.residents.reduce((accumulator, currentValue) => (currentValue.age > accumulator.age ? currentValue : accumulator), { age: 0 });

  return [name, sex, age];
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((index) => {
    prices[index] = (Math.round(prices[index] * (1 + (percentage / 100)) * 100) / 100);
  });
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    const employeeAnimals = {};
    const employeeResponsible = data.employees.map((employee) => employee.responsibleFor
      .map((specieId) => data.species.find((specie) => specieId === specie.id).name));
    data.employees.forEach(({ firstName, lastName }, index) => {
      const fullName = `${firstName} ${lastName}`;
      employeeAnimals[fullName] = employeeResponsible[index];
    });

    return employeeAnimals;
  }

  const { firstName, lastName, responsibleFor } = data.employees
    .find((employee) => employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);

  return { [`${firstName} ${lastName}`]: responsibleFor
    .map((specieId) => data.species
      .find((specie) => specie.id === specieId).name) };
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
