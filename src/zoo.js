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

const getSpeciesByIds = (...ids) => animalSpecies.filter((animal) => ids.includes(animal.id));

const getAnimalsOlderThan = (animal, age) => animalSpecies
  .find((zooAnimal) => zooAnimal.name === animal).residents
  .every((resident) => resident.age >= age);

const getEmployeeByName = (employeeName) => (employeeName
  ? employees
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName)
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
  ? animalSpecies.find(({ name }) => name === species).residents.length
  : animalSpecies
    .reduce((result, { name, residents }) => ({ ...result, [name]: residents.length }), {}));

const calculateEntry = (entrants) => {
  if (!entrants || Object.keys(entrants).length === 0) return 0;

  return Object.entries(entrants)
    .reduce((entryFee, [type, qtt]) => entryFee + prices[type] * qtt, 0);
};

const getAnimalsByLocation = (result, { name, location }) => {
  if (!result[location]) return { ...result, [location]: [name] };

  result[location].push(name);

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

const getScheduleByDay = (schedule, day) => Object.entries(schedule)
  .reduce((filteredDay, [key, hour]) => {
    if (key === day) return { ...filteredDay, [key]: hour };
    return filteredDay;
  }, {});

const getSchedule = (dayName) => {
  const formatedDays = Object.entries(hours).reduce((formated, [day, { open, close }]) => ({
    ...formated,
    [day]: open === 0 && close === 0
      ? 'CLOSED'
      : `Open from ${formatHour(open)}am until ${formatHour(close)}pm`,
  }), {});

  return dayName ? getScheduleByDay(formatedDays, dayName) : formatedDays;
};

const getOldestFromFirstSpecies = (id) => {
  const employee = employees.find((person) => person.id === id);
  const firstSpecieId = employee.responsibleFor[0];
  const specie = animalSpecies.find((animalSpecie) => animalSpecie.id === firstSpecieId);

  const oldest = specie.residents.reduce((oldestResident, { name, sex, age }) => {
    if (age > oldestResident[2]) return [name, sex, age];
    return oldestResident;
  }, ['', '', 0]);

  return oldest;
};

const modifyNumber = (number, modifier) => Math.round(number * modifier * 100) / 100;

const increasePrices = (percentage) => {
  const modifier = 1 + (percentage / 100);

  Object.keys(prices).forEach((key) => {
    prices[key] = modifyNumber(prices[key], modifier);
  });

  return prices;
};

const getEmployeeCoverage = (idOrName) => {
  let employeesWithSpecies = employees.reduce((employeeWithSpecies, { firstName, lastName, responsibleFor }) => {
    employeeWithSpecies[`${firstName} ${lastName}`] = responsibleFor
      .map((animalId) => animalSpecies.find(({ id }) => animalId === id).name);
    return employeeWithSpecies;
  }, {});

  if (idOrName) {
    let { firstName, lastName } = getEmployeeByName(idOrName) || employees.find(({ id }) => idOrName === id);

    employeesWithSpecies = Object.entries(employeesWithSpecies).reduce((employeeWithSpecies, [employee, species]) => {
      if (employee === `${firstName} ${lastName}`) employeeWithSpecies[employee] = species;
      return employeeWithSpecies;
    }, {});
  }

  return employeesWithSpecies;
};

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
