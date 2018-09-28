let tasks = [];
let id = [];
let categories = [];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let Task = function(title, category, value, date) {
  this.id = null;
  this.title = title;
  this.category = category;
  this.value = value;
  this.date = null;

  this.setId();
  this.setDate(date);
};

Task.prototype.setId = function(){
  if (id.length === 0) {
    this.id = 1;
    id.push(this.id);
  } else {
    this.id = Math.max.apply(Math, id) + 1;
    id.push(this.id);
  }
};

Task.prototype.setDate = function(date) {
  if (date.getDate() < 10) {
    this.date =
      "0" +
      date.getDate() +
      " " +
      months[date.getMonth()] +
      " " +
      date.getFullYear();
  } else {
    this.date =
      date.getDate() +
      " " +
      months[date.getMonth()] +
      " " +
      date.getFullYear();
  }
};

function checkCategory(value) {
  for (let e of categories) {
    if (e.toLowerCase() === value.toLowerCase()) {
      return false;
    }
  }
  return true;
}

document.addEventListener("DOMContentLoaded", function() {
  const taskCreator = document.querySelector("#task-creator");
  const input = taskCreator.querySelector("input");
  const textarea = taskCreator.querySelector("textarea");
  const select = taskCreator.querySelector("select");
  const taskList = document.querySelector(".task-list");
  const taskCategory = document.querySelector("#category");
  categories = [].map.call(
    taskCategory.querySelectorAll(".categoryName"),
    function(e) {
      return e.textContent;
    }
  );
  //add tasks to list
  taskCreator.addEventListener("submit", function(e) {
    e.preventDefault();

    if (
      input.value !== "" &&
      select.value !== "Select" &&
      textarea.value !== ""
    ) {
      tasks.push(
        new Task(input.value, select.value, textarea.value, new Date())
      );

      let div = document.createElement("div");
      div.classList.add("box");
      div.classList.add("item__task");
      div.setAttribute("data-id", tasks[tasks.length - 1].id);
      div.setAttribute("data-category", tasks[tasks.length - 1].category);

      let divHeader = document.createElement("div");
      divHeader.classList.add("task__header");

      for (let i = 0; i < 3; i++) {
        divHeader.appendChild(document.createElement("div"));
      }
      let i = document.createElement("i");
      i.classList.add("fas");
      i.classList.add("fa-times");
      i.classList.add("task__close");

      divHeader.appendChild(i);

      divHeader.children[0].textContent = tasks[tasks.length - 1].date;
      divHeader.children[1].textContent =
        "Category: " + tasks[tasks.length - 1].category;
      divHeader.children[2].textContent =
        "Title: " + tasks[tasks.length - 1].title;

      let divContent = document.createElement("div");
      divContent.classList.add("task__content");
      divContent.textContent = tasks[tasks.length - 1].value;

      div.appendChild(divHeader);
      div.appendChild(divContent);

      taskList.appendChild(div);
    }
  });

  //remove tasks by bytton X
  taskList.addEventListener("click", function(e) {
    if (e.target.className.search("task__close") != -1) {
      const task = e.target.closest(".item__task");
      const idTask = parseInt(task.getAttribute("data-id"), 10);
      tasks = tasks.filter(function(e) {
        return e.id !== idTask;
      });

      id = id.filter(function(e) {
        return e !== idTask;
      });
      task.parentNode.removeChild(task);
    }
  });

  const btnAdd = taskCategory.querySelector(".item__btn");
  const btnRemove = taskCategory.querySelector(".item__btn--remove");
  const ul = taskCategory.querySelector(".item__list");
  const section = taskCategory.querySelector("#addCategory");

  function addCategoryToList() {
    const input = section.querySelector("input");
    if (input.value !== "" && checkCategory(input.value)) {
      categories.push(input.value);
      const li = document.createElement("li");
      const label = document.createElement("label");
      label.htmlFor = input.value;
      li.classList.add("list__option");
      label
        .appendChild(document.createElement("span"))
        .classList.add("list__option--counter");
      label.children[0].textContent = "(0)";
      label
        .appendChild(document.createElement("span"))
        .classList.add("categoryName");
      label.children[1].textContent = input.value;
      li.appendChild(label);
      ul.appendChild(li);
      section.classList.remove("container__addCategory--active");
    }
  }

  function removeCategoryFromList() {
    const li = ul.querySelectorAll(".list__option");
    [].filter.call(li, function(e) {
      if (e.firstChild.checked) {
        return e.parentNode.removeChild(e);
      }
    });
    section.classList.remove("container__addCategory--active");
    input.classList.remove("input__removeCategory--inactive");
    btn.classList.remove("item__btn--remove");
  }

  function addCheckbox(e) {
    const idName = e.children[0].children[1].textContent;
    const checkbox = document.createElement("input");
    checkbox.id = idName;
    checkbox.type = "checkbox";
    checkbox.classList.add("item__input--checkbox");
    e.classList.add("list__option--remove");
    e.insertBefore(checkbox, e.childNodes[0]);
  }

  function removeCheckbox(e) {
    e.firstChild.remove();
    e.classList.remove("list__option--remove");
  }

  //btn to add category
  btnAdd.addEventListener("click", function() {
    const input = section.querySelector("input");
    const btn = section.querySelector(".btn");
    if (
      section.classList.contains("container__addCategory--active") &&
      input.classList.contains("input__removeCategory--inactive")
    ) {
      //transition from remove to add
      input.classList.remove("input__removeCategory--inactive");
      btn.classList.remove("item__btn--remove");
      [].forEach.call(ul.children, removeCheckbox);
    } else if (
      section.classList.contains("container__addCategory--active") &&
      !input.classList.contains("input__removeCategory--inactive")
    ) {
      //transition from active to hidden
      section.classList.remove("container__addCategory--active");
    } else {
      //transition from hidden to acitve
      section.classList.add("container__addCategory--active");
    }
    btn.removeEventListener("click", removeCategoryFromList);
    btn.addEventListener("click", addCategoryToList);
  });

  //btn to remove category
  btnRemove.addEventListener("click", function() {
    const input = section.querySelector("input");
    const btn = section.querySelector(".btn");
    if (
      section.classList.contains("container__addCategory--active") &&
      !input.classList.contains("input__removeCategory--inactive")
    ) {
      //transition from add to remove
      input.classList.add("input__removeCategory--inactive");
      btn.classList.add("item__btn--remove");
      [].forEach.call(ul.children, addCheckbox);
    } else if (
      section.classList.contains("container__addCategory--active") &&
      input.classList.contains("input__removeCategory--inactive")
    ) {
      //transition from active to hidden
      section.classList.remove("container__addCategory--active");
      input.classList.remove("input__removeCategory--inactive");
      btn.classList.remove("item__btn--remove");
      [].forEach.call(ul.children, removeCheckbox);
    } else {
      //transition from hidden to active
      section.classList.add("container__addCategory--active");
      input.classList.add("input__removeCategory--inactive");
      btn.classList.add("item__btn--remove");
      [].forEach.call(ul.children, addCheckbox);
    }

    btn.addEventListener("click", removeCategoryFromList);
    btn.removeEventListener("click", addCategoryToList);
  });
});
