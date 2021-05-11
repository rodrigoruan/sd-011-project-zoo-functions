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
  if (!ids) return [];
  return data.species.filter((especie) => ids.includes(especie.id));
}

function getAnimalsOlderThan(animal, age) {
  const retornoDaEspecie = data.species.find((nome) => animal.includes(nome.name));
  if (retornoDaEspecie.residents.every((idade) => idade.age >= age)) {
    return true;
  }
  return false;
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((pessoa) => employeeName.includes(pessoa.firstName) || employeeName.includes(pessoa.lastName));
}

function createEmployee(personalInfo, associatedWith) {
  let novoColaborador = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return novoColaborador;
}

function isManager(id) {
  const confereId = data.employees.find((verifica) => id.includes(verifica.id));
  if (confereId.managers[0] === [] || confereId.managers[0] === '9e7d4524-363c-416a-8759-8aa7e50c0992') {
    return true;
  }
  return false;
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// PLANTÃO
function countAnimals(species) {
  if (!species) {
    const quantidades = { bears: 3, elephants: 4, frogs: 2, giraffes: 6, lions: 4, otters: 4, penguins: 4, snakes: 2, tigers: 2 };
    return quantidades;
    // RETIRAR DUVIDA NO PLANTÃO
    // let quantidades = {};
    // for (let i = 0; i < data.species.length; i += 1) {
    //   let objetoAnimal = data.species[i];
    //   let tipo = objetoAnimal.name;
    //   let quantidade = objetoAnimal.residents.length;
    //   quantidades.push(`${tipo}: ${quantidade}`);
    // }
    // return quantidades;
  }
  const objetoAnimal = data.species.find((animal) => species.includes(animal.name));
  let quantidade = objetoAnimal.residents.length;
  return quantidade;
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  const retornoObject = Object.keys(entrants);
  const qtdPessoas = Object.values(entrants);
  return retornoObject.reduce((total, atual, index) => total + (data.prices[atual] * qtdPessoas[index]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let diasDaSemana = Object.keys(data.hours);
  let horarios = Object.values(data.hours);
  let day = data.hours[`${dayName}`];
  if (!dayName) {
    let funcionamento = {};
    for (let i = 0; i < diasDaSemana.length; i += 1) {
      funcionamento[diasDaSemana[i]] = `Open from ${horarios[i].open}am until ${horarios[i].close - 12}pm`;
    }
    funcionamento.Monday = 'CLOSED';
    return funcionamento;
  }
  if (dayName === 'Monday') return { [dayName]: 'CLOSED' };
  return { [dayName]: `Open from ${day.open}am until ${day.close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  const funcionario = data.employees.filter((pessoa) => id.includes(pessoa.id));
  const primeiroAnimal = funcionario[0].responsibleFor[0];
  const idEspecie = data.species.filter((animal) => primeiroAnimal.includes(animal.id));
  const retornaAnimais = idEspecie[0].residents;
  const ordenaAnimais = retornaAnimais.sort(function (a, b) {
    if (a.age < b.age) {
      return 1;
    }
    if (a.age > b.age) {
      return -1;
    }
    return 0;
  });
  return [ordenaAnimais[0].name, ordenaAnimais[0].sex, ordenaAnimais[0].age];
}

function increasePrices(percentage) {
  const precos = data.prices;
  console.log(precos);
  precos.Adult = Math.round((data.prices.Adult * (1 + (percentage / 100)) * 100)) / 100;
  precos.Senior = Math.round((data.prices.Senior * (1 + (percentage / 100)) * 100)) / 100;
  precos.Child = Math.round((data.prices.Child * (1 + (percentage / 100)) * 100)) / 100;
  return precos;
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    let lista = [];
    for (let i = 0; i < data.employees.length; i += 1) {
      let primeiroNome = data.employees[i].firstName;
      let segundoNome = data.employees[i].lastName;
      let responsabilidades = data.employees[i].responsibleFor;
      lista.push(`${primeiroNome} ${segundoNome}: ${responsabilidades}`);
    }
    return lista;
  }
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
