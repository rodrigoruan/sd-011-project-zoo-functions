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

// const { species } = require('./data');
// const { employees } = require('./data');
const data = require('./data');

// Requisito 1
const getSpeciesByIds = (...ids) => data.species.filter((specie) => ids.find((id) => specie.id === id));

// Requisito 2
const getAnimalsOlderThan = (animal, age) => data.species.some(({ name, residents }) => name === animal && residents.every((resident) => resident.age > age));

// Requisito 3
const getEmployeeByName = (employeeName) => (!employeeName ? {} : data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName));

// Requisito 4
const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

// Requisito 5
const isManager = (id) => data.employees.some((employee) => employee.managers.includes(id));

// Requisito 6
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// Requisito 7
function countAnimals(species) {
  if (!species) {
    return data.species.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specie) => specie.name === species).residents.length;
}

// Requisito 8
function calculateEntry(entrants) {
  if (!entrants) return 0;
  const { Adult, Child, Senior } = entrants;
  let sum = 0;
  if (Adult) sum += data.prices.Adult * Adult;
  if (Child) sum += data.prices.Child * Child;
  if (Senior) sum += data.prices.Senior * Senior;
  return sum;
}

const animalTypesFunc = () => {
  const regions = data.species.map(({ location }) => location);
  return regions.reduce((acc, curr, index) => {
    acc[regions[index]] = data.species.filter(({ location }) => location === curr).map((animal) => animal.name);
    return acc;
  }, {});
};

function filterSex(obj, reg, options) {
  reg.forEach((regiao) => {
    obj[regiao].forEach((animal) => {
      let selectedAnimal = Object.keys(animal)[0];
      let xablau = data.species.find((specie) => specie.name === selectedAnimal);
      animal[selectedAnimal] = xablau.residents.filter((resident) => resident.sex === options.sex).map((animalMap) => animalMap.name);
    });
  });
}

function sorted(obj, reg) {
  reg.forEach((regiao) => {
    obj[regiao].forEach((animal) => {
      let selectedAnimal = Object.keys(animal)[0];
      animal[selectedAnimal].sort();
    });
  });
}

function includeNames(obj, options) {
  let regioes = Object.keys(obj);
  regioes.forEach((regiao) => {
    obj[regiao] = [];
    data.species.forEach(({ name, location, residents }) => {
      if (location === regiao) {
        obj[regiao].push({ [name]: residents.map((resident) => resident.name) });
      }
    });
  });
  if (options.sex) {
    filterSex(obj, regioes, options);
  }
  if (options.sorted) {
    sorted(obj, regioes);
  }
  return obj;
}

function getAnimalMap(options) {
  let result = animalTypesFunc();
  if (!options || !options.includeNames) {
    return result;
  }
  return includeNames(result, options);
}

// Requisito 10
function getSchedule(dayName) {
  if (!dayName) {
    return Object.keys(data.hours).reduce((acc, curr) => {
      acc[curr] = `Open from ${data.hours[curr].open}am until ${data.hours[curr].close - 12}pm`;
      acc.Monday = 'CLOSED';
      return acc;
    }, {});
  }
  if (dayName === 'Monday') return { Monday: 'CLOSED' };
  return { [dayName]: `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm` };
}

// Requisito 11
function getOldestFromFirstSpecies(id) {
  const species = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const resident = data.species.find((specie) => specie.id === species).residents.sort((resident1, resident2) => resident2.age - resident1.age)[0];
  const { name, sex, age } = resident;
  return [name, sex, age];
}

// Requisito 12
function increasePrices(percentage) {
  Object.keys(data.prices).forEach((curr) => {
    data.prices[curr] = parseFloat((((data.prices[curr] * percentage) / 100 + 0.001) + data.prices[curr]).toFixed(2));
  });
}

// Requisito 13
function getEmployeeCoverage(idOrName) {
  let myObj = {};
  if (!idOrName) {
    data.employees.forEach((employee) => {
      myObj[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((specie) => data.species.find((spc) => spc.id === specie).name);
    });
    return myObj;
  }

  const employeeSel = data.employees.find((employee) => employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  myObj[`${employeeSel.firstName} ${employeeSel.lastName}`] = employeeSel.responsibleFor.map((specie) => data.species.find((spc) => spc.id === specie).name);
  return myObj;
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
