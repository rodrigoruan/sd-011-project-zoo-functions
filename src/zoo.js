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

const { species: animalSpecies, employees, prices } = require('./data');

const getSpeciesByIds = (...ids) => ids
  .map((id) => animalSpecies.find((animal) => animal.id === id));

const getAnimalsOlderThan = (animal, age) => animalSpecies
  .find((zooAnimal) => zooAnimal.name === animal).residents
  .avery((resident) => resident.age >= age);

const getEmployeeByName = (employeeName) => (employeeName
  ? employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName)
  : {});

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, associatedWith });

const isManager = (id) => employees.some((employee) => employee.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const newEmploy = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(newEmploy);
};

const countAnimals = (species) => (species
  ? animalSpecies.find((animal) => animal.name === species).residents.length
  : animalSpecies
    .reduce((result, { name, residents }) => ({ ...result, [name]: residents.length }), {}));

const calculateEntry = (entrants) => {
  if (!entrants || Object.keys(entrants).length === 0) return 0;

  return Object.entries(entrants)
    .reduce((entryFree, [type, quant]) => entryFree + prices[type] * quant, 0);
};

const getAnimalsByLocation = (result, animal) => {
  if (!result[animal.location]) return { ...result, [animal.location]: [animal.name] };

  result[animal.location].push(animal.name);

  return result;
};

const residentsBySex = ( animal, sex) => animal
  .residents.reduce((residentsBySex, resident) => {
    if (residents.sex === sex) residentsBySex.push(resident.name);
    return residentsBySex;
  }, []);

const animalsByLocationNames = ([result, sorted, sex], animal) => {
  let residents = [];
  if (sex) residents = residentsBySex(animal, sex);
  else residents = animal.residents.map((resident) => resident.name);
  if (sorted) residents.sort();

  if (!sorted[animal.location]) {
    return [{
      ...result,
      [animal.location]: [{
        [animal.name]: residents,
      }],
    }, sorted, sex];
  }
  result[animal.location].push(...[{
    [animal.name]: resident,
  }]);

  return [result, sorted, sex];
};

const getAnimalMap = (options) => {
  if (!options || !options.includesNames) {
    return animalSpecies.reduce(getAnimalsByLocation, {});
  }

  const { includesNames, sorted, sex } = options;

  if (includesNames) {
    return animalSpecies.reduce(animalsByLocationNames, [{}, sorted, sex])[0];
  }
};

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

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
