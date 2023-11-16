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
        lastEditDate: new Date().toString(),
        expireDate: expireDate,
        difficulty: difficulty,
    };
    taskList.push(task);
}
function showTask(task) {
    console.log("Titulo:", task.title);
    console.log("Estado:", task.status);
    console.log("Descripción:", task.description);
    console.log("Fecha de creación:", task.creationDate);
    console.log("Fecha de vencimiento:", task.expireDate);
    console.log("Dificultad:", getDifficultyStars(task.difficulty));
    console.log("Última edición:", task.lastEditDate);
}
function showTaskAndEdit(task) {
    console.log("Titulo:", task.title);
    console.log("Estado:", task.status);
    console.log("Descripción:", task.description);
    console.log("Fecha de creación:", task.creationDate);
    console.log("Fecha de vencimiento:", task.expireDate);
    console.log("Dificultad:", getDifficultyStars(task.difficulty));
    console.log("Última edición:", task.lastEditDate);
    var response = readlineSync.question("\nPresione 'E' para editar la tarea, '0' para volver: \n");
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
function getDifficultyStars(difficulty) {
    switch (difficulty.toLowerCase()) {
        case 'baja':
            return '★☆☆';
        case 'media':
            return '★★☆';
        case 'alta':
            return '★★★';
        default:
            return difficulty;
    }
}
function editTask(task) {
    var newTitle = readlineSync.question("Nuevo título (Enter para mantener el actual): ") || task.title;
    var newDescription = readlineSync.question("Nueva descripción (Enter para mantener la actual): ") || task.description;
    var newStatus = readlineSync.question("Nuevo estado (en curso/pendiente/terminada) (Enter para mantener el actual): ") || task.status;
    var newDifficulty = readlineSync.question("Nueva dificultad (Enter para mantener la actual): ") || task.difficulty;
    var newExpireDate = readlineSync.question("Nueva fecha de vencimiento (formato dd/mm/yyyy, Enter para mantener la actual): ") || task.expireDate;
    task.title = newTitle;
    task.description = newDescription;
    task.status = newStatus;
    task.difficulty = newDifficulty;
    task.expireDate = newExpireDate;
    task.lastEditDate = new Date().toString();
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
    var mainMenuOption = readlineSync.question("?");
    switch (mainMenuOption) {
        case '1':
            displaySubMenu();
            var subMenuOption = readlineSync.question("?");
            switch (subMenuOption) {
                case '1': // Todas
                    console.log("Mostrando todas las tareas...\n");
                    taskList.sort(function (a, b) { return a.title.localeCompare(b.title); });
                    for (var _i = 0, taskList_1 = taskList; _i < taskList_1.length; _i++) {
                        var task = taskList_1[_i];
                        showTask(task);
                    }
                    readlineSync.question("Presiona Enter para volver al Menú Principal.");
                    break;
                case '3': // En curso
                    console.log("Mostrando todas las tareas en curso...\n");
                    for (var _a = 0, taskList_2 = taskList; _a < taskList_2.length; _a++) {
                        var task = taskList_2[_a];
                        if (task.status.toLowerCase() === "en curso") {
                            showTask(task);
                        }
                    }
                    break;
                case '4': // Terminadas
                    console.log("Mostrando todas las tareas terminadas...\n");
                    for (var _b = 0, taskList_3 = taskList; _b < taskList_3.length; _b++) {
                        var task = taskList_3[_b];
                        if (task.status.toLowerCase() === "terminada") {
                            showTask(task);
                        }
                    }
                    break;
                default:
                    console.log("Respuesta inválida. Vuelva a intentarlo.\n");
                    break;
            }
            readlineSync.question("Presiona Enter para volver al Menú Principal.");
            break;
        case '2':
            var taskTitle_1 = readlineSync.question("Ingrese el título de la tarea a buscar: ");
            var taskFound = taskList.find(function (task) { return task.title === taskTitle_1; });
            if (taskFound) {
                showTaskAndEdit(taskFound);
            }
            else {
                console.log("Tarea no encontrada.");
            }
            readlineSync.question("Presiona Enter para volver al Menú Principal.");
            break;
        case '3':
            var title = readlineSync.question("Ingrese el título de la tarea: ");
            var description = readlineSync.question("Ingrese la descripción de la tarea: ");
            var difficulty = readlineSync.question("Ingrese la dificultad de la tarea (baja/media/alta): ");
            var expireDate = readlineSync.question("Ingrese la fecha de vencimiento (formato dd/mm/yyyy): ");
            createTask(title, description, difficulty, expireDate);
            console.log("Tarea creada con éxito.");
            readlineSync.question("Presiona Enter para volver al Menú Principal.");
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
