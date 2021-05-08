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
  return ids.reduce((animals, currentId) => {
    const animalObj = data.species.find(({ id }) => id === currentId);
    animals.push(animalObj);
    return animals;
  }, []);
}

function getAnimalsOlderThan(animal, age) {
  const currentAnimal = data.species.find(({ name }) => name === animal);
  return currentAnimal.residents.every((currentResident) => currentResident.age > age);
}

function getEmployeeByName(employeeName) {
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName) || {};
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some((person) => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push(createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));
}

function countAnimals(species) {
  if (species) {
    return data.species.find(({ name }) => name === species).residents.length;
  }
  return data.species.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}

function calculateEntry(entrants = {}) {
  const values = Object.values(data.prices);
  const keys = Object.keys(data.prices);
  return values.reduce((total, current, index) => {
    const person = entrants[keys[index]] || 0;
    const price = current * person;
    return total + price;
  }, 0);
}

const listNames = (object, gender = false) => {
  Object.keys(object).forEach((key) => {
    object[key] = object[key].map((animal) => {
      const currentAnimal = data.species.find(({ name }) => name === animal);
      if (gender) {
        return { [currentAnimal.name]: currentAnimal.residents.filter((resident) => resident.sex === gender).map((resident) => resident.name) };
      }
      return { [currentAnimal.name]: currentAnimal.residents.map((resident) => resident.name) };
    });
  });
  return object;
};

const sortNames = (object) => {
  Object.keys(object).forEach((key) => {
    const region = object[key];
    Object.keys(region).forEach((subKey) => {
      const animal = object[key][subKey];
      Object.keys(animal).forEach((residentes) => {
        const names = animal[residentes];
        animal[residentes] = names.sort();
      });
    });
  });
  return object;
};

function getAnimalMap(options = {}) {
  const { includeNames = false, sex, sorted = false } = options;
  let finalObject = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  Object.keys(finalObject).forEach((key) => {
    finalObject[key] = data.species.filter((animal) => animal.location === key).map((animal) => animal.name);
  });
  if (includeNames) {
    finalObject = listNames(finalObject, sex);
    if (sorted) {
      finalObject = sortNames(finalObject);
    }
  }
  return finalObject;
}

const formatHour = (day, open, close) => {
  if (day === 'Monday') {
    return 'CLOSED';
  }
  return `Open from ${open}am until ${close - 12}pm`;
};

function getSchedule(dayName) {
  let schedule = {};
  if (dayName) {
    const { open, close } = data.hours[dayName];
    schedule[dayName] = formatHour(dayName, open, close);
  } else {
    Object.keys(data.hours).forEach((day) => {
      const { open, close } = data.hours[day];
      schedule[day] = formatHour(day, open, close);
    });
  }
  return schedule;
}

function getOldestFromFirstSpecies(id) {
  const specie = data.employees.find((person) => person.id === id).responsibleFor[0];
  const { name, sex, age } = data.species.find((animal) => animal.id === specie).residents.reduce((oldest, animal) => (animal.age > oldest.age ? animal : oldest));
  return [name, sex, age];
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((type) => {
    const percent = (data.prices[type] * percentage) / 100;
    data.prices[type] = Math.round((percent + data.prices[type]) * 100) / 100;
  });
  return data.prices;
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
