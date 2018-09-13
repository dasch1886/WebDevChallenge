let tasks = [];
let id = [];

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

  this.setId = function(){
    if(id.length === 0){
      this.id = 1;
      id.push(this.id);
    }else{
      this.id = Math.max.apply(Math,id)+1;
      id.push(this.id);
    }
  }

  this.setDate = function(date) {
    if (date.getDate() < 10) {
      this.date = "0" + date.getDate()+ " " + months[date.getMonth()] + " " + date.getFullYear();
    } else {
      this.date =  date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    }
  };

  this.setId();
  this.setDate(date);
};

document.addEventListener("DOMContentLoaded", function() {
  const taskCreator = document.querySelector("#task-creator");
  const input = this.querySelector("input");
  const textarea = this.querySelector("textarea");
  const select = this.querySelector("select");
  const taskList = document.querySelector(".task-list");

  taskCreator.addEventListener("submit", function(e) {
    e.preventDefault();

    if (
      input.value !== "" &&
        select.value !== "Select" &&
        textarea.value !== ""
    ) {
      tasks.push(new Task(input.value, select.value, textarea.value, new Date()));

      let div = document.createElement("div");
      div.classList.add("box");
      div.classList.add("item__task");
      div.setAttribute('data-id',tasks[tasks.length-1].id);
      div.setAttribute('data-category',tasks[tasks.length-1].category);

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


      divHeader.children[0].textContent = tasks[tasks.length-1].date;
      divHeader.children[1].textContent = "Category: " + tasks[tasks.length-1].category;
      divHeader.children[2].textContent = "Title: " + tasks[tasks.length-1].title;

      let divContent = document.createElement("div");
      divContent.classList.add("task__content");
      divContent.textContent = tasks[tasks.length-1].value;

      div.appendChild(divHeader);
      div.appendChild(divContent);

      taskList.appendChild(div);

      console.log(tasks,id);
    }
  });

  taskList.addEventListener('click',function(e){
    if(e.target.className.search('task__close')!=-1){
        const task = e.target.closest('.item__task');
        const idTask = parseInt(task.getAttribute('data-id'),10);
        
        console.log(typeof(idTask));
        tasks = tasks.filter(function(e){
          return e.id !== idTask;
        });

        id = id.filter(function(e){
          return e !== idTask;
        });
        task.parentNode.removeChild(task);
        console.log(tasks,id);
    }
  });
});
