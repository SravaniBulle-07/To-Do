
window.addEventListener("load", () => {
    myList= JSON.parse(localStorage.getItem("todos")) || [];
    const nameInput = document.querySelector("#name");
    const newTodoForm = document.querySelector("#my-todo-form");
  
    const itemName = localStorage.getItem("itemname") || "";

    nameInput.value = itemName;
    nameInput.addEventListener("change", (event) => {
      localStorage.setItem("itemname", event.target.value);
    });
  
    newTodoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const todo = {
        content: event.target.content.value,
        endLine:event.target.endLine.value,
        done: false,
        createdAt: new Date().getTime(),
      };
  
      myList.push(todo);
      localStorage.setItem("todos", JSON.stringify(myList));
      event.target.reset();
  
      displayTodos();
    });
    displayTodos();
  });
  
  function displayTodos() {
    const todoList = document.querySelector("#todo-list");
    todoList.innerHTML = "";
    myList.forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
      const label = document.createElement("label");
      const input = document.createElement("input");
      const content = document.createElement("div");
      const endLine=document.createElement("div");
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      const delButton = document.createElement("button");
  
      input.type = "checkbox";
      input.checkbox = todo.done;
      content.classList.add("content");
      endLine.classList.add("endLine");
      actions.classList.add("actions");
      edit.classList.add("edit");
      delButton.classList.add("delete");
  
      content.innerHTML = `<input type="text" readonly value=${todo.content}>`;
      endLine.innerHTML = `<input type="text" readonly value=${todo.endLine}>`;
      edit.innerText = "Edit";
      delButton.innerText = "Delete";
      label.appendChild(input);
      actions.appendChild(edit);
      actions.appendChild(delButton);
  
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(endLine);
      todoItem.appendChild(actions);

  
      todoList.appendChild(todoItem);
      edit.addEventListener("click", () => {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();
        input.addEventListener("blur", (e) => {
          input.setAttribute("readonly", true);
          todo.content = e.target.value;
          localStorage.setItem("todos", JSON.stringify(myList));
          displayTodos();
        });
      });
  
      delButton.addEventListener("click", () => {
        myList= myList.filter((t) => t != todo);
        localStorage.setItem("todos", JSON.stringify(myList));
        displayTodos();
      });
    });
  }