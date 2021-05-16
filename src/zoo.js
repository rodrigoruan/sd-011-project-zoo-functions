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
  return data.species.filter((specie) => ids.some((value) => value === specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((specie) => specie.name === animal)
    .residents
    .every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees.find((employee) => (employee.firstName === employeeName || employee.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  if (!species) {
    const speciesTotals = {};
    const criaObjeto = (animal) => {
      speciesTotals[animal.name] = animal.residents.length;
    };
    data.species.forEach(criaObjeto);
    return speciesTotals;
  }
  return data.species.find((specie) => specie.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const people = Object.entries(entrants); // Entrants não é array
  const totalizer = (acc, cur) => acc + (cur[1] * data.prices[cur[0]]);
  return people.reduce(totalizer, 0);
}

function getAnimalMap(options) {
  const regionalizer = (acc, cur) => {
    acc[cur.location] = data.species
      .filter((specie) => specie.location === cur.location).map((animal) => animal.name);
    return acc;
  };
  if (!options) { return data.species.reduce(regionalizer, { }); }

  const { includeNames, sorted, sex } = options;
  const identifier = (acc, cur) => {
    if (sex && sorted) {
      acc[cur.location] = data.species.filter((specie) => specie.location === cur.location)
        .map((animal) => ({ [animal.name]: animal.residents.filter((resident) => resident.sex === sex).map((names) => names.name).sort() }));
    } else if (sex) {
      acc[cur.location] = data.species.filter((specie) => specie.location === cur.location)
        .map((animal) => ({ [animal.name]: animal.residents.filter((resident) => resident.sex === sex).map((names) => names.name) }));
    } else if (sorted) {
      acc[cur.location] = data.species.filter((specie) => specie.location === cur.location)
        .map((animal) => ({ [animal.name]: animal.residents.map((names) => names.name).sort() }));
    } else {
      acc[cur.location] = data.species.filter((specie) => specie.location === cur.location)
        .map((animal) => ({ [animal.name]: animal.residents.map((names) => names.name) }));
    }
    return acc;
  };

  let way;
  if (!includeNames) { way = regionalizer; }
  if (includeNames) { way = identifier; }
  return data.species.reduce(way, { });
}

function getSchedule(dayName) {
  let week = Object.entries(data.hours); // HOURS NÃO È ARRAY
  if (dayName) {
    week = week.filter((item) => item[0] === dayName);
  }
  const schedWriter = (acc, cur) => {
    let text = '';
    if (cur[0] !== 'Monday') {
      text = `Open from ${cur[1].open}am until ${cur[1].close - 12}pm`;
    } else text = 'CLOSED';
    acc[cur[0]] = text;
    return acc;
  };
  return week.reduce(schedWriter, { });
}

function getOldestFromFirstSpecies(id) {
  const firstSpecieId = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const specieResidents = data.species.find((specie) => specie.id === firstSpecieId).residents;
  const oldest = specieResidents.sort((a, b) => (b.age > a.age ? 1 : -1))[0];
  const { name, sex, age } = oldest;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const value = Object.entries(data.prices);
  const multiply = (acc, cur) => {
    acc[cur[0]] = Math.ceil((100 + percentage) * cur[1]) / 100;
    return acc;
  };
  data.prices = value.reduce(multiply, {});
}

function getEmployeeCoverage(idOrName) {
  let array = data.employees;
  if (idOrName) {
    array = array.filter((employee) => employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  }
  const populateObject = (acc, cur) => {
    acc[`${cur.firstName} ${cur.lastName}`] = cur.responsibleFor
      .map((id) => data.species.find((specie) => specie.id === id).name);
    return acc;
  };
  return array.reduce(populateObject, { });
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
