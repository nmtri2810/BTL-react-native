export const isValidEmail = (email) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const isValidPassword = (password) => password.length >= 3;

export const isValidReservation = (
    reservationTime,
    numOfPeople,
    name,
    phoneNum
) => {
    if (
        reservationTime.length === 0 ||
        numOfPeople.length === 0 ||
        name.length === 0 ||
        phoneNum.length === 0
    ) {
        alert("Please complete all the information");
        return false;
    }
    if (/^\d+$/.test(numOfPeople) == false || parseInt(numOfPeople) > 100) {
        alert(
            "Please enter correct number of people. Max people: 100. Please make a note if you go with more people."
        );
        return false;
    }
    if (/^[A-Za-z\s]*$/.test(name) == false || name.length > 30) {
        alert("Please enter the correct name");
        return false;
    }
    if (/^\d{10}$/.test(phoneNum) == false) {
        alert(
            "Please enter the correct phone number. Phone number should have 10 digits"
        );
        return false;
    }
};
