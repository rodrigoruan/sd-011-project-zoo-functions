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
  // Ela retorna um array contendo as espécies referentes aos ids passados como parâmetro, podendo receber um ou mais ids.
  if (!idCode) {
    return [];
  }
  return data.species.filter((specie) => specie.id === idCode);
}

function getAnimalsOlderThan(animal, age) {
  // A partir do nome de uma espécie e uma idade mínima, 
  // verifica se todos os animais daquela espécie possuem a idade mínima especificada.
  return data.species.find((specie) => specie.name === animal).every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  // Busca das pessoas colaboradoras através do primeiro ou do último nome delas.
  if (!employeeName) {
    return {};
  }
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

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
  if (includeNames) {
    const getResidentListByRegion = (local) => {
      data.species
        .filter((specie) => specie.location === local)
        .forEach((specie) => specie
          .map(() => {
            specie.name = [];
            specie.name.push(specie.residents);
            if (sorted) return specie.name.sort(); return specie.name;
          }));
    };
    residentListNE = { ...getResidentListByRegion('NE') };
    residentListNW = { ...getResidentListByRegion('NW') };
    residentListSE = { ...getResidentListByRegion('SE') };
    residentListSW = { ...getResidentListByRegion('SW') };

    return data.species.map(() => ({ NE: [...getResidentListByRegion('NE')], NW: [...getResidentListByRegion('NW')], SE: [...getResidentListByRegion('SE')], SW: [...getResidentListByRegion('SW')] }));
  }
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
console.log(getOldestFromFirstSpecies('56d43ba3-a5a7-40f6-8dd7-cbb05082383f'));

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
