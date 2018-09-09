let Task = function (title, category, value, date) {
    this.title = title;
    this.category = category;
    this.value = value;
    this.date = date;
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let getDate = function (date) {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let fulldate = null;
    if (day < 10) {
        fulldate = '0' + day + ' ' + months[month] + ' ' + year;
    } else {
        fulldate = day + ' ' + months[month] + ' ' + year;
    }

    return fulldate;
}


document.addEventListener('DOMContentLoaded',function(){
   let taskCreator = document.querySelector('#task-creator');

   taskCreator.addEventListener('submit',function(e){
       e.preventDefault();
       let input = this.querySelector('input');
       let textarea = this.querySelector('textarea');
       let select = this.querySelector('select');
       let date = new Date();

       task = new Task(input.value,select.value,textarea.value,getDate(date));

       let taskList = document.querySelector('.task-list');
       let div = document.createElement('div');
       div.classList.add('box');
       div.classList.add('item__task');

       let divHeader = document.createElement('div');
       divHeader.classList.add('task__header');

       for(let i=0;i<3;i++){
           divHeader.appendChild(document.createElement('div'));
       }

       divHeader.children[0].textContent = task.date;
       divHeader.children[1].textContent = 'Category: '+task.category;
       divHeader.children[2].textContent = 'Title: '+task.title;

       let divContent = document.createElement('div');
       divContent.classList.add('task__content');
       divContent.textContent = task.value;

       div.appendChild(divHeader);
       div.appendChild(divContent);

       taskList.appendChild(div);
       
       console.log(task);

   })


});