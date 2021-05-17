const data = require('./data');
const { species, employees, prices } = require('./data');

function getSpeciesByIds(...ids) {
  if (ids === undefined) return [];
  return species.filter((animais) => ids.find((id) => id === animais.id));
}

function getAnimalsOlderThan(animal, age) {
  const ageAnimals = species.find((bicho) => bicho.name === animal);
  return ageAnimals.residents.every((num) => num.age >= age);
}

function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return ({});
  return employees.find(((funcionario) => (
    funcionario.firstName === employeeName || funcionario.lastName === employeeName)
  ));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const funcionario = ({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employees.push(funcionario);
}

function countAnimals(specie) {
  if (specie) {
    return species.find(({ name }) => name === specie).residents.length;
  }
  return species.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  return Object.keys(entrants).reduce(((total, currentValue) =>
    total + (entrants[currentValue] * prices[currentValue])
  ), 0);
}

const comIncludes = (sex, sorted) => {
  let location = { NE: [], NW: [], SE: [], SW: [] };
  let animalNames;
  species.forEach((animal) => {
    if (sex) {
      animalNames = animal.residents.filter((element) => element.sex === sex)
        .map(({ name }) => name);
    } else {
      animalNames = animal.residents.map(({ name }) => name);
    }
    if (sorted) {
      animalNames.sort();
    }
    location[animal.location].push({ [animal.name]: animalNames });
  });
  return location;
};

const semIncludes = () => {
  let ObjLocation = {};
  species.forEach((animal) => {
    if (!ObjLocation[animal.location]) {
      ObjLocation[animal.location] = [];
    }
    ObjLocation[animal.location].push(animal.name);
  });
  return ObjLocation;
};
console.log(semIncludes());

function getAnimalMap(options = {}) {
  let animal = {};
  const { includeNames, sex, sorted } = options;
  if (includeNames) {
    animal = comIncludes(sex, sorted);
  } else {
    animal = semIncludes();
  }
  return animal;
}

const horas = {
  Tuesday: 'Open from 8am until 6pm',
  Wednesday: 'Open from 8am until 6pm',
  Thursday: 'Open from 10am until 8pm',
  Friday: 'Open from 10am until 8pm',
  Saturday: 'Open from 8am until 10pm',
  Sunday: 'Open from 8am until 8pm',
  Monday: 'CLOSED',
};

function getSchedule(dayName) {
  if (!dayName) return horas;
  const agenda = Object.keys(horas).find((dia) => dia === dayName);
  return { [agenda]: horas[agenda] };
}

function getOldestFromFirstSpecies(id) {
  const funcionario = employees.find((responsavel) => responsavel.id === id).responsibleFor[0];
  const animal = species.find((bicho) => bicho.id === funcionario);
  return Object.values(animal.residents.reduce((acc, currentValue) => (acc.age > currentValue.age ? acc : currentValue)));
}

function increasePrices(percentage) {
  Object.entries(prices).forEach((valor) => {
    prices[valor[0]] = Math.round((valor[1] * (percentage / 100 + 1)) * 100) / 100;
  });
  return prices;
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    const funcion = {};
    employees.forEach((element) => {
      funcion[`${element.firstName} ${element.lastName}`] = element.responsibleFor
        .map((elements) => species.find((especies) => especies.id === elements).name);
    });
    return funcion;
  }
  const funcion = {};
  const objFunc = employees
    .find((func) => func.firstName === idOrName || func.lastName === idOrName || func.id === idOrName);
  funcion[`${objFunc.firstName} ${objFunc.lastName}`] = objFunc.responsibleFor
    .map((element) => species.find((especies) => especies.id === element).name);
  return funcion;
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
