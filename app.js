const express = require('express'); 
const server = express();
const nodemailer = require('nodemailer'); 
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

// Middleware to parse incoming JSON and URL-encoded data
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., JS, CSS)
server.use(express.static('public'));

// Set up Handlebars as the templating engine
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

// Home route (renders home.hbs)
server.get('/', function(req, res) {
    res.render('index', {
        layout: 'index',
        title: 'Contact Page'
    });
});


server.post('/send-email', (req, res) => {
    const { name, email, message } = req.body; 

    console.log('Received form data:', { name, email, message }); // para ma print sa terminal ung inputted data 

    const transporter = nodemailer.createTransport({ // TFTP para maconnect ung service gmail sa server 
        service: 'gmail',
        auth: {
            user: 'lastimosarisch@gmail.com', // email address kung san masend ung ininput na data sa portfolio contact page
            pass: 'mmxocxqzqkfogpnn', // sa 2FA generated password sa gmail under portfolio ata na 16 digits
        }
    });

    const mailOptions = {
        from: email,
        to: 'lastimosarisch@gmail.com',
        subject: `New message from ${name}`,
        text: `Dear Rischa Francine,<br>You have received a new message from ${name} <br>(${email}):<br><br>Message: <br>${message}`,
        html: `<p>Dear Rischa Francine,</p>
       <p>You have received a new message from <strong>${name}</strong> (<em>${email}</em>):</p>
       <p><strong>Message:</strong></p>
       <p>${message}</p><br><br>
       <p><em>**This email was sent from your portfolio, which was built using Express.js, Node.js, and Tailwind CSS, Francine :).**.</em></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send message.' });
        }
        console.log('Email sent successfully:', info.response); // Log success
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});


// Start the server
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


