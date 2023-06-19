export const isValidEmail = (email) => 
    (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) 

export const isValidPassword = (password) => 
    (password.length >= 3)

export const isValidReservation = (reservationTime, numOfPeople, name, phoneNum) => {
    // if(reservationTime.length === 0 || numOfPeople.length === 0 || name.length === 0 || phoneNum.length === 0) {
    //     alert("Please complete all the information");
    //     return false;
    // }
    if(numOfPeople.length === 0 || name.length === 0 || phoneNum.length === 0) {
        alert("Please complete all the information");
        return false;
    }
    if(true) {
        
    }
    if(/^\d+$/.test(numOfPeople) == false) {
        alert("Please enter the correct number of people");
        return false;
    }
    if(/^[A-Za-z\s]*$/.test(name) == false) {
        alert("Please enter the correct name");
        return false;
    }
    if(/^\d{10}$/.test(phoneNum) == false) {
        alert("Please enter the correct phone number");
        return false;
    }
}