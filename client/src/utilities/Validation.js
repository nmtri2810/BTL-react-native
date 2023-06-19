export const isValidEmail = (email) => 
    (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) 

export const isValidPassword = (password) => 
    (password.length >= 3)

export const isValidReservation = (reservationTime, numOfPeople, name, phoneNum) => {
    if(reservationTime == null || numOfPeople == null || name == null || phoneNum == null) {
        alert("all need required")
        return false;
    }
    console.log(typeof reservationTime)
}