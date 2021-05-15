const data = require('./data');

/** Requisito 1 */
function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.some((value) => value === specie.id));
}

/** Requisito 2 */
function getAnimalsOlderThan(animal, age) {
  return data.species.find((animalName) => animalName.name === animal).residents.every((val) => val.age >= age);
}

/** Requisito 3 */
function getEmployeeByName(employeeName) {
  return !employeeName ? {} : data.employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
}

/** Requisito 4 */
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

/** Requisito 5 */
function isManager(id) {
  return data.employees.some((person) => person.managers.includes(id));
}

/** Requisito 6 */
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

/** Requisito 7 */
function countAnimals(specie) {
  /** A função abaixo guarda na variável "result" um objeto
   * contendo todos as espécias de animais como chave, e
   * guardando todos os valores com a quantidade.
   */
  const result = data.species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});

  /** Condicional que verifica o parâmetro da função e retorna
   * apenas o necessário */
  return (!specie) ? result : result[specie];
}

/** Requisito 8 */
function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((sum, atual) => sum + (data.prices[atual] * entrants[atual]), 0);
}

/** Requisito 9 */
/** Para realização deste projeto, necessitei da ajuda de
 * Alberto Candido [Turma 11]. Fico imensamente agradecido
 * por me ajudar na resolução em um dos requisitos mais
 * complexos deste projeto! */
function sorted(result, regions) {
  regions.forEach((region) => {
    result[region].forEach((animal) => {
      let singleAnimal = Object.keys(animal)[0];
      animal[singleAnimal].sort();
    });
  });
}

function filterSex(result, regions, options) {
  regions.forEach((region) => {
    result[region] = [];
    result[region] = data.species
      .reduce((acc, { name, location, residents }) => (location === region ? acc
        .concat({ [name]: residents
          .filter(({ sex }) => options.sex === sex)
          .map((specie) => specie.name) }) : acc), []);
  });
}

function includeNames(result, options, regions) {
  regions.forEach((region) => {
    result[region] = [];
    result[region] = data.species
      .reduce((acc, { name, location, residents }) => (location === region ? acc
        .concat({ [name]: residents
          .map((specie) => specie.name) }) : acc), []);
  });

  if (options.sex) {
    filterSex(result, regions, options);
  }
  if (options.sorted) {
    sorted(result, regions);
  }
  return result;
}

function animalsByRegion() {
  const regions = data.species.map((region) => region.location);
  const result = regions.reduce((acc, curr, index) => {
    acc[regions[index]] = data.species.filter((animal) => animal.location === curr).map((animals) => animals.name);
    return acc;
  }, {});
  return result;
}
function getAnimalMap(options) {
  let result = animalsByRegion();
  const regions = Object.keys(result);

  if (!options || !options.includeNames) {
    return result;
  }

  return includeNames(result, options, regions);
}

/** Requisito 10 */
function getSchedule(dayName) {
  /** A const "hours" é um array que armazena os horário de
   * abertura e fechamento do zoológico.
   * Na let "weekDays" é array que armazena as strings de dias
   * da semana, caso nenhum parâmetro for passado. */
  const hours = Object.values(data.hours);
  let weekDays;
  if (!dayName) {
    weekDays = Object.keys(data.hours);
  } else {
    weekDays = [dayName];
  }

  /** Parte responsável por criar o objeto com os repectivos horários, passados ou
   * não por parâmetro. */
  const result = weekDays.reduce((acc, curr, index) => {
    acc[curr] = `Open from ${hours[index].open}am until ${hours[index].close - 12}pm`;
    return acc;
  }, {});

  /** Faz a mudança do horário de Monday para "CLOSED" */
  if (result.Monday) {
    result.Monday = 'CLOSED';
  }
  return result;
}

/** Requisito 11 */
function getOldestFromFirstSpecies(id) {
  /** Parte responsável por capturar o ID do primeiro animal,
   * na qual a pessoa funcionárioa abaixo é responsável. */
  const animalId = Object.entries(data.employees).find((person) => person[1].id === id)[1].responsibleFor[0];

  /** Retorna a maior idade do animal requisitado! */
  const oldAnimal = data.species.find((animal) => animal.id === animalId).residents.reduce((acc, curr) => Math.max(acc, curr.age), 0);

  /** Exibe informações do animal mais velho informado no parâmetro da função getOldestFromFirstSpecies. */
  const result = data.species.find((animal) => animalId === animal.id).residents.reduce((acc, curr) => {
    if (curr.age === oldAnimal) {
      acc.push(curr.name);
      acc.push(curr.sex);
      acc.push(curr.age);
    }
    return acc;
  }, []);

  return result;
}

/** Requisito 12 */
/** Para resolver este requisito, eu precisei consultar a
 * resolução de um pequeno problema acerca de arredondamento
 * de números, encontrada no Slack da Turma 11.
 * Source: https://trybecourse.slack.com/archives/C01PLFW7347/p1620685335422400 */
function increasePrices(percentage) {
  const adultPrice = parseFloat(data.prices.Adult + (data.prices.Adult * (percentage / 100)) + 0.001).toFixed(2);
  const seniorPrice = parseFloat(data.prices.Senior + (data.prices.Senior * (percentage / 100)) + 0.001).toFixed(2);
  const childPrice = parseFloat(data.prices.Child + (data.prices.Child * (percentage / 100)) + 0.001).toFixed(2);
  data.prices.Adult = Number(adultPrice);
  data.prices.Senior = Number(seniorPrice);
  data.prices.Child = Number(childPrice);
}

/** Requisito 13 */
function getEmployeeCoverage(idOrName) {
  /** Função responsável por retornar todos os funcionários e seus respectivos animais! */
  const result = data.employees.reduce((acc, curr) => {
    acc[`${curr.firstName} ${curr.lastName}`] = curr.responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
    return acc;
  }, {});

  /** Verifica se a função tem ou não um parâmetro! */
  if (!idOrName) {
    return result;
  }

  /** Retorna o objeto completo com o funcinário passado por parâmetro. */
  const functionary = data.employees.find((person) => (idOrName === person.firstName || idOrName === person.lastName || idOrName === person.id));

  /** Variável com o nome completo que é usada para comparação */
  const functionaryName = `${functionary.firstName} ${functionary.lastName}`;
  /** Variáveis abaixo são responsáveis por armazenar o nome dos funcionarios e seus respectivos animais e
   * estes resultados foram originados do result, criado lá em cima. */
  const animals = Object.values(result);
  const animalsCare = Object.keys(result);

  /** Retorna o objeto de acordo com o parâmetro passado */
  return animalsCare.reduce((acc, curr, index) => {
    if (functionaryName === curr) {
      acc[curr] = animals[index];
    }
    return acc;
  }, {});
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
