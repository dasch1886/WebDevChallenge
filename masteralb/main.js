const registerForm = document.querySelector('#Register');
const passwordsRegister = registerForm.querySelectorAll('input[type="password"]');

const signForm = document.querySelector('#Sign');
const passwordsSign = signForm.querySelectorAll('input[type="password"]');

const previewPasswordSign = signForm.querySelector('i');
const previewPasswordRegister = registerForm.querySelector('i');


const preview = function(arg1) {
    if(this.className.indexOf('fa-eye-slash')!==-1){
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
        [].forEach.call(arg1,function(el){
            el.type = "text";
        });
    }else{
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
        [].forEach.call(arg1,function(el){
            el.type = "password";
        });
    }    
}

const differentPasswords = function(firstPasswordElement){
    if((this.value !== firstPasswordElement.value) && (this.parentElement.className.indexOf('error')===-1)){
        this.parentElement.classList.add('error');
        firstPasswordElement.parentElement.classList.add('error');
    }else if(this.value === firstPasswordElement.value){
        this.parentElement.classList.remove('error');
        firstPasswordElement.parentElement.classList.remove('error');
    }
} 

previewPasswordRegister.addEventListener('click', function(){
    let previewBinded = preview.bind(this);
    previewBinded(passwordsRegister);
});

previewPasswordSign.addEventListener('click',function(){
    let previewBinded = preview.bind(this);
    previewBinded(passwordsSign);
});

passwordsRegister[1].addEventListener("blur", function(){
    let differentPasswordsBinded = differentPasswords.bind(this);
    differentPasswordsBinded(passwordsRegister[0]);
});
