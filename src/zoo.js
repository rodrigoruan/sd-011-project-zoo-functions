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
  // const filteredSpecies = [];

  // for (let index = 0; index < data.species.length; index += 1) {
  //   const item = data.species[index];

  //   if (ids.includes(item.id)) {
  //     filteredSpecies.push(item);
  //   }
  // }

  // return filteredSpecies;
  return data.species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  // let specie;

  // for (let index = 0; index < data.species.length; index += 1) {
  //   const item = data.species[index];

  //   if (item.name === animal) {
  //     specie = item;
  //   }
  // }

  // for (let i = 0; i < specie.residents.length; i++) {
  //   const item = specie.residents[i];

  //   if (item.age < age) {
  //     return false;
  //   }
  // }

  // return true;
  const specie = data.species.find((item) => item.name === animal);
  return specie.residents.every((item) => item.age >= age);
}

// ____________________________

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  // for (let index = 0; index < data.employees.length; index += 1) {
  //   const item = data.employees[index];

  //   if (employeeName === item.firstName || employeeName === item.lastName) {
  //     return item;
  //   }
  // }

  return data.employees.find((item) => employeeName === item.firstName || employeeName === item.lastName);
}
// ____________________________

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  /* OPÇÃO 1 */
  // let managers = [];

  // for (let index = 0; index < data.employees.length; index += 1) {
  //   let item = data.employees[index];

  //   for (let i = 0; i < item.managers.length; i += 1) {
  //     managers.push(item.managers[i]);
  //   }
  // }

  // return managers.includes(id);

  /* OPÇÃO 2 */
  // for (let index = 0; index < data.employees.length; index += 1) {
  //   let item = data.employees[index];

  //   if (item.managers.includes(id)) {
  //     return true;
  //   }
  // }

  // return false;

  /* OPÇÃO 3 */
  return data.employees.some((item) => item.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(specieName) {
  if (specieName) {
    const specie = data.species.find((item) => item.name === specieName);
    return specie.residents.length;
  }

  // let acc = {};

  // for (let i = 0; i < data.species.length; i += 1) {
  //   const item = data.species[i];
  //   acc[item.name] = item.residents.length;
  // }

  // return acc;

  return data.species.reduce((acc, item) => ({
    ...acc,
    [item.name]: item.residents.length,
  }), {});
}

function calculateEntry(entrants) {
  if (!entrants) {
    return 0;
  }

  // let acc = 0;

  // for (let key in entrants) {
  //   const price = data.prices[key];
  //   const qty = entrants[key];
  //   acc += (price * qty);
  // }

  // return acc;
  return Object.keys(entrants).reduce((
    acc,
    key,
  ) => {
    const price = data.prices[key];
    const qty = entrants[key];
    return acc + (price * qty);
  }, 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  let employee = data.employees.find((item) => item.id === id);

  // for (let i = 0; i < data.employees.length; i += 1) {
  //   const item = data.employees[i];

  //   if (item.id === id) {
  //     employee = item;
  //   }
  // }

  let specieId = employee.responsibleFor[0];

  let specie = data.species.find((item) => item.id === specieId);
  // for (let i = 0; i < data.species.length; i += 1) {
  //   const item = data.species[i];

  //   if (item.id === specieId) {
  //     specie = item;
  //   }
  // }

  let animalMaisVelho = specie.residents.reduce((acc, item) => {
    if (typeof acc === 'undefined' || item.age > acc.age) {
      return item;
    }

    return acc;
  }, undefined);

  return [animalMaisVelho.name, animalMaisVelho.sex, animalMaisVelho.age];
}

// let animalMaisVelho = specie.residents[0];
// for (let i = 1; i < specie.residents.length; i += 1) {
//   const item = specie.residents[i];

//   if (item.age > animalMaisVelho.age) {
//     animalMaisVelho = item;
//   }
// }

function increasePrices(percentage) {
  let keys = Object.keys(data.prices);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    data.prices[key] += data.prices[key] * (percentage / 100);
    data.prices[key] = Math.round(data.prices[key] * 100) / 100;
  }
}

function getEmployeeCoverage(idOrName) {
  function getSpeciesById(speciesId) {
    return data.species.find((item) => item.id === speciesId);
  }

  let employeeCoverage = data.employees.reduce((acc, employee) => {
    if (!idOrName || employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName) {
      const key = `${employee.firstName} ${employee.lastName}`;

      const value = employee.responsibleFor.map((id) => {
        const specie = getSpeciesById(id);
        return specie.name;
      });

      return {
        ...acc,
        [key]: value };
    }

    return acc;
  }, {});

  return employeeCoverage;
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
