const scanf = require("prompt-sync")();

function CreaTarea(
  titulo = "Sin título",
  descripcion = "Sin descripcion",
  estado = "P",
  vencimiento = "Ninguna",
  dificultad = "⭐"
) {
  return {
    titulo: titulo, //Título de la tarea
    descripcion: descripcion, //descripcion de la tarea
    estado: estado, //Estado de la tarea (P = pendiente, EC = En curso, etc.)
    fechaDeCreacion: new Date().toLocaleDateString("es-ES"), // Fecha de creación de la tarea
    ultimoCambio: new Date().toLocaleDateString("es-ES"), // Fecha de la última modificación
    vencimiento: vencimiento, // Fecha de vencimiento
    dificultad: dificultad, // Dificultad (F = Fácil, M = Medio, D = Difícil)
  };
}

function menuPrincipal() {
  limpiarPantalla();
  console.log("¡Hola Olivia!\t\n¿Qué deseas hacer?");
  console.log(
    "[1] Ver mis tareas.\n[2] Buscar una tarea.\n[3] Agregar una tarea.\n[0] Salir."
  );
  let opcion = parseInt(scanf("Ingrese una opción: "));
  while (opcion < 0 || opcion > 3) {
    opcion = parseInt(
      scanf("La opción ingresada no es válida.\nIngrese otra: ")
    );
  }
  return opcion;
}

function limpiarPantalla() {
  process.stdout.write("\x1Bc");
}

function menuVerTareas() {
  limpiarPantalla();
  console.log(
    "¿Qué tareas deseas ver?\n[1] Todas\n[2] Pendientes\n[3] Curso\n[4] Terminadas\n[0] Volver"
  );
  let opcion = parseInt(scanf("Ingrese una opción: "));
  while (opcion < 0 || opcion > 4) {
    opcion = parseInt(
      scanf("La opción ingresada no es válida.\nIngrese otra: ")
    );
  }
  return opcion;
}

function menuAgregarTarea() {
  console.log("Ingresó a crear una tarea\n");
  console.log("Para ingresar los datos, seleccione una opción: ");
  console.log(`[1] Ingresar título`);
  console.log(`[2] Ingresar descripcion`);
  console.log(`[3] Ingresar estado`);
  console.log(`[4] Ingresar dificultad`);
  console.log(`[5] Ingresar vencimiento`);
  console.log("Presione 0 para guardar los datos ingresados\n");
  let opcion = parseInt(scanf("Ingresa una opcion: "));
  while (opcion < 0 || opcion > 5) {
    opcion = parseInt(
      scanf("La opción ingresada no es válida.\nIngrese otra: ")
    );
  }
  return opcion;
}
function ingresarTitulo() {
  let titulo = scanf("1- Ingrese el título (es obligatorio): ");
  while (titulo === "") {
    titulo = scanf("El título no puede ser nulo, ingrese uno: ");
  }
  return titulo;
}

function ingresarDescripcion() {
  let descripcion = scanf("2- Ingrese una descripcion: ");
  return descripcion || "Sin Descripcion";
}

