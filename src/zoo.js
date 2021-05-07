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
  return data.species.filter((species) => ids.includes(species.id));
}

function getAnimalsOlderThan(species, age) {
  return data.species.find(((spec) => spec.name === species)).residents.every((animal) => animal.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};

  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (species) {
    return data.species.find(({ name }) => name === species).residents.length;
  }

  return data.species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
}

function calculateEntry(entrants) {
  let total = 0;

  const entrantKeys = Object.keys(entrants);

  entrantKeys.forEach((key) => { total += data.prices[key] * entrants[key]; });

  return total;
}

function getAnimalMap(options) {
  const animalMap = data.species.reduce((acc, curr) => {
    acc[curr.location].push(curr.name);
    return acc;
  }, { NE: [], NW: [], SE: [], SW: [] });

  if (!options) {
    return animalMap;
  }

  const { includeNames, sorted, sex } = options;

  if (includeNames) {
    for (let region in animalMap) {
      animalMap[region] = animalMap[region].map((animal) => (
        {
          [animal]: data.species.find(({ name }) => name === animal).residents.map((res) => res.name),
        }
      ));
    }
  }

  if (includeNames && sorted) {
    for (let region in animalMap) {
      for (let animal of animalMap[region]) {
        let key = Object.keys(animal)[0];
        animal[key] = animal[key].sort();
      }
    }
  }

  if (includeNames && (sex === 'male' || sex === 'female')) {
    for (let region in animalMap) {
      for (let animal of animalMap[region]) {
        let key = Object.keys(animal)[0];
        animal[key] = animal[key].filter((animalName) => (
          data.species.find((species) => species.name === key).residents.find(({ name }) => name === animalName).sex === sex
        ));
      }
    }
  }

  return animalMap;
}

function formatHourFrom24to12(hourIn24) {
  if (hourIn24 <= 12) {
    return `${hourIn24}am`;
  }

  return `${hourIn24 - 12}pm`;
}

function getSingleDayScheduleString(daySchedule) {
  if (daySchedule.close - daySchedule.open <= 0) {
    return 'CLOSED';
  }

  return `Open from ${formatHourFrom24to12(daySchedule.open)} until ${formatHourFrom24to12(daySchedule.close)}`;
}

function getSchedule(dayName) {
  const schedule = data.hours;

  if (dayName) {
    return { [dayName]: schedule[dayName] };
  }

  const scheduleKeys = Object.keys(schedule);

  scheduleKeys.forEach((day) => {
    schedule[day] = getSingleDayScheduleString(schedule[day]);
  });

  return schedule;
}

function getOldestFromFirstSpecies(id) {
  const responsible = data.employees.find((employee) => employee.id === id);
  const allAnimalsFromFirstSpecies = data.species.find((species) => species.id === responsible.responsibleFor[0]);
  const { age, name, sex } = allAnimalsFromFirstSpecies.residents.reduce((acc, curr) => (curr.age > acc.age ? curr : acc), { age: 0 });

  return [name, sex, age];
}

function increasePrices(percentage) {
  const priceKeys = Object.keys(data.prices);

  priceKeys.forEach((priceKey) => {
    data.prices[priceKey] = Math.round(data.prices[priceKey] * (1 + percentage / 100) * 100) / 100;
  });
}

function getSingleEmployeeCoverage(employee) {
  const responsibilities = [];

  employee.responsibleFor.forEach((id) => {
    responsibilities.push(data.species.find((species) => species.id === id).name);
  });

  return responsibilities;
}

function getEmployeeCoverage(idOrName) {
  const employeeCoverage = {};

  if (idOrName) {
    const employee = data.employees.find(({ id, firstName, lastName }) => id === idOrName || firstName === idOrName || lastName === idOrName);

    const fullName = `${employee.firstName} ${employee.lastName}`;

    employeeCoverage[fullName] = getSingleEmployeeCoverage(employee);

    return employeeCoverage;
  }

  for (let employee of data.employees) {
    const fullName = `${employee.firstName} ${employee.lastName}`;

    employeeCoverage[fullName] = getSingleEmployeeCoverage(employee);
  }

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
