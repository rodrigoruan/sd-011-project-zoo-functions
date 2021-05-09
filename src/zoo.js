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

function getSpeciesByIds(...idCode) {
  if (!idCode) {
    return [];
  }
  // let idCodeList = [...idCode];
  const specieList = data.species.filter((specie) => idCode.find((id) => specie.id === id));
  return specieList;
}

function getAnimalsOlderThan(animal, age) { // Tá dizendo que residents is undefined.
  // A partir do nome de uma espécie e uma idade mínima, 
  // verifica se todos os animais daquela espécie possuem a idade mínima especificada.
  // return data.species.find((specie) => specie.name === animal).every((resident) => resident.age >= age);
  const isOldEnough = data.species.filter((specie) => specie.name === animal)[0].residents.every((resident) => resident.age >= age);
  return isOldEnough;
}
console.log(getAnimalsOlderThan('otters', 7));

function getEmployeeByName(employeeName) { // Tá imprimindo array ao invés de object.
  // Busca das pessoas colaboradoras através do primeiro ou do último nome delas.
  if (!employeeName) {
    return {};
  }
  const employeeData = data.employees.filter((employee) => employeeName === employee.name || employeeName === employee.lastName);
  return employeeData;
  // return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}
// console.log(getEmployeeByName('Wishart'));

function createEmployee(personalInfo, associatedWith) {
  // const ({ id, firstName, lastName } = personalInfo);
  // Capaz de criar um objeto equivalente ao de uma pessoa colaboradora, a partir de informações recebidas nos parâmetros.
  // const employeePersonalInfo = data.employees.map((personalInfo) => ({ id: personalInfo.id, firstName: personalInfo.firstName, lastName: personalInfo.lastName }));
  // const employeeAssociatedWith = data.employees.map((associatedWith) => ({ managers: associatedWith.managers, responsibleFor: associatedWith.responsibleFor }));

  // return employeePersonalInfo;
}

function isManager(id) {
  // Verifica se uma pessoa colaboradora, a partir de seu id, ocupa cargo de gerência.
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee({ id, firstName, lastName, managers, responsibleFor }) {
  // Adiciona uma nova pessoa colaboradora ao array employees, presente no arquivo data.js.
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // Contabiliza a quantidade de animais.
  // data.species.find((specie) => specie.resident.length,s
  // data.species.map((specie) => ({ `${specie.name}`: specie.residents.length })));
}

function calculateEntry(entrants) {
  // A partir da quantidade de visitantes e a faixa etária de cada um, esta função é responsável por retornar o preço total a ser cobrado.
  // if (!entrants || entrants === {}) return 0;
  // const prices = {adult: 49.99, child: 20.99, senior: 24.99};
  // entrants.array.forEach(element => {
  
  // return totalPaid;
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
  // if (!dayName) {
  // const weekDaysAndHours = Object.entries(data.hours);
  // return weekDaysAndHours.map((day) => {{ ola: `Open from ${day[1].open}am until ${day[1].close}pm`, }});
  // }
}
// console.log(getSchedule());

function getOldestFromFirstSpecies(id) {
  const getAnimalIdbyEmployee = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const oldestAnimalAge = data.species.find((specie) => specie.id === getAnimalIdbyEmployee).residents.reduce((acc, resident) => acc < resident.age ? acc = resident.age : acc, 0);
  const oldestResident = data.species.find((specie) => specie.id === getAnimalIdbyEmployee).residents.filter((resident) => resident.age === oldestAnimalAge);
  return Object.values(oldestResident[0]);
}

function increasePrices(percentage) {
  let { Adult: adult, Senior: senior, Child: child } = data.prices;

  adult *= 1 + percentage / 100;
  senior *= 1 + percentage / 100;
  child *= 1 + percentage / 100;

  let newPriceList = {};
  newPriceList.Adult = adult.toFixed(2);
  newPriceList.Senior = senior.toFixed(2);
  newPriceList.Child = child.toFixed(2);
  return newPriceList;
}

function getEmployeeCoverage(idOrName) {
  // if (!idOrName) {
    // const employeeData = Object.values(data.employees);
    // const specieSupervisioned = data.species.find((animal) => animal.id === employee.responsibleFor[index]);
//     for (let specieSupervisioned in data.employees.responsibleFor) {
//       if (specieSupervisioned) {
//         const specieSupervisionedName = data.species.find((specie) => specie.id === specieSupervisioned).name;
//       }
//     }
//       const employeeReport = data.employees.reduce(
//           (acc, employee) => {
//             acc[`${employee.firstName} ${employee.lastName}`] = specieSupervisionedName;
//             return acc;
//           }, '');
//       } 
//     return employeeReport;
// }
// console.log(getEmployeeCoverage());
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