function ingresarEstado() {
  let estado = scanf(
    "3- Ingrese el estado que por defecto esta pendiente: [P]pendiente/ [EC]en curso/ [T]terminada/ [C] cancelada:"
  );
  estado = estado.toUpperCase();
  while (estado != "P" && estado != "EC" && estado != "T" && estado != "C") {
    console.log("Ingresó un estado no válido.Ingrese otro: ");
    estado = scanf();
    estado = estado.toUpperCase();
  }
  return estado;
}
function ingresarDificultad() {
  let dificultad = scanf(
    "4- Ingrese la dificultad, por defecto fácil: [F]fácil(⭐)/[M]medio(⭐⭐)/[D]difícil(⭐⭐⭐): "
  );
  dificultad = dificultad.toUpperCase();
  while (dificultad != "F" && dificultad != "M" && dificultad != "D") {
    dificultad = scanf(
      "La dificultad ingresada es inválida, ingrese nuevamente: "
    );
    dificultad = dificultad.toUpperCase();
  }
  if (dificultad === "F") {
    dificultad = "⭐";
  } else if (dificultad === "M") {
    dificultad = "⭐⭐";
  } else if (dificultad === "D") {
    dificultad = "⭐⭐⭐";
  }
  return dificultad;
}
function ingresarFechadeVencimiento() {
  let fechaVencimiento = PedirFechadeVencimiento();
  while (fechaVencimiento <= FechaActual) {
    console.log("Fecha no válida. Ingrese nuevamente: ");
    fechaVencimiento = PedirFechadeVencimiento();
  }
  return fechaVencimiento;
}
function AnnoBisiesto(anno) {
  return anno % 4 === 0 && anno % 100 !== 0; //un año es
  //bisiesto si es divisible entre 4 pero no entre 100
}
function PedirFechadeVencimiento() {
  let anno,
    mes,
    dia,
    band = -1,
    hora,
    fechaVencimiento;

  anno = scanf("Ingrese el año de vencimiento: ");
  anno = parseInt(anno);

  while (isNaN(anno) || anno < 1000 || anno > 9999) {
    anno = scanf(
      "El año de vencimiento ingresado no es válido. Ingrese otro: "
    );
    anno = parseInt(anno);
  }

  mes = scanf("Ingrese el mes de vencimiento entre el 1 y 12: ");
  mes = parseInt(mes);
  while (isNaN(mes) || mes < 1 || mes > 12) {
    mes = scanf(
      "Mes de vencimiento no válido, reingrese uno correcto del 1 al 12: "
    );
    mes = parseInt(mes);
  }

  do {
    if (band >= 0) {
      console.log("Ingresó un día no válido.");
    }
    switch (mes) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        dia = scanf("Ingrese el día de vencimiento entre el 1 y 31: ");
        dia = parseInt(dia);
        if (dia < 1 || dia > 31) dia = NaN;
        break;
      case 2:
        if (AnnoBisiesto(anno)) {
          dia = scanf("Ingrese el día de vencimiento del 1 al 29: ");
          dia = parseInt(dia);
          if (dia < 1 || dia > 29) dia = NaN;
        } else {
          dia = scanf("Ingrese el día de vencimiento del 1 al 28: ");
          dia = parseInt(dia);
          if (dia < 1 || dia > 28) dia = NaN;
        }
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        dia = scanf("Ingrese el día de vencimiento entre el 1 y 30: ");
        dia = parseInt(dia);
        if (dia < 1 || dia > 30) dia = NaN;
        break;
    }
    band++;
  } while (isNaN(dia));

  hora = scanf("Ingrese la hora de vencimiento entre las 0 y las 23: ");
  hora = parseInt(hora);
  while (isNaN(hora) || hora < 0 || hora > 23) {
    hora = scanf(
      "Hora de vencimiento no válida, ingrese una correcta entre 0 y 23: "
    );
    hora = parseInt(hora);
  }

  fechaVencimiento = new Date(anno, mes - 1, dia, hora);
  return fechaVencimiento.toLocaleDateString("es-ES");
}
function ordenarTareas() {
  let tareaTemp = CreaTarea();
  for (let i = 0; i < ListadeTareas.length; i++) {
    for (let j = 0; j < ListadeTareas.length - 1; j++) {
      if (ListadeTareas[j].titulo > ListadeTareas[j + 1].titulo) {
        tareaTemp = ListadeTareas[j];
        ListadeTareas[j] = ListadeTareas[j + 1];
        ListadeTareas[j + 1] = tareaTemp;
      }
    }
  }
}
function mostrarTodasTareas() {
  if (ListadeTareas.length === 0) {
    console.log("No hay tareas para mostrar.");
    Esperarscanf();
    menuPrincipal(); // Llama a la función para volver al menú principal
    return; // Salir de la función
  }
  console.log("Estas son todas tus tareas:");
  for (let i = 0; i < ListadeTareas.length; i++) {
    console.log(`[${i + 1}]: ${ListadeTareas[i].titulo}`);
  }
  verdetallesTodas(); // Llama a la función para ver detalles de todas las tareas
}

function verdetallesTodas() {
  console.log("¿Deseas ver los detalles de alguna?");
  console.log("Introduce el número para verla o 0 para volver");
  let ver = parseInt(scanf());
  while (true) {
    if (ver === 0) {
      console.log("Volviendo al Menú anterior...");
      menuPrincipal();
    } else if (ver > 0 && ver <= ListadeTareas.length) {
      console.log(`Título: ${ListadeTareas[ver - 1].titulo}`);
      console.log(`descripcion: ${ListadeTareas[ver - 1].descripcion}`);
      console.log(`Estado: ${ListadeTareas[ver - 1].estado}`);
      console.log(
        `Fecha de Creación: ${ListadeTareas[ver - 1].fechaDeCreacion}`
      );
      console.log(`Vencimiento: ${ListadeTareas[ver - 1].vencimiento}`);
      console.log(`Dificultad: ${ListadeTareas[ver - 1].dificultad}`);
      console.log("------------------------");
      editarTarea(ver);
      return;
    } else {
      limpiarPantalla();
      console.log("El número de tarea que indicó es incorrecto");
      for (let i = 0; i < ListadeTareas.length; i++) {
        console.log(`[${i + 1}]: ${ListadeTareas[i].titulo}`);
      }
      console.log("Introduce el número para verla o 0 para volver");
      ver = parseInt(scanf());
    }
  }
}

