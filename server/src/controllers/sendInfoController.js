import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import moment from "moment";
import twilio from "twilio";

const sendInfo = async (req, res) => {
    const { userEmail, name, reservationTime, numOfPeople, notes, phoneNum } = req.body;

    if (!userEmail || !name || !reservationTime || !numOfPeople || !notes || !phoneNum) {
        return res.status(400).json({
            message: "Missing required parameter",
        });
    }

    try {
        await handleSendMail(userEmail, name, reservationTime, numOfPeople, notes);

        await handleSendSMS(phoneNum, reservationTime, numOfPeople, notes);

        return res.status(201).json({
            message: "Send success",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};

const handleSendMail = async (userEmail, name, reservationTime, numOfPeople, notes) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            // Appears in header & footer of e-mails
            name: "TP restaurant",
            link: "https://www.google.com/",
            // Optional product logo
            // logo: "https://mailgen.js/img/logo.png",
        },
    });

    const email = {
        body: {
            name: `${name}`,
            intro: ["Your table reservation request at TP restaurant has been successful!", "Please arrive on time according to the table reservation information as follows:"],
            table: {
                data: [
                    {
                        "reservation time": `${moment(reservationTime).format("MMMM, Do YYYY HH:mm")}`,
                        "number of people": `${numOfPeople}`,
                        notes: `${notes}`,
                    },
                ],
            },
            outro: ["If you have any questions, please contact us via hotline: 1900 6969.", "Hope you and your love ones enjoy the meal!"],
            signature: false,
        },
    };

    const emailBody = mailGenerator.generate(email);

    const message = {
        from: process.env.MY_EMAIL, // sender address
        to: userEmail, // list of receivers
        subject: "Confirmation that you have successfully reserved a table at TP restaurant", // Subject line
        text: `Reservation time: ${moment(reservationTime).format("MMMM, Do YYYY HH:mm")}, Number of people: ${numOfPeople}, Notes: ${notes}`, // plain text
        html: emailBody, // html body
    };

    // send mail with defined transport object
    return await transporter.sendMail(message);
};

const handleSendSMS = async (phoneNum, reservationTime, numOfPeople, notes) => {
    const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const text =
        "Confirmation that you have successfully reserved a table at TP restaurant!\n\n" +
        ` - Reservation time: ${moment(reservationTime).format("MMMM, Do YYYY HH:mm")} \n - Number of people: ${numOfPeople} \n - Notes: ${notes}`;

    client.messages
        .create({
            body: `${text}`,
            to: `+84${phoneNum}`, // Text your number
            from: "+16614381302", // From a valid Twilio number
        })
        .then((message) => console.log(message.sid))
        .catch((error) => {
            console.log(error);
        });
};

export default sendInfo;
