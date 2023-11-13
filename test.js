"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var taskList = [];
function createTask(title, description, difficulty, expireDate) {
    if (description === void 0) { description = ''; }
    var task = {
        title: title,
        description: description,
        status: "pendiente",
        creationDate: new Date().toString(),
        expireDate: expireDate,
        difficulty: difficulty,
    };
    taskList.push(task);
}
function changeStatus(title, newStatus) {
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].title === title) {
            taskList[i].status = newStatus;
        }
    }
}
function showTask(task) {
    console.log("Titulo:", task.title);
    console.log("Estado:", task.status);
    console.log("Descripción:", task.description);
    console.log("Fecha de creación:", task.creationDate);
    console.log("Fecha de vencimiento:", task.expireDate);
    console.log("Dificultad:", task.difficulty);
    var response = readlineSync.question("\nPresione 'E' para editar la tarea, '0' para volver: ");
    if (response.toLowerCase() === 'e') {
        editTask(task);
    }
    else if (response === '0') {
        mainMenu();
    }
    else {
        console.log("Opción no válida. Volviendo al Menú Principal.");
        mainMenu();
    }
}
function editTask(task) {
    var newTitle = readlineSync.question("Nuevo título (Enter para mantener el actual): ") || task.title;
    var newDescription = readlineSync.question("Nueva descripción (Enter para mantener la actual): ") || task.description;
    var newDifficulty = readlineSync.question("Nueva dificultad (Enter para mantener la actual): ") || task.difficulty || '';
    var newExpireDate = readlineSync.question("Nueva fecha de vencimiento (formato dd/mm/yyyy, Enter para mantener la actual): ") || task.expireDate || '';
    task.title = newTitle;
    task.description = newDescription;
    task.difficulty = newDifficulty;
    task.expireDate = newExpireDate;
    console.log("Tarea editada con éxito.");
    readlineSync.question("Presiona Enter para volver al Menú Principal.");
    mainMenu();
}
function displayMainMenu() {
    console.log("Menú principal");
    console.log("1. Ver mis tareas\n2. Buscar una tarea\n3. Crear tarea\n0. Salir");
}
function displaySubMenu() {
    console.log("Qué tareas deseas ver?");
    console.log("1. Todas\n2. Pendientes\n3. En curso\n4. Terminadas\n5. Volver\n");
}
function mainMenu() {
    readlineSync.question("Presiona Enter para mostrar el Menú Principal.");
    displayMainMenu();
    var mainMenuChoice = readlineSync.question("?");
    switch (mainMenuChoice) {
        case '1':
            displaySubMenu();
            var subMenuChoice = readlineSync.question("?");
            switch (subMenuChoice) {
                case '1': // Todas
                    console.log("Mostrando todas las tareas...\n");
                    for (var i = 0; i < taskList.length; i++) {
                        showTask(taskList[i]);
                    }
                    break;
                case '2': // Pendientes
                    console.log("Mostrando todas las tareas pendientes...\n");
                    for (var i = 0; i < taskList.length; i++) {
                        if (taskList[i].status.toLowerCase() === "pendiente") {
                            showTask(taskList[i]);
                        }
                    }
                    break;
                case '3': // En curso
                    console.log("Mostrando todas las tareas en curso...\n");
                    for (var i = 0; i < taskList.length; i++) {
                        if (taskList[i].status.toLowerCase() === "en curso") {
                            showTask(taskList[i]);
                        }
                    }
                    break;
                case '4': // Terminadas
                    console.log("Mostrando todas las tareas terminadas...\n");
                    for (var i = 0; i < taskList.length; i++) {
                        if (taskList[i].status.toLowerCase() === "terminadas") {
                            showTask(taskList[i]);
                        }
                    }
                    break;
                default:
                    console.log("Respuesta inválida. Vuelva a intentarlo.\n");
                    break;
            }
            readlineSync.question("Presiona Enter para volver al Menú Principal.");
            displayMainMenu();
            break;
        case '2':
            var taskTitle = readlineSync.question("Ingrese el título de la tarea a buscar: ");
            for (var i = 0; i < taskList.length; i++) {
                if (taskList[i].title === taskTitle) {
                    showTask(taskList[i]);
                    break;
                }
            }
            readlineSync.question("Presiona Enter para volver al Menú Principal.");
            mainMenu();
            break;
        case '3':
            var title = readlineSync.question("Ingrese el título de la tarea: ");
            var description = readlineSync.question("Ingrese la descripción de la tarea: ");
            var difficulty = readlineSync.question("Ingrese la dificultad de la tarea: ");
            var expireDate = readlineSync.question("Ingrese la fecha de vencimiento (formato dd/mm/yyyy): ");
            createTask(title, description, difficulty, expireDate);
            console.log("Tarea creada con éxito.");
            readlineSync.question("Presiona Enter para volver al Menú Principal.");
            mainMenu();
            break;
        case '0':
            console.log("Fin del programa \n");
            break;
        default:
            console.log("Opción no válida. Intente de nuevo.");
            mainMenu();
            break;
    }
}
mainMenu();
