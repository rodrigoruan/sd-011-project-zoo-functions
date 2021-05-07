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

const { species: animalSpecies, employees, prices, hours } = require('./data');

const getSpeciesByIds = (...ids) => ids
  .map((id) => animalSpecies.find((animal) => animal.id === id));

const getAnimalsOlderThan = (animal, age) => animalSpecies
  .find((zooAnimal) => zooAnimal.name === animal).residents
  .every((resident) => resident.age >= age);

const getEmployeeByName = (employeeName) => (employeeName
  ? employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName)
  : {});

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => employees.some((employee) => employee.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(newEmployee);
};

const countAnimals = (species) => (species
  ? animalSpecies.find((animal) => animal.name === species).residents.length
  : animalSpecies
    .reduce((result, { name, residents }) => ({ ...result, [name]: residents.length }), {}));

const calculateEntry = (entrants) => {
  if (!entrants || Object.keys(entrants).length === 0) return 0;

  return Object.entries(entrants)
    .reduce((entryFee, [type, qtt]) => entryFee + prices[type] * qtt, 0);
};

const getAnimalsByLocation = (result, animal) => {
  if (!result[animal.location]) return { ...result, [animal.location]: [animal.name] };

  result[animal.location].push(animal.name);

  return result;
};

const getResidentsBySex = (animal, sex) => animal
  .residents.reduce((residentsBySex, resident) => {
    if (resident.sex === sex) residentsBySex.push(resident.name);
    return residentsBySex;
  }, []);

const getAnimalsByLocationWithNames = ([result, sorted, sex], animal) => {
  let residents = [];
  if (sex) residents = getResidentsBySex(animal, sex);
  else residents = animal.residents.map((resident) => resident.name);
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

const getAnimalMap = (options) => {
  if (!options || !options.includeNames) {
    return animalSpecies.reduce(getAnimalsByLocation, {});
  }

  const { includeNames, sorted, sex } = options;

  if (includeNames) {
    return animalSpecies.reduce(getAnimalsByLocationWithNames, [{}, sorted, sex])[0];
  }
};

const formatHour = (hour) => (hour <= 12 ? hour : hour - 12);

const getSchedule = (dayName) => {
  const formatedDays = Object.entries(hours).reduce((formated, [day, hour]) => ({
    ...formated,
    [day]: hour.open === 0 && hour.close === 0
      ? 'CLOSED'
      : `Open from ${formatHour(hour.open)}am until ${formatHour(hour.close)}pm`,
  }), {});

  return dayName
    ? Object.entries(formatedDays)
      .reduce((filteredDay, [key, hour]) => {
        if (key === dayName) return { ...filteredDay, [key]: hour };
        return filteredDay;
      }, {})
    : formatedDays;
};

console.log(getSchedule('Monday'))

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
