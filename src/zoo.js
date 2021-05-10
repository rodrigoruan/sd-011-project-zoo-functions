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

// const { employees } = require('./data');
const data = require('./data');
// const { species, employees } = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((animal) => ids.some((id) => animal.id === id)); // (!ids ? [] : animal.id === ids[0] || animal.id === ids[1]
}

function getAnimalsOlderThan(animal, age) {
  const specie = data.species.find((especie) => especie.name === animal);
  return specie.residents.every((idade) => idade.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
  // return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((accumulator, value) => {
      accumulator[value.name] = value.residents.length;
      return accumulator;
    }, {});
  }
  const specie = data.species.find((animal) => animal.name === species);
  return specie.residents.length;
}

function calculateEntry(entrants = {}) {
  function soma({ Adult = 0, Child = 0, Senior = 0 }) {
    let sum = 0;
    sum += data.prices.Adult * Adult;
    sum += data.prices.Child * Child;
    sum += data.prices.Senior * Senior;
    return sum;
  }
  return soma(entrants);
}

function getAnimalMap(options = {}) {
  let locationName = data.species.reduce((accumulator, current) => {
    if (!accumulator[current.location]) {
      accumulator[current.location] = [];
    }
    accumulator[current.location].push(current.name);
    return accumulator;
  }, {});
  let animalsObject = data.species.reduce((accumulator, current) => {
    if (!accumulator[current.location]) {
      accumulator[current.location] = [];
    }
    accumulator[current.location].push({ [current.name]: current.residents.map((value) => value.name) });
    return accumulator;
  }, {});
  if (options.includeNames) locationName = animalsObject;
  return locationName;
}
console.log(getAnimalMap());
function getSchedule(dayName) {
  const days = Object.entries(data.hours);
  if (dayName) {
    const day = days.find((dia) => dia[0] === dayName);
    if (day[1].open === day[1].close) {
      return {
        [day[0]]: 'CLOSED',
      };
    }
    return {
      [day[0]]: `Open from ${day[1].open}am until ${day[1].close - 12}pm`,
    };
  }
  return days.reduce((accumulator, current) => {
    accumulator[current[0]] = `Open from ${current[1].open}am until ${current[1].close - 12}pm`;
    if (current[1].open === current[1].close) {
      accumulator[current[0]] = 'CLOSED';
    }
    return accumulator;
  }, {});
}

function getOldestFromFirstSpecies(id) {
  const animalKey = data.employees.find((funcionario) => funcionario.id === id).responsibleFor[0];
  const animals = data.species.find((animal) => animal.id === animalKey).residents;
  const maxAge = animals.reduce((accumulator, idade) => Math.max(accumulator, idade.age), 0);
  const animalMaxAge = animals.find((animal) => animal.age === maxAge);
  return [animalMaxAge.name, animalMaxAge.sex, animalMaxAge.age];
}

function increasePrices(percentage) {
  const adultPrice = (((data.prices.Adult * percentage) / 100) + data.prices.Adult + 0.001);
  const childPrice = (((data.prices.Child * percentage) / 100) + data.prices.Child + 0.001);
  const seniorPrice = (((data.prices.Senior * percentage) / 100) + data.prices.Senior + 0.001);
  data.prices.Adult = Number(adultPrice.toFixed(2));
  data.prices.Child = Number(childPrice.toFixed(2));
  data.prices.Senior = Number(seniorPrice.toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  const employee = data.employees.find((employe) => (idOrName === employe.firstName || idOrName === employe.lastName || idOrName === employe.id));
  if (!idOrName) {
    return data.employees.reduce((accumulator, current) => {
      accumulator[`${current.firstName} ${current.lastName}`] = current.responsibleFor.map((animal) => data.species.find((value) => animal === value.id).name);
      return accumulator;
    }, {});
  }
  return employee.responsibleFor.reduce((accumulator, current) => {
    if (!accumulator[`${employee.firstName} ${employee.lastName}`]) {
      accumulator[`${employee.firstName} ${employee.lastName}`] = [];
    }
    const animalObject = data.species.find((animal) => animal.id === current);
    accumulator[`${employee.firstName} ${employee.lastName}`].push(animalObject.name);
    return accumulator;
  }, {});
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
