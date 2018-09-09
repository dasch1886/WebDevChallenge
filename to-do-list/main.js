let Task = function(title, category, value, date) {
  this.title = title;
  this.category = category;
  this.value = value;
  this.date = date;
};

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

const Tasks = [];

let getDate = function(date) {
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let fulldate = null;
  if (day < 10) {
    fulldate = "0" + day + " " + months[month] + " " + year;
  } else {
    fulldate = day + " " + months[month] + " " + year;
  }

  return fulldate;
};

console.log(document.querySelectorAll('.task__header:before'));



document.addEventListener("DOMContentLoaded", function() {
  const taskCreator = document.querySelector("#task-creator");
  const input = this.querySelector("input");
  const textarea = this.querySelector("textarea");
  const select = this.querySelector("select");
  const taskList = document.querySelector(".task-list");
  console.dir(select);

  taskCreator.addEventListener("submit", function(e) {
    e.preventDefault();

    let date = new Date();

    if (
      input.value !== "" &&
        select.value !== "Select" &&
        textarea.value !== ""
    ) {
      task = new Task(input.value, select.value, textarea.value, getDate(date));

      let div = document.createElement("div");
      div.classList.add("box");
      div.classList.add("item__task");

      let divHeader = document.createElement("div");
      divHeader.classList.add("task__header");

      for (let i = 0; i < 3; i++) {
        divHeader.appendChild(document.createElement("div"));
      }

      divHeader.children[0].textContent = task.date;
      divHeader.children[1].textContent = "Category: " + task.category;
      divHeader.children[2].textContent = "Title: " + task.title;

      let divContent = document.createElement("div");
      divContent.classList.add("task__content");
      divContent.textContent = task.value;

      div.appendChild(divHeader);
      div.appendChild(divContent);

      taskList.appendChild(div);

      Tasks.push(task);
      console.log(Tasks);
      console.log(input.value, select.value, textarea.value);
    }
  });

  taskList.addEventListener('click',function(e){
    if(e.target.className.search('task__close')!=-1){
        const task = e.target.closest('.item__task');
        task.parentNode.removeChild(task);
    }
  });
});
