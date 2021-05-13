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

const { hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((getSpecies) => ids.includes(getSpecies.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animals) => animals.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  return employeeName ? data.employees.find((name) => name.firstName === employeeName || name.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.some((value) => value === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((animal) => animal.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((acc, current) => acc + (current[1] * data.prices[current[0]]), 0);
}

// funcoes do DESAFIO 9

const getAnimalsByLocation = (result, { name, location }) => {
  if (!result[location]) {
    return { ...result, [location]: [name] };
  }

  result[location].push(name);

  return result;
};

const getResidentsBySex = (animal, sex) => animal
  .residents.reduce((residentsBySex, resident) => {
    if (resident.sex === sex) {
      residentsBySex.push(resident.name);
    }
    return residentsBySex;
  }, []);

const getAnimalsByLocationWithNames = ([result, sorted, sex], animal) => {
  let residents = [];
  if (sex) residents = getResidentsBySex(animal, sex);
  else residents = animal.residents.map(({ name }) => name);

  if (sorted) residents.sort();

  if (!result[animal.location]) {
    return [{
      ...result,
      [animal.location]: [{
        [animal.name]: residents,
      }],
    }, sorted, sex];
  }
  result[animal.location].push(...[{
    [animal.name]: residents,
  }]);

  return [result, sorted, sex];
};

function getAnimalMap(options) {
  if (!options || !options.includeNames) {
    return data.species.reduce(getAnimalsByLocation, {});
  }

  const { includeNames, sorted, sex } = options;

  if (includeNames) {
    return data.species.reduce(getAnimalsByLocationWithNames, [{}, sorted, sex])[0];
  }
}

function getSchedule(dayName) {
  const getDays = Object.keys(data.hours);
  const hour = {};

  getDays.forEach((value, index) => {
    const openHour = data.hours[value].open;
    const closeHour = data.hours[value].close - 12;

    if (index === 6) {
      hour[value] = 'CLOSED';
    } else {
      hour[value] = `Open from ${openHour}am until ${closeHour}pm`;
    }
  });
  if (!dayName) {
    return hour;
  }
  return { [dayName]: hour[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const getAnimal = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const animalArr = data.species.find((animal) => getAnimal === animal.id).residents;
  const getOldest = animalArr.sort((a, b) => b.age - a.age);
  const { name, sex, age } = getOldest[0];

  return [name, sex, age];
}

// retorna um array com nome, sexo e idade do animal
// mais velho dessa espécie'

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
