// Para tipos primitivos os valores são salvos em locais separados, não utiliza referencia;
let number1 = 0;
let number2 = number1;
number2 ++;

console.log(number2, number1); // 1, 0;


// Em estrutura de dados os valores são referenciados
let obj1 = {count: 0};
let obj2 = obj1;
obj2.count ++;

console.log(obj1.count, obj2.count); // 1, 1;

let arr1 = [1, 2];
let arr2 = arr1;
arr2.push(3);

console.log(arr1, arr2); // [1, 2, 3], [1, 2, 3];

// Para resolver isso é utilizado outra forma
let obj1_1 = {count: 0};
let obj2_1 = {...obj1_1};
obj2_1.count ++;

console.log(obj1_1.count, obj2_1.count); // 0, 1;

let arr1_1 = [1, 2];
let arr2_1 = [...arr1_1];
arr2_1.push(3);

console.log(arr1_1, arr2_1); // [1, 2], [1, 2, 3];