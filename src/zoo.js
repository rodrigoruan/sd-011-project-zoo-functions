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

const getSpeciesByIds = (...ids) => data.species.filter(({ id }) => ids.includes(id));

const getAnimalsOlderThan = (animal, age) => data.species.find(({ name }) => name === animal).residents.every(({ age: animalAge }) => age < animalAge);

const getEmployeeByName = (employeeName) => {
  const employeer = data.employees.find(({ firstName, lastName, id }) => employeeName === firstName || employeeName === lastName || employeeName === id);
  return employeer !== undefined ? employeer : {};
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => data.employees.reduce(((acc, { managers }) => (acc || managers.includes(id))), false);

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
};

const countAnimals = (species) => {
  const animals = data.species.reduce(((acc, current) => {
    acc[current.name] = current.residents.length;
    return acc;
  }), {});
  console.log(animals);
  return species ? animals[species] : animals;
};

const calculateEntry = (entrants) => {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const { Adult: adultPrice, Child: childPrice, Senior: seniorPrice } = data.prices;
  return Adult * adultPrice + Child * childPrice + Senior * seniorPrice;
};

const getAnimalsNames = (animal, sex) => {
  let animals = data.species.find((element) => element.name === animal).residents;
  if (sex) animals = animals.filter((element) => element.sex === sex);
  return animals.reduce(((acc, current) => [...acc, current.name]), []);
};

const getAnimalsOnZone = (animals, sorted, sex) => {
  const animalsOnZone = [];
  animals.forEach((animal) => animalsOnZone.push({ [animal]: (sorted ? getAnimalsNames(animal, sex).sort() : getAnimalsNames(animal, sex)) }));
  return animalsOnZone;
};

const getAnimalsWithOptions = ({ sorted = false, sex = false }, zones) => {
  Object.keys(zones).forEach((zone, index) => { zones[zone] = getAnimalsOnZone(zones[zone], sorted, sex); });
  return zones;
};

const getAnimalMap = (options) => {
  const zones = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  data.species.forEach((animal) => { zones[animal.location].push(animal.name); });
  return options && options.includeNames ? getAnimalsWithOptions(options, zones) : zones;
};

const getSchedule = (dayName) => {
  const schedule = Object.keys(data.hours).reduce(((arr, current) => {
    arr[current] = current !== 'Monday' ? `Open from ${data.hours[current].open}am until ${data.hours[current].close - 12}pm` : 'CLOSED';
    return arr;
  }), {});

  return !dayName ? schedule : { [dayName]: schedule[dayName] };
};

const getOldestFromFirstSpecies = (id) => {
  const employeer = data.employees.find((employee) => employee.id === id);
  const specie = data.species.find((animal) => animal.id === employeer.responsibleFor[0]);
  return Object.values(specie.residents.reduce((arr, current) => (current.age > arr.age ? current : arr)));
};

const increasePrices = (percentage) => {
  Object.keys(data.prices).forEach((element) => {
    data.prices[element] = Math.round((data.prices[element] * (percentage / 100 + 1)) * 100) / 100;
  });
};

const getEmployeeCoverage = (idOrName) => {
  const employeeCoverage = data.employees.reduce(((arr, { firstName, lastName, responsibleFor }) => {
    arr[`${firstName} ${lastName}`] = responsibleFor.map((id) => getSpeciesByIds(id)[0].name);
    return arr;
  }), {});

  if (!idOrName) return employeeCoverage;

  const employee = getEmployeeByName(idOrName);
  const fullName = `${employee.firstName} ${employee.lastName}`;
  return { [fullName]: employeeCoverage[fullName] };
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
