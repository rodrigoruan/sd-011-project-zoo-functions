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
  // const returnArray = data.species.filter((animal) => ids === 'undefined'? [] : specie.id === ids[0] || specie.id === ids[1]);
  const returnArray = data.species.filter((specie) => (ids === 'undefined' ? [] : ids.some((identifie) => specie.id === identifie)));
  return returnArray;
}

function getAnimalsOlderThan(animal, age) {
  const obj = data.species.find((animals) => animals.name === animal);
  const returnBool = obj.residents.every((single) => single.age >= 7);
  return returnBool;
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const returnObj = data.employees.find((emp) => emp.firstName === employeeName || emp.lastName === employeeName);
  return returnObj;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const mngReturn = data.employees.some((mnger) => mnger.managers.includes(id));
  return mngReturn;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) {
    managers = [];
  }
  if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  const addEmp = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return addEmp;
}

function countAnimals(species) {
  if (species === undefined) {
    const obj = {};
    data.species.forEach((spec) => {
      obj[spec.name] = spec.residents.length;
    });
    return obj;
  }
  const countReturn = data.species.find((eachOne) => eachOne.name === species).residents.length;
  return countReturn;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }

  const objKeys = Object.keys(entrants);

  const reducedKeys = objKeys.reduce((acc, keys) => acc + (data.prices[keys] * entrants[keys]), 0);

  return reducedKeys;
}

function getAnimalMap(options) {
  // seu código aqu
}

function getSchedule(dayName) {
  const hoursKeys = Object.keys(data.hours);
  const unObj = {};
  if (!dayName) {
    hoursKeys.forEach((days) => {
      unObj[days] = `Open from ${data.hours[days].open}am until ${(data.hours[days].close) - 12}pm`;
      if (days === 'Monday') {
        unObj[days] = 'CLOSED';
      }
    });
    return unObj;
  }
  if (dayName === 'Monday') {
    unObj[dayName] = 'CLOSED';
    return unObj;
  }
  unObj[dayName] = `Open from ${data.hours[dayName].open}am until ${(data.hours[dayName].close) - 12}pm`;
  return unObj;
}

function getOldestFromFirstSpecies(id) {
  const getEmp = data.employees.find((emp) => emp.id === id);
  const getAnimal = data.species.find((anim) => getEmp.responsibleFor[0] === anim.id);
  const getResident = getAnimal.residents.reduce((acc, cur) => (cur.age > acc.age ? cur : acc));
  return [getResident.name, getResident.sex, getResident.age];
}

function increasePrices(percentage) {
  const pricesKeys = Object.keys(data.prices);
  const returnNewPrices = pricesKeys.forEach((person) => {
    const newPrices = (data.prices[person] * ((percentage / 100) + 1)) + 0.001;
    data.prices[person] = parseFloat(newPrices.toFixed(2));
  });
}

function getEmployeeCoverage(idOrName) {
  const returnCoverageObj = {};
  if (!idOrName) {
    const fullCoverage = data.employees.forEach((employ) => {
      const fullName = `${employ.firstName} ${employ.lastName}`;
      returnCoverageObj[fullName] = employ.responsibleFor.map((valueId) => data.species.find((singleId) => singleId.id === valueId).name);
    });
  }
  if (idOrName) {
    data.employees.forEach((empl) => {
      if (idOrName === empl.firstName || idOrName === empl.lastName || idOrName === empl.id) {
        const fullName = `${empl.firstName} ${empl.lastName}`;
        returnCoverageObj[fullName] = empl.responsibleFor.map((valueId) => data.species.find((singleId) => singleId.id === valueId).name);
      }
    });
  }

  return returnCoverageObj;
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
