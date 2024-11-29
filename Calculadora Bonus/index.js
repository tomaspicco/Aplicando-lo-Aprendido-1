const prompt = require("prompt-sync")();

let opcion;
let operandos;

do {
menu();

opcion = prompt("Ingrese una opción: ");
opcion = parseInt(opcion);

while (opcion > 5 || opcion < 1) {
    console.log("La opción ingresada no es válida.");
    opcion = prompt("Ingrese otro valor: ");
    opcion = parseInt(opcion);
}

if (opcion <= 4 && opcion >= 1) {
    operandos = pedirOperandos();
    if (opcion === 4) {
    while (operandos.includes(0)) {
        console.log("No es posible dividir por 0.");
        operandos = pedirOperandos();
    }
    }
}

switch (opcion) {
    case 1:
    {
        suma(operandos);
    }
    break;

    case 2:
    {
        resta(operandos);
    }
    break;

    case 3:
    {
        multiplicacion(operandos);
    }
    break;

    case 4:
    {
        division(operandos);
    }
    break;
}
} while (opcion != 5);

function menu() {
    console.log("1. Suma");
    console.log("2. Resta");
    console.log("3. Multiplicación");
    console.log("4. División");
    console.log("5. Salir");
}

function pedirOperandos() {
    let input = prompt("Ingrese los números separados por al menos un espacio: ");
    let operandos = input.split(" ").map(Number);
    return operandos;
}

function suma(operandos) {
    let resultado = operandos.reduce((acc, val) => acc + val, 0);
    console.log("La suma es: ",resultado);
}

function resta(operandos) {
    let resultado = operandos.reduce((acc, val) => acc - val);
    console.log("La diferencia es: ",resultado);
}

function multiplicacion(operandos) {
    let resultado = operandos.reduce((acc, val) => acc * val, 1);
    console.log("El producto es: ",resultado);
}

function division(operandos) {
    let resultado = operandos.reduce((acc, val) => acc / val);
    console.log("El cociente es: ",resultado);
}