function verdetalles(estado) {
  console.log("¿Deseas ver los detalles de alguna?");
  console.log("Introduce el número para verla o 0 para volver");
  let ver = parseInt(scanf());
  while (true) {
    if (ver === 0) {
      console.log("Volviendo al Menú anterior...");
      menuPrincipal();
      return; // Salir de la función para volver al menú
    } else if (
      ver > 0 &&
      ver <= ListadeTareas.length &&
      ListadeTareas[ver - 1].estado === estado
    ) {
      console.log(`Título: ${ListadeTareas[ver - 1].titulo}`);
      console.log(`Descripción: ${ListadeTareas[ver - 1].descripcion}`);
      console.log(`Estado: ${ListadeTareas[ver - 1].estado}`);
      console.log(
        `Fecha de Creación: ${ListadeTareas[ver - 1].fechaDeCreacion}`
      );
      console.log(`Vencimiento: ${ListadeTareas[ver - 1].vencimiento}`);
      console.log(`Dificultad: ${ListadeTareas[ver - 1].dificultad}`);
      console.log("------------------------");
      editarTarea(ver);
      return; // Salir de la función después de editar la tarea
    } else {
      limpiarPantalla();
      console.log("El número de tarea que indicó es incorrecto");
      for (let i = 0; i < ListadeTareas.length; i++) {
        if (ListadeTareas[i].estado === estado) {
          console.log(`[${i + 1}]: ${ListadeTareas[i].titulo}`);
        }
      }
      console.log("Introduce el número para verla o 0 para volver");
      ver = parseInt(scanf());
    }
  }
}

function editarTarea(ver) {
  console.log("Si deseas editarla presiona E, o presiona 0 para volver.");
  let editar = scanf().toUpperCase();

  if (editar === "E") {
    let opcionEditar;
    do {
      console.log("¿Qué atributo deseas editar?");
      console.log(
        "[1] Título\n[2] Descripción\n[3] Estado\n[4] Dificultad\n[5] Fecha de vencimiento\n[0] Volver"
      );
      opcionEditar = parseInt(scanf("Ingresa una opción: "));

      while (isNaN(opcionEditar) || opcionEditar < 0 || opcionEditar > 5) {
        opcionEditar = parseInt(
          scanf("Opción inválida. Ingresa una opción válida: ")
        );
      }

      switch (opcionEditar) {
        case 1:
          ListadeTareas[ver - 1].titulo = ingresarTitulo();
          console.log("El titulo se cambio con exito");
          Esperarscanf();
          limpiarPantalla();
          break;
        case 2:
          ListadeTareas[ver - 1].descripcion = ingresarDescripcion();
          console.log("La descripcion se cambio con exito");
          Esperarscanf();
          limpiarPantalla();
          break;
        case 3:
          ListadeTareas[ver - 1].estado = ingresarEstado();
          console.log("El estado se cambio con exito");
          Esperarscanf();
          limpiarPantalla();
          break;
        case 4:
          ListadeTareas[ver - 1].dificultad = ingresarDificultad();
          console.log("La dificultad se cambio con exito");
          Esperarscanf();
          limpiarPantalla();
          break;
        case 5:
          ListadeTareas[ver - 1].vencimiento = ingresarFechadeVencimiento();
          console.log("La fecha de vencimiento se cambio con exito");
          Esperarscanf();
          limpiarPantalla();
          break;
        case 0:
          console.log("Saliendo del editor...");
          break;
        default:
          console.log("Opción no válida.");
          break;
      }
    } while (opcionEditar !== 0);
  }
}

function verTareasPorEstado(estado) {
  let contador = 0;
  for (let i = 0; i < ListadeTareas.length; i++) {
    if (ListadeTareas[i].estado === estado) {
      contador++;
      console.log(`[${i + 1}]: ${ListadeTareas[i].titulo}`);
    }
  }
  if (contador > 0) {
    verdetalles(estado);
  } else {
    console.log("No hay tareas para mostrar.");
    Esperarscanf();
    menuPrincipal(); // Llama a la función para volver al menú principal
  }
  return contador;
}

