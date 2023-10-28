//npm install to install all the required packages
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('recital-site'));
app.use('/images',express.static('images'));
app.get('/styles.css', (req, res) => {
    res.header('Content-Type', 'text/css');
    res.sendFile(__dirname + '/styles.css');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +'recital-site'));

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hccmusicschooleptx@gmail.com',
        pass: 'edhegbpdunkdawlv'
    }
});
console.log('transporter made');


// Initialize passport


// Configure Google OAuth2.0 strategy




// Callback route


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
console.log("got the index.html ")
app.post('/rsvp', (req, res) => {
    const { 'first-name': firstName, 'last-name' : lastName, email, attendees } = req.body;

    const fullName = `${firstName} ${lastName}`;

    const mailOptions = {
        from: 'hccmusicschooleptx@gmail.com',
        to: 'nmoran@hccelpaso.com',
        subject: 'Someone signed up for the Recital!',
        text: `Name: ${fullName}\nEmail: ${email}\nAttendees: ${attendees}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send(`
        <html>
            <head>
                <title>RSVP Submitted</title>
                <style>
                    body {
                        background-color: darkgrey;
                        font-family: 'Roboto', sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        text-align: center;
                        padding: 20px;
                    }
                    footer {
                        background-color: #333;
                        color: #fff;
                        padding: 10px;
                        text-align: center;
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                    }
                    a {
                        color: #fff; /* Link text color */
                        text-decoration: underline; /* Underline the link text */
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>RSVP Submitted! Thank You!</h1>
                </div>
                <footer>
                    If there are any questions or concerns, please reach out to <a href="mailto:nmoran@hccelpaso.com">nmoran@hccelpaso.com</a>
                </footer>
            </body>
        </html>
    `);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
