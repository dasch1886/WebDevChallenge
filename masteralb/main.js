const registerForm = document.querySelector('#Register');
const passwords = registerForm.querySelectorAll('input[type="password"]');

const previewPassword = registerForm.querySelector('i');


previewPassword.addEventListener('click', function(){
    if(this.className.indexOf('fa-eye-slash')!==-1){
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
        [].forEach.call(passwords,function(el){
            el.type = "text";
        });
    }else{
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
        [].forEach.call(passwords,function(el){
            el.type = "password";
        });
    }    
});

passwords[1].addEventListener("blur", function(){
    if((this.value !== passwords[0].value) && (this.parentElement.className.indexOf('error')===-1)){
        this.parentElement.classList.add('error');
        passwords[0].parentElement.classList.add('error');
    }else if(this.value === passwords[0].value){
        this.parentElement.classList.remove('error');
        passwords[0].parentElement.classList.remove('error');
    }
});