function opcion1() {
  limpiarPantalla();
  let opcion = menuVerTareas();
  switch (opcion) {
    case 1:
      limpiarPantalla();
      mostrarTodasTareas();
      break;
    case 2:
      limpiarPantalla();
      console.log("Estas son tus tareas pendientes:");
      verTareasPorEstado("P");
      break;
    case 3:
      limpiarPantalla();
      console.log("Estas son tus tareas en proceso:");
      verTareasPorEstado("EC");
      break;
    case 4:
      limpiarPantalla();
      console.log("Estas son tus tareas terminadas:");
      verTareasPorEstado("T");
      break;

    default:
      console.log("Opción no válida.");
  }
}
function opcion3() {
  let menuAgregar = -1;
  let tareaNueva = CreaTarea();
  do {
    limpiarPantalla();
    menuAgregar = menuAgregarTarea(
      tareaNueva.titulo,
      tareaNueva.descripcion,
      tareaNueva.estado,
      tareaNueva.dificultad,
      tareaNueva.vencimiento
    );
    limpiarPantalla();
    switch (menuAgregar) {
      case 1:
        tareaNueva.titulo = ingresarTitulo();
        break;
      case 2:
        tareaNueva.descripcion = ingresarDescripcion();
        break;
      case 3:
        tareaNueva.estado = ingresarEstado();
        break;
      case 4:
        tareaNueva.dificultad = ingresarDificultad();
        break;
      case 5:
        tareaNueva.vencimiento = ingresarFechadeVencimiento();
        break;
      case 0:
        if (tareaNueva.titulo === "Sin título") {
          menuAgregar = -1;
          console.log("No se puede agregar la tarea sin título.");
          Esperarscanf();
        } else {
          ListadeTareas.push(tareaNueva);
          ordenarTareas();
          console.log(`¡Tarea creada con éxito!`);
          Esperarscanf();
        }
        break;
      default:
        console.log("Opción inválida.");
        Esperarscanf();
        break;
    }
  } while (menuAgregar != "0");
}

function Esperarscanf() {
  scanf("Presione una tecla para seguir...");
}

function opcion2() {
  console.log("Introduzca una palabra o frase para buscar tareas: ");
  let cadenaBusqueda = scanf();

  if (cadenaBusqueda.trim() === "") {
    console.log("La búsqueda no puede estar vacía. Inténtelo nuevamente.");
    return;
  }

  buscarTarea(cadenaBusqueda);
}

function buscarTarea(cadena) {
  let resultados = ListadeTareas.filter((tarea) =>
    tarea.titulo.toLowerCase().includes(cadena.toLowerCase())
  );

  if (resultados.length === 0) {
    console.log("No hay tareas relacionadas con la búsqueda.");
    Esperarscanf();
  } else {
    mostrarCoincidencias(resultados);
  }
}

function mostrarCoincidencias(resultados) {
  limpiarPantalla();
  console.log("Tareas encontradas:");
  resultados.forEach((tarea, index) => {
    console.log(`[${index + 1}] ${tarea.titulo}`);
  });

  gestionarResultados(resultados);
}

function gestionarResultados(resultados) {
  console.log("\n¿Qué deseas hacer?");
  console.log("[1] Ver detalles de la tarea");
  console.log("[0] Volver al menú principal");

  let opcion = parseInt(scanf());
  switch (opcion) {
    case 1:
      console.log("Ingrese el número de la tarea para ver los detalles: ");
      let indice = parseInt(scanf()) - 1;

      if (indice >= 0 && indice < resultados.length) {
        mostrarDetallesTarea(resultados[indice]);
      } else {
        console.log("Número inválido. Inténtelo nuevamente.");
        gestionarResultados(resultados);
      }
      break;
    case 0:
      console.log("Volviendo al menú principal...");
      break;
    default:
      console.log("Opción no válida.");
      gestionarResultados(resultados);
  }
}

function mostrarDetallesTarea(tarea) {
  limpiarPantalla();
  console.log("\nDetalles de la tarea seleccionada:");
  console.log(`Título: ${tarea.titulo}`);
  console.log(`Descripcion: ${tarea.descripcion}`);
  console.log(`Estado: ${tarea.estado}`);
  console.log(`Fecha de Creación: ${tarea.fechaDeCreacion}`);
  console.log(`Vencimiento: ${tarea.vencimiento}`);
  console.log(`Dificultad: ${tarea.dificultad}`);
  console.log("------------------------");
  Esperarscanf();
}

//----------------------------------------------------------------------------------------------------------------------------------

let ListadeTareas = [];

let FechaActual = new Date();
let opcionMenu;

do {
  opcionMenu = menuPrincipal();
  switch (opcionMenu) {
    case 1:
      opcion1();
      break;
    case 2:
      opcion2();
      break;
    case 3:
      opcion3();
      break;
    case 0:
      console.log("Saliendo del programa.");
      return 0;
    default:
      console.log("Opción no válida.");
  }
} while (opcionMenu !== 0);
