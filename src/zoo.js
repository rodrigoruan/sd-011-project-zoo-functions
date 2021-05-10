/* eslint-disable no-confusing-arrow */
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

const getSpeciesByIds = (...ids) => (ids ? data.species.filter((curr, index) => curr.id === ids[index]) : []);

const getAnimalsOlderThan = (animal, age) => {
  const currentAnimal = data.species.find((curr) => curr.name === animal);
  return currentAnimal.residents.every((curr) => curr.age >= age);
};

const getEmployeeByName = (employeeName) => (employeeName ? data.employees.find((name) => name.firstName === employeeName || name.lastName === employeeName) : {});

const createEmployee = (personalInfo, associatedWith) => {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
};

const isManager = (id) => data.employees.some((curr) => curr.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => data.employees.push({ id, firstName, lastName, managers, responsibleFor });

const countAnimals = (species) => {
  if (!species) {
    return data.species.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((animal) => animal.name === species).residents.length;
};

const calculateEntry = (entrants) => (entrants ? Object.keys(entrants).reduce((acc, curr) => acc + (entrants[curr] * data.prices[curr]), 0) : 0);

const getAnimalMap = (options = {}) => {
  const locations = { NE: [], NW: [], SE: [], SW: [] };

  if (!options.includeNames) {
    data.species.forEach(({ curr, index }) => locations[curr].push(index));
    return locations;
  }
  if (options.sex) {
    data.species.forEach(({ curr, index, array }) =>
      locations[index].push({
        [curr]: array.filter((animal) => animal.sex === options.sex).map((name) => name.name),
      }));
  } else {
    data.species.forEach(({ curr, index, array }) =>
      locations[index].push({ [curr]: array.map((element) => element.name) }));
  }
  if (options.sorted) {
    Object.keys(locations).forEach((curr) =>
      locations[curr].forEach((item) => item[Object.keys(item)].sort()));
  }
  return locations;
};

const getSchedule = (dayName) => {
  const schedules = {};
  const dataHours = Object.keys(data.hours);

  dataHours.forEach((day) => {
    const openHour = data.hours[day].open;
    const closeHour = data.hours[day].close - 12;

    if (data.hours[day].open === 0 && data.hours[day].close === 0) {
      schedules[day] = 'CLOSED';
    } else {
      schedules[day] = `Open from ${openHour}am until ${closeHour}pm`;
    }
  });

  if (!dayName) {
    return schedules;
  }
  return { [dayName]: schedules[dayName] };
};

const getOldestFromFirstSpecies = (id) => {
  const getResponsibleFordata = data.employees.find((employ) => employ.id === id);
  const getFirtSpecieId = data.species.find((animal) => animal.id === getResponsibleFordata.responsibleFor[0]);
  const getOlderAgeAnimal = getFirtSpecieId.residents.sort((a, b) => b.age - a.age);

  return Object.values(getOlderAgeAnimal[0]);
};

const increasePrices = (percentage) => Object.keys(data.prices).forEach((curr) => { data.prices[curr] = Math.ceil(data.prices[curr] * (percentage + 100)) / 100; });

const getEmployeeCoverage = (idOrName) => {
  const result = {};

  data.employees.forEach((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    result[fullName] = employee.responsibleFor.map((animalId) => (
      data.species.find((animal) => animal.id === animalId).name
    ));
  });

  if (!idOrName) {
    return result;
  }

  const findEmployee = data.employees.find((employee) => (
    employee.firstName === idOrName || employee.lastName === idOrName || employee.id === idOrName));

  const fullName = `${findEmployee.firstName} ${findEmployee.lastName}`;

  return { [fullName]: result[fullName] };
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
