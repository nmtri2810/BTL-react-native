export const isValidEmail = (email) => 
    (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) 

export const isValidPassword = (password) => 
    password.length >= 3