let edit = document.querySelector(".edit");
let input = document.querySelector(".input");
let addBtn = document.querySelector(".addBtn");
let inputArray = JSON.parse(localStorage.getItem("tasks")) || [];
let container = document.querySelector(".contentContainer");

addBtn.addEventListener("click", (e) => {
    if (input.value === "") {
        alert("Please Add The Task");
    } else {
        inputArray.push({ text: input.value, checked: false });
        input.value = "";
        localStorage.setItem("tasks", JSON.stringify(inputArray));
        renderTasks();
    }
});

//creating the li with the array values
function renderTasks() {
    container.innerHTML = "";

    if (inputArray.length == 0) {
        container.innerHTML = ` <li class="content">! No Tasks </li>`;
    } else {
        for (let index = 0; index < inputArray.length; index++) {
            const element = inputArray[index];
            container.innerHTML += `
             <li class="content">
                <div class="checkAndTodo">
                   <input class="checkBox" type="checkbox" ${element.checked ? "checked" : ""}>
                        <span class="todo" style="text-decoration: ${element.checked ? "line-through" : "none"}">${element.text}</span>
                </div>
                <div class="customBtns">
                    <div class="edit"><img src="/Assets/edit.svg" alt=""></div>
                    <div class="delete"><img src="/Assets/delete.svg" alt=""></div>
                </div>
            </li>`;
        }
    }

}

// Event delegation for delete, edit, and checkbox
container.addEventListener("click", (e) => {
    const index = Array.from(container.querySelectorAll(".content")).indexOf(e.target.closest(".content"));

    // Delete button
    if (e.target.closest(".delete")) {
        inputArray.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(inputArray));
        renderTasks();
    }

    // Edit button
    if (e.target.closest(".edit")) {
        let a = prompt("Edit task:", inputArray[index].text)
        if (a !== null && a.trim() !== "") { // Only update if not canceled and not empty
            inputArray[index].text = a.trim();
            localStorage.setItem("tasks", JSON.stringify(inputArray));
            renderTasks();
        }
        localStorage.setItem("tasks", JSON.stringify(inputArray));
        renderTasks();
    }
});
//checkbox 
container.addEventListener("change", (e) => {
    if (e.target.classList.contains("checkBox")) {
        const index = Array.from(container.querySelectorAll(".checkBox")).indexOf(e.target);
        inputArray[index].checked = e.target.checked; // Update checked state
        localStorage.setItem("tasks", JSON.stringify(inputArray)); // Save to storage
        const todo = e.target.closest(".content").querySelector(".todo");
        todo.style.textDecoration = e.target.checked ? "line-through" : "none"; // Toggle line-through
    }
});
renderTasks();
