/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }]
*/

const data = require('./data');

const { species, employees, hours, prices } = data;

function getSpeciesByIds(...ids) {
  // read ids
  const idsToSearch = ids;
  // create a const that will receive filtered animals
  const filteredAnimals = [];
  // iterate species checking for ids
  idsToSearch.forEach((id) => {
    species.forEach((specie) => {
      if (specie.id === id) filteredAnimals.push(specie);
    });
  });
  return filteredAnimals;
}

function getAnimalsOlderThan(animal, age) {
  // read parameters
  const AnimalsToSearch = animal;
  const ageEqualOrGreaterThan = age;
  let filteredAnimalsByAge;
  // iterate species searching by animal specie
  // verify and return a bolean if all animals are age === or >=  ageEqualOrGreaterThan
  species.forEach((specie) => {
    if (specie.name === AnimalsToSearch) {
      filteredAnimalsByAge = specie.residents.every((resident) => resident.age >= ageEqualOrGreaterThan);
    }
  });
  return filteredAnimalsByAge;
}

function getEmployeeByName(employeeName) {
  let filteredEmployees = {};
  let employeeToFilter = employeeName;
  employees.forEach((employee) => {
    if (employee.firstName === employeeToFilter || employee.lastName === employeeToFilter) {
      filteredEmployees = employee;
    }
  });
  return filteredEmployees;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((managers) => managers === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(speciesToCount) {
  if (!speciesToCount) {
    // Diego ---- REVISAR ESSA DESESTRUTURAÇÃO ----
    return species.reduce((specie, { name: animalName, residents: residentsInfo }) => {
      specie[animalName] = residentsInfo.length;
      return specie;
    }, {});
  }
  return species.find((specie) => specie.name === speciesToCount).residents.length;
}

function calculateEntry(entrants = 0) {
  const { Adult, Child, Senior } = prices;

  // caso o item a ser verificado seja null ou undefined atribui o valor passado
  // const adultsTotal = (entrants.Adult ?? 0) * Adult;
  // const childsTotal = (entrants.Child ?? 0) * Child;
  // const seniorsTotal = (entrants.Senior ?? 0) * Senior;

  // esperado pelo lint
  const adultsTotal = (entrants.Adult ? entrants.Adult : 0) * Adult;
  const childsTotal = (entrants.Child ? entrants.Child : 0) * Child;
  const seniorsTotal = (entrants.Senior ? entrants.Senior : 0) * Senior;
  return adultsTotal + childsTotal + seniorsTotal;
}

function getAnimalMap({ includeName = false, sorted = false, sex = false }) {
  const NE = species.filter(({ location }) => location === 'NE');
  const NW = [];
  const SE = [];
  const SW = [];

  // species.forEach((specie) => {
  //   if (specie.location === 'NE') {
  //     if (includeName) {
  //       if (sorted && sex) {
  //         // SORTED && SEX
  //         NE[specie.name] = specie.residents.map((animal) => {
  //           if (animal.name && animal.sex === 'male') {
  //             return animal.name;
  //           }
  //           return animal.name;
  //         });
  //         return NE[specie.name] = NE[specie.name].sort();
  //       }
  //       // ONLY SORTED
  //       NE[specie.name] = specie.residents.map(({ name }) => name);
  //       return NE[specie.name] = NE[specie.name].sort();
  //     }
  //     NE[specie.name] = specie.residents.map(({ name }) => name);
  //   };

  //   // DEPOIS DE TODOS OS CASOS NE.push(specie.name);
  //   if (specie.location === 'NW') NW.push(specie.name);
  //   if (specie.location === 'SE') SE.push(specie.name);
  //   if (specie.location === 'SW') SW.push(specie.name);
  // });

  return {
    NE,
    NW,
    SE,
    SW,
  };
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  let olderAge = 0;
  let olderResident;
  const animalId = employees.find((employee) => employee.id === id).responsibleFor[0];
  const specieFiltred = species.find((specie) => specie.id === animalId).residents;
  specieFiltred.forEach((resident) => {
    if (resident.age >= olderAge) {
      olderAge = resident.age;
      olderResident = Object.values(resident);
    }
  });
  return olderResident;
}

function increasePrices(percentage) {
  let percentToAdd = percentage / 100;
  let { Adult, Child, Senior } = prices;

  const valueToAddAdult = parseFloat(Adult) * percentToAdd;
  const valueToAddChild = parseFloat(Child) * percentToAdd;
  const valueToAddSenior = parseFloat(Senior) * percentToAdd;

  const finalValueAdult = (Adult + parseFloat(valueToAddAdult.toFixed(2))).toFixed(2);
  const finalValueChild = (Child + parseFloat(valueToAddChild.toPrecision(3))).toFixed(2);
  const finalValueSenior = (Senior + (parseFloat(valueToAddSenior + 0.005))).toFixed(2);

  data.prices.Adult = Number(finalValueAdult);
  data.prices.Senior = Number(finalValueSenior);
  data.prices.Child = Number(finalValueChild);
}

// function getEmployeeCoverage(idOrName) {
//   const object = {};
//   // species.forEach((animal) => {
//   //   animalNamesById[animal.id] = animal.name;
//   // })

//   // const employeesAndAnimals = {};
//   // employees.forEach((employee) => {
//   //   let employeeName = `${employee.firstName} ${employee.lastName}`;
//   //   employeesAndAnimals[employeeName] = employee.responsibleFor.forEach((id) => 1);
//   // });
//   if (!idOrName) {
//     data.employees.forEach(({ firstName, lastName, responsibleFor }) => {
//       object[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
//     });
//   }

//   employees.filter(({ firstName, lastName, id }) => { firstName === idOrName || lastName === idOrName || id === idOrName })
//     .forEach(({ firstName, lastName, responsibleFor }) => {
//       object[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => species.find(({ id }) => id === animalId).name);
//     });

//   return object
// }

function getEmployeeCoverage(idOrName) {
  const object = {};

  if (!idOrName) {
    data.employees.forEach(({ firstName, lastName, responsibleFor }) => {
      object[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
    });
  }
  data.employees.filter(({ firstName, lastName, id }) => firstName === idOrName || lastName === idOrName || id === idOrName).forEach(({ firstName, lastName, responsibleFor }) => { object[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name); });

  return object;
}
getEmployeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad')
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
