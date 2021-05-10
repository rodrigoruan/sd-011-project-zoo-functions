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

// const { species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...idCode) {
  if (!idCode) {
    return [];
  }
  const specieList = data.species.filter((specie) => idCode.find((id) => specie.id === id));
  return specieList;
}

function getAnimalsOlderThan(animal, age) {
  // A partir do nome de uma espécie e uma idade mínima, verifica se todos os animais daquela espécie possuem a idade mínima especificada.
  const isOldEnough = data.species.filter((specie) => specie.name === animal)[0].residents.every((resident) => resident.age >= age);
  return isOldEnough;
}

function getEmployeeByName(employeeName) {
  // Busca das pessoas colaboradoras através do primeiro ou do último nome delas.
  if (!employeeName) {
    return {};
  }
  const employeeData = data.employees.filter((employee) => employeeName === employee.firstName || employeeName === employee.lastName);
  return employeeData[0];
}

function createEmployee(personalInfo, associatedWith) {
  // Capaz de criar um objeto equivalente ao de uma pessoa colaboradora, a partir de informações recebidas nos parâmetros.
  const employeeDataFile = Object.assign(personalInfo, associatedWith);
  return employeeDataFile;
}

function isManager(id) {
  // Verifica se uma pessoa colaboradora, a partir de seu id, ocupa cargo de gerência.
  const idIsOfManager = data.employees.some((employee) => employee.managers.includes(id));
  return idIsOfManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // Adiciona uma nova pessoa colaboradora ao array employees, presente no arquivo data.js.
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  const lastEmployee = data.employees[data.employees.length - 1];
  return lastEmployee;
}

function countAnimals(species) {
// Contabiliza a quantidade de animais.
  if (!species) {
    const specieQuantityList = data.species.reduce((acc, specie) => {
      acc[`${specie.name}`] = specie.residents.length;
      return acc;
    }, {});
    return specieQuantityList;
  }
  const specieQuantity = data.species.find((specie) => specie.name === species).residents.length;

  return specieQuantity;
}

function calculateEntry(entrants) {
  // A partir da quantidade de visitantes e a faixa etária de cada um, esta função é responsável por retornar o preço total a ser cobrado.
  if (!entrants || entrants === {}) return 0;

  const priceByAgeGroup = Object.entries(data.prices);
  const entrantsByAgeGroup = Object.entries(entrants);

  const totalPaid = entrantsByAgeGroup.reduce((acc, age) => acc + age[1] * priceByAgeGroup.find((ageGroup) => ageGroup[0] === age[0])[1], 0);

  return totalPaid;
}

function getAnimalMap({ includeNames, sorted, sex }) {
  // const filterByRegion = (local) => data.species.filter((specie) => specie.location === local).reduce((animalAcc, specie) => animalAcc.push(specie.name));
  // if (includeNames) {
  //   const getResidentListByRegion = (local) => {
  //     data.species
  //       .filter((specie) => specie.location === local)
  //       .forEach((specie) => specie
  //         .map(() => {
  //           specie.name = [];
  //           specie.name.push(specie.residents);
  //           if (sorted) return specie.name.sort(); return specie.name;
  //         }));
  //   };
  //   residentListNE = { ...getResidentListByRegion('NE') };
  //   residentListNW = { ...getResidentListByRegion('NW') };
  //   residentListSE = { ...getResidentListByRegion('SE') };
  //   residentListSW = { ...getResidentListByRegion('SW') };

  //   return data.species.map(() => ({ NE: [...getResidentListByRegion('NE')], NW: [...getResidentListByRegion('NW')], SE: [...getResidentListByRegion('SE')], SW: [...getResidentListByRegion('SW')] }));
  // }
  // data.species.map(() => ({ NE: filterByRegion('NE'), NW: filterByRegion('NW'), SE: filterByRegion('SE'), SW: filterByRegion('SW') }));
}
// console.log(data.species.filter((specie) => specie.location === 'NE'));

function getSchedule(dayName) {
  const scheduleWorkingHours = Object.values(data.hours).reduce((acc, workingHours, index) => {
    acc[index] = `Open from ${workingHours.open}am until ${workingHours.close - 12}pm`;
    if (workingHours.open === 0) {
      acc[index] = 'CLOSED';
    }
    return acc;
  }, []);

  const fullSchedule = Object.keys(data.hours).reduce((acc, day, index) => {
    acc[`${day}`] = scheduleWorkingHours[index];
    return acc;
  }, {});

  const scheduleOnChosenDay = Object.entries(fullSchedule).filter((day) => day[0] === dayName).reduce((acc, day) => {
    acc[`${day[0]}`] = `${day[1]}`;
    return acc;
  }, {});
  return !dayName ? fullSchedule : scheduleOnChosenDay;
}

function getOldestFromFirstSpecies(id) {
  const firstSpecieCaredByEmployee = data.employees.find((employee) => employee.id === id).responsibleFor[0];

  const ListOfResidentsCared = data.species.find((specie) => specie.id.includes(firstSpecieCaredByEmployee)).residents;

  const ageOfTheOldestResidentCared = ListOfResidentsCared.reduce((oldest, resident) => (oldest > resident.age ? oldest : resident.age), 0);

  const getTheOldestResidentCared = ListOfResidentsCared.filter((resident) => resident.age === ageOfTheOldestResidentCared);

  return Object.values(getTheOldestResidentCared[0]);
}

function increasePrices(percentage) {
  const pricesByAgeGroup = Object.entries(data.prices);

  pricesByAgeGroup.forEach((priceGroup) => {
    priceGroup[1] *= (1 + percentage / 100);
    data.prices[`${priceGroup[0]}`] = Math.round(priceGroup[1] * 100) / 100;
  });
}

function getEmployeeCoverage(idOrName) {
  const listOfAnimal = data.species.map((specie) => [specie.id, specie.name]);
  const employeeList = data.employees;

  const fullEmployeeList = employeeList.reduce((acc, employee) => {
    acc[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((specieCode) => listOfAnimal.find((specie) => specie[0] === specieCode)[1]);
    return acc;
  }, {});

  const employeeArray = data.employees.filter((employee) => employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName)
    .reduce((acc, employee) => {
      acc[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((specieCode) => listOfAnimal.find((specie) => specie[0] === specieCode)[1]);
      return acc;
    }, {});

  return !idOrName ? fullEmployeeList : employeeArray;
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
