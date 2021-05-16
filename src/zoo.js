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
  if (!ids.length) return [];
  const animals = ids.map((id) =>
    data.species.find((specie) => specie.id === id));
  return animals;
}

function getAnimalsOlderThan(animal, age) {
  return data.species
    .find((specie) => specie.name === animal)
    .residents.every((actualAnimal) => actualAnimal.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(
    ({ firstName, lastName }) =>
      firstName === employeeName || lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(i) {
  const managerIsYou = data.employees.find((employee) => employee.id === i);
  if (managerIsYou.managers.length < 2) {
    return true;
  }
  return false;
}

function addEmployee(
  identifier,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const employed = {
    id: identifier,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employed);
}

const specieCountReducer = (otherSpecies, specie) => ({
  ...otherSpecies,
  [specie.name]: specie.residents.length,
});

function countAnimals(species) {
  if (!species) {
    return data.species.reduce(specieCountReducer, {});
  }
  const animalsCount = data.species.find(
    (animalName) => animalName.name === species,
  );
  return animalsCount.residents.length;
}

function calculateEntry(entrants) {
  let result = 0;
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  const allKeys = Object.keys(entrants);
  allKeys.forEach((key) => {
    result += data.prices[key] * entrants[key];
  });
  return result;
}

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

function animalMap() {
  return data.species.reduce(
    (accumulator, value) => {
      accumulator[value.location].push(value.name);
      return accumulator;
    },
    { NE: [], NW: [], SE: [], SW: [] },
  );
}

const id = (self) => self;

const getName = (any) => any.name;

const sortArray = (array) => array.sort();

const getNamesFromArray = (array) => array.map(getName);

const getNamesFromSpecie = (specie) => getNamesFromArray(specie.residents);

const makeSpecieReducer = (handleSpecie = id) => (specieAccumulator, specie) => {
  const actualRegionName = specie.location;
  const actualRegion = specieAccumulator[actualRegionName];
  const newSpecie = { [specie.name]: handleSpecie(specie) };
  return { ...specieAccumulator, [actualRegionName]: [...actualRegion, newSpecie] };
};

const filterBySex = (sex) => (specie) => specie.residents.filter((resident) => resident.sex === sex);

const blankAnimalMap = {
  NE: [],
  NW: [],
  SE: [],
  SW: [],
};

const reduceSpecies = (handler) => data.species.reduce(makeSpecieReducer(handler), blankAnimalMap);

const handleOptions = ({ sex, sorted, includeNames, sexAndSorted }) => {
  const getNamesBySex = pipe(filterBySex(sex), getNamesFromArray);
  const getSortedNamesBySex = pipe(getNamesBySex, sortArray);
  if (sexAndSorted) {
    return reduceSpecies(getSortedNamesBySex);
  }
  if (sex) {
    return reduceSpecies(getNamesBySex);
  }

  if (sorted) {
    const getSortedNames = pipe(getNamesFromSpecie, sortArray);
    return reduceSpecies(getSortedNames);
  }

  if (includeNames) {
    return reduceSpecies(getNamesFromSpecie);
  }
  return animalMap();
};

function getAnimalMap(options) {
  if (!options) {
    return animalMap();
  }
  const sex = options.includeNames ? options.sex : null;
  const sorted = options.sorted && options.includeNames;

  const sexAndSorted = sex && sorted;
  return handleOptions({ ...options, sexAndSorted, sorted, sex });
}
function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(ides) {}

const increasePrice = (by) => (priceKey) => {
  data.prices[priceKey] = Math.round(data.prices[priceKey] * (1 + by / 100) * 100) / 100;
};

function increasePrices(percentage) {
  const priceKeys = Object.keys(data.prices);

  priceKeys.forEach(increasePrice(percentage));
}

const idToName = data.species.reduce((acc, specie) => ({ ...acc, [specie.id]: specie.name }), {});

const getNamesFromIds = ((ids) => ids.map((animalID) => idToName[animalID]));

const findByFirstOrLastName = (firstOrSecondName) => (employee) => employee.firstName === firstOrSecondName || employee.lastName === firstOrSecondName;

const getEmpCover = (emp) => ({ [`${emp.firstName} ${emp.lastName}`]: getNamesFromIds(emp.responsibleFor) });

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    return data.employees.reduce(
      (acc, emp) => ({ ...acc, ...getEmpCover(emp) }), {},
    );
  }
  if (idOrName.includes('-')) {
    const emp = data.employees.find((employee) => employee.id === idOrName);
    return getEmpCover(emp);
  }
  const emp = data.employees.find(findByFirstOrLastName(idOrName));
  return getEmpCover(emp);
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
