import * as readlineSync from 'readline-sync';

interface Task {
  title: string;
  description: string;
  status: string;
  creationDate: string;
  lastEditDate: string;
  expireDate: string;
  difficulty: string;
}

const taskList: Task[] = [];

function createTask(title: string, description: string = '', difficulty: string, expireDate: string): void {
  const task: Task = {
    title,
    description,
    status: "pendiente",
    creationDate: new Date().toString(),
    lastEditDate: new Date().toString(),
    expireDate,
    difficulty,
  };
  taskList.push(task);
}

function showTask(task: Task): void {
  console.log("Titulo:", task.title);
  console.log("Estado:", task.status);
  console.log("Descripción:", task.description);
  console.log("Fecha de creación:", task.creationDate);
  console.log("Fecha de vencimiento:", task.expireDate);
  console.log("Dificultad:", getDifficultyStars(task.difficulty));
  console.log("Última edición:", task.lastEditDate);
}

function showTaskAndEdit(task: Task): void {
  console.log("Titulo:", task.title);
  console.log("Estado:", task.status);
  console.log("Descripción:", task.description);
  console.log("Fecha de creación:", task.creationDate);
  console.log("Fecha de vencimiento:", task.expireDate);
  console.log("Dificultad:", getDifficultyStars(task.difficulty));
  console.log("Última edición:", task.lastEditDate);

  const response = readlineSync.question("\nPresione 'E' para editar la tarea, '0' para volver: \n");
  if (response.toLowerCase() === 'e') {
    editTask(task);
  } else if (response === '0') {
    mainMenu();
  } else {
    console.log("Opción no válida. Volviendo al Menú Principal.");
    mainMenu();
  }
}

function getDifficultyStars(difficulty: string): string {
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

function editTask(task: Task): void {
  const newTitle = readlineSync.question("Nuevo título (Enter para mantener el actual): ") || task.title;
  const newDescription = readlineSync.question("Nueva descripción (Enter para mantener la actual): ") || task.description;
  const newStatus = readlineSync.question("Nuevo estado (en curso/pendiente/terminada) (Enter para mantener el actual): ") || task.status;
  const newDifficulty = readlineSync.question("Nueva dificultad (Enter para mantener la actual): ") || task.difficulty;
  const newExpireDate = readlineSync.question("Nueva fecha de vencimiento (formato dd/mm/yyyy, Enter para mantener la actual): ") || task.expireDate;

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

  const mainMenuOption = readlineSync.question("?");

  switch (mainMenuOption) {
    case '1':
      displaySubMenu();

      const subMenuOption = readlineSync.question("?");
      switch (subMenuOption) {
        case '1': // Todas
          console.log("Mostrando todas las tareas...\n");

          taskList.sort((a, b) => a.title.localeCompare(b.title));

          for (const task of taskList) {
            showTask(task);
          }

          readlineSync.question("Presiona Enter para volver al Menú Principal.");
          break;

        case '3': // En curso
          console.log("Mostrando todas las tareas en curso...\n");

          for (const task of taskList) {
            if (task.status.toLowerCase() === "en curso") {
              showTask(task);
            }
          }
          break;

        case '4': // Terminadas
          console.log("Mostrando todas las tareas terminadas...\n");

          for (const task of taskList) {
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
      const taskTitle = readlineSync.question("Ingrese el título de la tarea a buscar: ");
      const taskFound = taskList.find(task => task.title === taskTitle);

      if (taskFound) {
        showTaskAndEdit(taskFound);
      } else {
        console.log("Tarea no encontrada.");
      }

      readlineSync.question("Presiona Enter para volver al Menú Principal.");
      break;

    case '3':
      const title = readlineSync.question("Ingrese el título de la tarea: ");
      const description = readlineSync.question("Ingrese la descripción de la tarea: ");
      const difficulty = readlineSync.question("Ingrese la dificultad de la tarea (baja/media/alta): ");
      const expireDate = readlineSync.question("Ingrese la fecha de vencimiento (formato dd/mm/yyyy): ");

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
