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
  if (ids === []) {
    return [];
  }
  const arrayIds = ids.map((ID) => data.species.find((specie) => specie.id === ID));
  return arrayIds;
}

function getAnimalsOlderThan(animal, age) {
  const verifyAge = data.species.some((specie) => specie.name === animal && specie.residents.every((resident) => resident.age >= age));
  return verifyAge;
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const getEmployee = data.employees.filter((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return getEmployee[0];
}

function createEmployee(personalInfo, associatedWith) {
  // const { id, firstName, lastName } = personalInfo;
  // const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  const manage = data.employees.some((employee) => employee.managers.includes(id));
  return manage;
}

function addEmployee(idInput, firstNameInput, lastNameInput, managersInput = [], responsibleForInput = []) {
  const newEmployees = {
    id: idInput,
    firstName: firstNameInput,
    lastName: lastNameInput,
    managers: managersInput,
    responsibleFor: responsibleForInput,
  };

  return data.employees.push(newEmployees);
}

function countAnimals(species) {
  if (species === undefined) {
    const newAnimalObject = {};
    data.species.forEach((animal) => { newAnimalObject[`${animal.name}`] = animal.residents.length; });
    return newAnimalObject;
  }
  const animalQuantity = data.species.find((specie) => specie.name === species).residents.length;
  return animalQuantity;
}

function calculateEntry(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultValue = Adult * data.prices.Adult;
  const childValue = Child * data.prices.Child;
  const seniorValue = Senior * data.prices.Senior;
  return adultValue + childValue + seniorValue;
}

function getAnimalMap(options) {
  let maped = {};
  const NEList = data.species.filter((specie) => specie.location === 'NE');
  const NWList = data.species.filter((specie) => specie.location === 'NW');
  const SEList = data.species.filter((specie) => specie.location === 'SE');
  const SWList = data.species.filter((specie) => specie.location === 'SW');

  if (options === undefined || options === {}) {
    maped = {
      NE: NEList.map((specie) => specie.name),
      NW: NWList.map((specie) => specie.name),
      SE: SEList.map((specie) => specie.name),
      SW: SWList.map((specie) => specie.name),
    };
    return maped;
  }

  if (options.includeNames) {
    // const regions = data.species.map((item) => item.location );
    maped.NE = NEList.map((NEItem) => ({ [NEItem.name]: NEItem.residents.map((animalName) => animalName.name) }));
    maped.NW = NWList.map((NWItem) => ({ [NWItem.name]: NWItem.residents.map((animalName) => animalName.name) }));
    maped.SE = SEList.map((SEItem) => ({ [SEItem.name]: SEItem.residents.map((animalName) => animalName.name) }));
    maped.SW = SWList.map((SWItem) => ({ [SWItem.name]: SWItem.residents.map((animalName) => animalName.name) }));
    return maped;
  }
}

// console.log(getAnimalMap({ includeNames: true }));

function getSchedule(dayName) {
  const days = Object.keys(data.hours);
  const hour = Object.values(data.hours);
  const workingHours = hour.map((time) => (time.open === 0 ? 'CLOSED' : `Open from ${time.open}am until ${time.close - 12}pm`));
  const newArray = days.map((day, index) => ({ [day]: workingHours[index] }));
  const fullDays = Object.assign({}, ...newArray);
  if (dayName === undefined) {
    return fullDays;
  }
  const exactDay = newArray.filter((x) => Object.keys(x)[0] === dayName);
  return exactDay[0];
}

function getOldestFromFirstSpecies(id) {
  const findFirstSpecieOfEmployee = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const caredAnimal = data.species.find((specie) => specie.id === findFirstSpecieOfEmployee);
  // const olderAnimalAge = caredAnimal.residents.reduce((older, actualAge) => actualAge.age > older ? older = actualAge.age : older, 0)
  const olderAnimalAge = caredAnimal.residents.reduce((older, actualAge) => {
    if (actualAge.age > older) {
      older = actualAge.age;
    }
    return older;
  }, 0);
  const olderSpecie = Object.values(caredAnimal.residents.find((resident) => resident.age === olderAnimalAge));
  return olderSpecie;
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
