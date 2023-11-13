import * as readlineSync from 'readline-sync';

interface Task {
  title: string;
  description: string;
  status: string;
  creationDate: string;
  expireDate: string | null;
  difficulty: string; 
}

const taskList: Task[] = [];

function createTask(title: string, description: string = '', difficulty?: string, expireDate?: string): void {
  const task: Task = {
    title,
    description,
    status: "pendiente",
    creationDate: new Date().toString(),
    expireDate,
    difficulty,
  };
  taskList.push(task);
}

function changeStatus(title: string, newStatus: string): void {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].title === title) {
      taskList[i].status = newStatus;
    }
  }
}

function showTask(task: Task): void {
  console.log("Titulo:", task.title);
  console.log("Estado:", task.status);
  console.log("Descripción:", task.description);
  console.log("Fecha de creación:", task.creationDate);
  console.log("Fecha de vencimiento:", task.expireDate);
  console.log("Dificultad:", task.difficulty);

  const response: string = readlineSync.question("\nPresione 'E' para editar la tarea, '0' para volver: ");
  if (response.toLowerCase() === 'e') {
    editTask(task);
  } else if (response === '0') {
    mainMenu();
  } else {
    console.log("Opción no válida. Volviendo al Menú Principal.");
    mainMenu();
  }
}

function editTask(task: Task): void {
  const newTitle: string = readlineSync.question("Nuevo título (Enter para mantener el actual): ") || task.title;
  const newDescription: string = readlineSync.question("Nueva descripción (Enter para mantener la actual): ") || task.description;
  const newDifficulty: string = readlineSync.question("Nueva dificultad (Enter para mantener la actual): ") || task.difficulty || '';
  const newExpireDate: string = readlineSync.question("Nueva fecha de vencimiento (formato dd/mm/yyyy, Enter para mantener la actual): ") || task.expireDate || '';

  task.title = newTitle;
  task.description = newDescription;
  task.difficulty = newDifficulty;
  task.expireDate = newExpireDate;

  console.log("Tarea editada con éxito.");
  readlineSync.question("Presiona Enter para volver al Menú Principal.");
  mainMenu();
}

function displayMainMenu(): void {
  console.log("Menú principal");
  console.log("1. Ver mis tareas\n2. Buscar una tarea\n3. Crear tarea\n0. Salir");
}

function displaySubMenu(): void {
  console.log("Qué tareas deseas ver?");
  console.log("1. Todas\n2. Pendientes\n3. En curso\n4. Terminadas\n5. Volver\n");
}

function mainMenu(): void {
  readlineSync.question("Presiona Enter para mostrar el Menú Principal.");

  displayMainMenu();

  const mainMenuChoice: string = readlineSync.question("?");

  switch (mainMenuChoice) {
    case '1':
      displaySubMenu();

      const subMenuChoice: string = readlineSync.question("?");

      switch (subMenuChoice) {
        case '1': // Todas
          console.log("Mostrando todas las tareas...\n");
          for (let i = 0; i < taskList.length; i++) {
            showTask(taskList[i]);
          }
          break;

        case '2': // Pendientes
          console.log("Mostrando todas las tareas pendientes...\n");
          for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].status.toLowerCase() === "pendiente") {
              showTask(taskList[i]);
            }
          }
          break;

        case '3': // En curso
          console.log("Mostrando todas las tareas en curso...\n");
          for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].status.toLowerCase() === "en curso") {
              showTask(taskList[i]);
            }
          }
          break;

        case '4': // Terminadas
          console.log("Mostrando todas las tareas terminadas...\n");
          for (let i = 0; i < taskList.length; i++) {
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
      const taskTitle: string = readlineSync.question("Ingrese el título de la tarea a buscar: ");
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].title === taskTitle) {
          showTask(taskList[i]);
          break;
        }
      }
      readlineSync.question("Presiona Enter para volver al Menú Principal.");
      mainMenu();
      break;

    case '3':
      const title: string = readlineSync.question("Ingrese el título de la tarea: ");
      const description: string = readlineSync.question("Ingrese la descripción de la tarea: ");
      const difficulty: string = readlineSync.question("Ingrese la dificultad de la tarea: ");
      const expireDate: string = readlineSync.question("Ingrese la fecha de vencimiento (formato dd/mm/yyyy): ");
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