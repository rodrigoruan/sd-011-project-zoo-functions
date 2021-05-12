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
  // seu código aqui
  const filterIds = data.species.filter(({ id }) => ids.includes(id));
  return filterIds;
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const findResidents = data.species.find(({ name }) => name === animal).residents;
  const checkAge = findResidents.every((resident) => (resident.age >= age));
  return checkAge;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  const findEmployee = data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
  return (!employeeName) ? {} : findEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  const mapEmployee = data.employees.some(({ managers }) => managers.includes(id));
  return mapEmployee;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species) {
  // seu código aqui
  const allSpecies = data.species.reduce(((accObject, { name, residents }) => {
    accObject[name] = residents.length;
    return accObject;
  }), {});

  return (!species) ? allSpecies : data.species.find((element) => element.name === species).residents.length;
}

function calculateEntry({ Adult = 0, Senior = 0, Child = 0 } = 0) {
  // seu código aqui
  return ((Adult * data.prices.Adult) + (Senior * data.prices.Senior) + (Child * data.prices.Child));
}

function getAnimalMap(object = { includeNames: false, sex: undefined, sorted: false }) {
  // seu código aqui
  const residentNames = (acc, cur) => {
    acc.push(cur.name);
    return acc;
  };

  const filterSex = (resident) => resident.sex === object.sex;

  const sexTrueOrFalse = (residents) => {
    let residentsArray;
    if (!object.sex) {
      residentsArray = residents.reduce(residentNames, []);
    } else {
      residentsArray = residents.filter(filterSex).reduce(residentNames, []);
    }
    if (object.sorted === true) {
      residentsArray.sort();
    }
    return residentsArray;
  };

  const nameTrueOrFalse = (accArray, name, residents) => {
    if (object.includeNames === true) {
      const objectSpecie = {};
      objectSpecie[name] = sexTrueOrFalse(residents);
      accArray.push(objectSpecie);
    } else {
      accArray.push(name);
    }
    return accArray;
  };

  const locateSpecies = (locate) => data.species.reduce((accArray, { name, location, residents }) => {
    if (locate === location) {
      nameTrueOrFalse(accArray, name, residents);
    }
    return (accArray);
  }, []);

  const createObject = (func) => ({
    NE: func('NE'),
    NW: func('NW'),
    SE: func('SE'),
    SW: func('SW'),
  });

  return createObject(locateSpecies);
}

const allHours = Object.keys(data.hours).reduce((accObject, curName) => {
  if (data.hours[curName].open === 0) {
    accObject[curName] = 'CLOSED';
  } else {
    accObject[curName] = `Open from ${data.hours[curName].open}am until ${data.hours[curName].close - 12}pm`;
  }
  return accObject;
}, {});

function getSchedule(dayName) {
  // seu código aqui
  const dayHour = Object.keys(allHours).reduce((accObject, curName) => {
    if (curName === dayName) {
      accObject[curName] = allHours[curName];
    }
    return accObject;
  }, {});
  return (!dayName) ? allHours : dayHour;
}

console.log(getSchedule());

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
