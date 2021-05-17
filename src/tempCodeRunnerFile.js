const semIncludes = () => {
let ObjLocation = {};
data.species.forEach((animal) => {
  if (!ObjLocation[animal.location]) {
    ObjLocation[animal.location] = [];
  }
    ObjLocation[animal.location].push(animal.name);
})
return ObjLocation;
};
console.log(semIncludes())