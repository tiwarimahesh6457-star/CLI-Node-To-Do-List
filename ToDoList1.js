const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function loadTasks() {
  if (!fs.existsSync("tasks.json")) {
    fs.writeFileSync("tasks.json", "[]");
  }
  const data = fs.readFileSync("tasks.json", "utf-8");
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
}

async function todoApp() {
  const tasks = loadTasks();

  while (true) {
    console.log("\n-----To-Do-List-----");
    console.log("1. Add Task");
    console.log("2. View Tasks");
    console.log("3. Delete Tasks");
    console.log("4. Edit Tasks");
    console.log("5. Exit");

    const choice = await ask("Enter Your Choice:");
    if (choice === "5") {
      console.log("Goodbye!");
      break;
    }

    switch (choice) {
      case "1":
        const newtask = await ask("Enter New Taks:");

        if (newtask === "") {
          console.log("Task Cannot Be Empty");
          break;
        }
        tasks.push(newtask);
        saveTasks(tasks);
        console.log("Task ADDED Successfully");
        break;

      case "2":
        if (tasks.length === 0) {
          console.log("No Tasks Available");
        } else {
          console.log("Tasks:");
          tasks.forEach((t, i) => {
            console.log(`${i + 1}. ${t}`);
          });
        }
        break;

      // Delete Task
      case "3":
        if (tasks.length === 0) {
          console.log("No Tasks To Delete");
          break;
        }
        tasks.forEach((t, i) => {
          console.log(`${i + 1}. ${t}`);
        });

        const delIndex = Number(await ask("Enter Task Number To Delete:")) - 1;
        if (delIndex < 0 || delIndex >= tasks.length) {
          console.log("Invalid Number");
        } else {
          const delTask = tasks.splice(delIndex, 1);
          saveTasks(tasks);
          console.log("Task Deleted Successfully");
        }

        break;

      //Edit Task
      case "4":
        if (tasks.length === 0) {
          console.log("Invalid Task Number");
          break;
        }
        tasks.forEach((t, i) => {
          console.log(`${i + 1}. ${t}`);
        });
        const editIndex = Number(await ask("Enter Task Number To Edit:")) - 1;

        if (editIndex < 0 || editIndex >= tasks.length) {
          console.log("Invalid Task Number");
          break;
        }

        const newTask = await ask("Enter New Task:");
        if (newTask === "") {
          console.log("Task Cannot Be Empty");
          break;
        }
        tasks[editIndex] = newTask;
        saveTasks(tasks);
        console.log(" Task updated");
        break;

      default:
        console.log("Invalid Choice");
    }
  }

  rl.close();
}
todoApp();
