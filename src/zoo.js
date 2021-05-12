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
const { employees } = data;
const { hours } = data;
const { prices } = data;

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

function calculateEntry(entrants = { Adult: 0, Child: 0, Senior: 0 }) {
  let total = 0;
  if (entrants.Adult !== undefined) total = entrants.Adult * prices.Adult;
  if (entrants.Child !== undefined) total += entrants.Child * prices.Child;
  if (entrants.Senior !== undefined) total += entrants.Senior * prices.Senior;
  return total;
}

const defaultAnimalMap = () => {
  let result = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  species.forEach((specie) => {
    if (specie.location === 'NE') result.NE.push(specie.name);
    if (specie.location === 'NW') result.NW.push(specie.name);
    if (specie.location === 'SE') result.SE.push(specie.name);
    if (specie.location === 'SW') result.SW.push(specie.name);
  });
  return result;
};

const namedAnimalMap = () => {
  let result = defaultAnimalMap();
  const regions = Object.keys(result);
  regions.forEach((regionSpecies) => {
    result[regionSpecies].forEach((regionSpecie, index) => {
      const specieInfo = species.find((specie) => specie.name === regionSpecie);
      result[regionSpecies][index] = { [regionSpecie]: [] };
      specieInfo.residents.forEach((resident) => {
        result[regionSpecies][index][regionSpecie].push(resident.name);
      });
    });
  });
  return result;
};

const genreAnimalMap = (result, sex) => {
  let updatedResult = { ...result };
  const regions = Object.keys(updatedResult);
  regions.forEach((regionSpecies) => {
    updatedResult[regionSpecies].forEach((regionSpecie, index1) => {
      const currentSpecie = Object.keys(regionSpecie)[0];
      const specieInfo = species.find((specie) => currentSpecie === specie.name);
      let splicePointer = 0;
      specieInfo.residents.forEach((resident, index2) => {
        if (resident.sex !== sex) {
          updatedResult[regionSpecies][index1][currentSpecie].splice(index2 + splicePointer, 1);
          splicePointer -= 1;
        }
      });
    });
  });
  return updatedResult;
};

const sortedAnimalMap = (result, sorted) => {
  if (sorted !== true) return result;
  let newResult = result;
  const { NE, NW, SE, SW } = newResult;
  const regions = [NE, NW, SE, SW];
  regions.forEach((region) => {
    region.forEach((specieRegion) => {
      const animalsNames = Object.values(specieRegion);
      animalsNames[0].sort();
    });
  });
  return result;
};

function getAnimalMap(options = { includeNames: undefined, sex: undefined, sorted: undefined }) {
  const { includeNames, sex, sorted } = options;
  let result = 'lions';
  if (includeNames === true) {
    result = namedAnimalMap();
    if (sex === 'male' || sex === 'female') result = genreAnimalMap(result, sex);
    if (sorted === true) result = sortedAnimalMap(result);
  } else if ([sex, sorted].every((element) => element === undefined)) result = defaultAnimalMap();
  return result;
}

console.log(getAnimalMap(options = { includeNames: true, sex: 'female', sorted: undefined }));

const selectedDaySchedule = (dayName) => {
  let result = {};
  const daysOfWeek = Object.keys(hours);
  daysOfWeek.forEach((day) => {
    if (day === dayName) {
      result[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
      if (day === 'Monday') result[day] = 'CLOSED';
    }
  });
  return result;
};

function getSchedule(dayName) {
  let result = {};
  const daysOfWeek = Object.keys(hours);
  const daySelected = daysOfWeek.find((day) => day === dayName);
  if (daySelected === undefined) {
    result = { ...hours };
    daysOfWeek.forEach((day) => {
      result[day] = `Open from ${result[day].open}am until ${result[day].close - 12}pm`;
      if (day === 'Monday') result[day] = 'CLOSED';
    });
    return result;
  }
  return selectedDaySchedule(dayName);
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
  let { Adult, Senior, Child } = prices;
  Adult += (Adult * percentage) / 100;
  prices.Adult = Math.round(Adult * 100) / 100;
  Senior += (Senior * percentage) / 100;
  prices.Senior = Math.round(Senior * 100) / 100;
  Child += (Child * percentage) / 100;
  prices.Child = Math.round(Child * 100) / 100;
  return prices;
}

const checkResponsabilitys = (employee) => {
  let result = [];
  employee.responsibleFor.forEach((responsility) => {
    species.forEach((specie) => {
      if (specie.id === responsility) result.push(specie.name);
    });
  });
  return result;
};

const defaultEmployeeCoverage = () => {
  const result = {};
  employees.forEach((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    result[fullName] = checkResponsabilitys(employee);
  });
  return result;
};

const employeeCoverageByFirstName = (firstName) => {
  const result = {};
  const employeeByFirstName = employees.find((employee) => employee.firstName === firstName);
  if (employeeByFirstName !== undefined) {
    const fullName = `${employeeByFirstName.firstName} ${employeeByFirstName.lastName}`;
    result[fullName] = checkResponsabilitys(employeeByFirstName);
  }
  return result;
};

const employeeCoverageByLastName = (lastName) => {
  const result = {};
  const employeeByLastName = employees.find((employee) => employee.lastName === lastName);
  if (employeeByLastName !== undefined) {
    const fullName = `${employeeByLastName.firstName} ${employeeByLastName.lastName}`;
    result[fullName] = checkResponsabilitys(employeeByLastName);
  }
  return result;
};

const employeeCoverageByID = (id) => {
  const result = {};
  const employeeByID = employees.find((employee) => employee.id === id);
  if (employeeByID !== undefined) {
    const fullName = `${employeeByID.firstName} ${employeeByID.lastName}`;
    result[fullName] = checkResponsabilitys(employeeByID);
  }
  return result;
};

function getEmployeeCoverage(idOrName) {
  if (idOrName === undefined) return defaultEmployeeCoverage();
  let result = {};
  result = employeeCoverageByFirstName(idOrName);
  if (Object.entries(result).length === 0) result = employeeCoverageByLastName(idOrName);
  if (Object.entries(result).length === 0) result = employeeCoverageByID(idOrName);
  return result;
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
