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

const { species } = data;

function getSpeciesByIds(...ids) {
  let result = [];
  ids.forEach((id) => {
    species.forEach((specie) => {
      if (specie.id === id) result.push(specie);
    });
  });
  return result;
}

function getAnimalsOlderThan(animal, age) {
  let result = true;
  species.forEach((specie, index) => {
    if (specie.name === animal) {
      const { residents } = species[index];
      residents.forEach((resident) => {
        if (resident.age < age) result = false;
      });
    }
  });
  return result;
}

const { employees } = data;

function getEmployeeByName(employeeName) {
  let result = {};
  employees.forEach((employee) => {
    if (employee.firstName === employeeName || employee.lastName === employeeName) {
      result = employee;
    }
  });
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const managersGroups = employees.map((employee) => employee.managers);
  let managers = [];
  managersGroups.forEach((managerGroup) => {
    managers = [...managers, ...managerGroup];
  });
  const result = managers.some((manager) => manager === id);
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees = [...data.employees, {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  }];
}

function countAnimals(searchSpecie) {
  let result = {};
  if (searchSpecie === undefined) {
    species.forEach((specie) => {
      result[specie.name] = specie.residents.length;
    });
    return result;
  }
  const selectedSpecie = species.find((specie) => specie.name === searchSpecie);
  result = selectedSpecie.residents.length;
  return result;
}

const { prices } = data;

function calculateEntry(entrants = { Adult: 0, Child: 0, Senior: 0 }) {
  let total = 0;
  if (entrants.Adult !== undefined) total = entrants.Adult * prices.Adult;
  if (entrants.Child !== undefined) total += entrants.Child * prices.Child;
  if (entrants.Senior !== undefined) total += entrants.Senior * prices.Senior;
  return total;
}

// const defaultAnimalMap = (result) => {
//   if (result === 'lions') return result;
//   let newResult = result;
//   species.forEach((specie) => {
//     if (specie.location === 'NE') newResult.NE.push(specie.name);
//     if (specie.location === 'NW') newResult.NW.push(specie.name);
//     if (specie.location === 'SE') newResult.SE.push(specie.name);
//     if (specie.location === 'SW') newResult.SW.push(specie.name);
//   });
//   return newResult;
// };

// const namedAnimalMap = (result, includeNames) => {
//   if (includeNames !== true || result === 'lions') return result;
//   const { NE, NW, SE, SW } = result;
//   const newResult = { NE: [], NW: [], SE: [], SW: [] };
//   NE.forEach((specieNE, index) => {
//     newResult.NE[index] = { [specieNE]: [] };
//     const specieInfoNE = species.find((specie) => specie.name === specieNE);
//     specieInfoNE.residents.forEach((resident) => newResult.NE[index][specieNE].push(resident.name));
//   });
//   NW.forEach((specieNW, index) => {
//     newResult.NW[index] = { [specieNW]: [] };
//     const specieInfoNW = species.find((specie) => specie.name === specieNW);
//     specieInfoNW.residents.forEach((resident) => newResult.NW[index][specieNW].push(resident.name));
//   });
//   SE.forEach((specieSE, index) => {
//     newResult.SE[index] = { [specieSE]: [] };
//     const specieInfoSE = species.find((specie) => specie.name === specieSE);
//     specieInfoSE.residents.forEach((resident) => newResult.SE[index][specieSE].push(resident.name));
//   });
//   SW.forEach((specieSW, index) => {
//     newResult.SW[index] = { [specieSW]: [] };
//     const specieInfoSW = species.find((specie) => specie.name === specieSW);
//     specieInfoSW.residents.forEach((resident) => newResult.SW[index][specieSW].push(resident.name));
//   });
//   return newResult;
// };

// const genreAnimalMap = (result, sex) => {
//   if (result = 'lions') return result;
//   let newResult = result;
//   const { NE, NW, SE, SW } = newResult;
//   const regions = [NE, NW, SE, SW];
//   regions.forEach((region) => {
//     region.forEach((specieRegion, index1) => {
//       const currentSpecie = Object.keys(specieRegion)[0];
//       const specieInfo = species.find((specie) => currentSpecie === specie.name);
//       console.log(specieInfo);
//       let splicePointer = 0;
//       specieInfo.residents.forEach((resident, index2) => {
//         if (resident.sex !== sex) {
//           region[index1][currentSpecie].splice(index2 + splicePointer, 1);
//           splicePointer -= 1;
//         }
//       });
//     });
//   });
//   return newResult;
// };

// const sortedAnimalMap = (result, sorted) => {
//   if (sorted !== true) return result;
//   let newResult = result;
//   const { NE, NW, SE, SW } = newResult;
//   const regions = [NE, NW, SE, SW];
//   regions.forEach((region) => {
//     region.forEach((specieRegion) => {
//       const animalsNames = Object.values(specieRegion);
//       animalsNames[0].sort();
//     });
//   });
//   return result;
// };

// function getAnimalMap(options = { includeNames: false, sex: '', sorted: false }) {
//   const { includeNames, sex, sorted } = options;
//   let result = {
//     NE: [],
//     NW: [],
//     SE: [],
//     SW: [],
//   };
//   if (includeNames !== true && (sorted === true || sex === 'male' || sex === 'female')) result = 'lions';
//   result = defaultAnimalMap(result);
//   result = namedAnimalMap(result, includeNames);
//   if (sex === 'male' || sex === 'female') result = genreAnimalMap(result, sex);
//   result = sortedAnimalMap(result, sorted);
//   return result;
// }

const { hours } = data;

const defaultSchedule = (result) => {
  const daysOfWeek = Object.keys(hours);
  result = hours;
  daysOfWeek.forEach((day) => {
    result[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    if (day === 'Monday') result[day] = 'CLOSED';
  });
  return result;
};

function getSchedule(dayName) {
  let result = {};
  const daysOfWeek = Object.keys(hours);
  const daySelected = daysOfWeek.find((day) => day === dayName);
  if (daySelected === undefined) return result = defaultSchedule(result);
  daysOfWeek.forEach((day) => {
    if (day === dayName) {
      result[day] = `Open from ${hours[day].open}am until ${hours[day].close}pm`;
      if (day === 'Monday') result[day] = 'CLOSED';
    }
  });
  return result;
}

function getOldestFromFirstSpecies(id) {
  let result = [];
  const employeSelected = employees.find((employee) => employee.id === id);
  const firstSpecie = employeSelected.responsibleFor[0];
  const specieSelected = species.find((specie) => specie.id === firstSpecie);
  specieSelected.residents.forEach((resident, index) => {
    if (index === 0) result = [resident.name, resident.sex, resident.age];
    if (result[2] < resident.age) result = [resident.name, resident.sex, resident.age];
  });
  return result;
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
  // getAnimalMap,
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
