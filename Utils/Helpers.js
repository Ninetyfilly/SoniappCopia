export function validatePassword(password) {
    let newPassword = password;
    let minNumberofChars = 8;
    let maxNumberofChars = 20;
    let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    let error = '';
    alert(newPassword); 
    if(newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars){
        error = "La contraseña no debe de estar vacia"
        return error;
    }else if(!regularExpression.test(newPassword)) {
        error = "La contraseña debe de contener al menos un caracter especial"
        return error;
}
}