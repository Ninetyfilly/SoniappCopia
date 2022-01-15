export function validatePassword(password) {
    let newPassword = password;
    let minNumberofChars = 8;
    let maxNumberofChars = 20;
    let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*"/()=?'¡¿+-_.:,;<>|°¬€£^`~•○₩¥}{])[a-zA-Z0-9!@#$%^&*"/()=?'¡¿+-_.:,;<>|°¬€£^`~•○₩¥}{]{8,20}$/;
    let error = '';
    if(newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars){
         error =1;//1 es "La contraseña no debe de estar vacia"
        return error;
    }else if(!regularExpression.test(newPassword)) {
        error = 2;//2 es"La contraseña debe de contener al menos un caracter especial"
        return error;
}
}