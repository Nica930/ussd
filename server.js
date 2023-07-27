const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';

    if (text === '') {
        // This is the first request. Note how we start the response with CON
        response = `CON What would you like to check
        1. Available Events
        2. Register`;
    } else if (text === '1') {
        // Business logic for first level response
        response = `CON Choose event information you want to view
        1. Ninjas Get Together
        2. Open Hackathon
        3. Open Hackathon`;
    } else if (text === '2') {
        // Business logic for first level response
      /  response = `CON Please enter your name:`;
    } else if (text.startsWith('2*')) {
        // Here, we are expecting the user to send their name in the format 2*John Doe
        const name = text.slice(2); // Extract the name from the user's response

        // Insert the user's name into the MySQL database
        const sql = 'INSERT INTO users (name) VALUES (?)';
        connection.query(sql, [name], (err, result) => {
            if (err) {
                console.error('Error inserting data into MySQL:', err);
                response = `END Sorry, there was an error. Please try again later.`;
            } else {
                response = `END Thank you, ${name}, for registering!`;
            }
            // Send the response back to the user
            res.set('Content-Type: text/plain');
            res.send(response);
        });
    } else if (text === '1*1') {
        // Business logic for second level response (Event details)
        response = `CON Details for Ninjas Get Together
        Date: August 15, 2023
        Location: XYZ Arena
        Register: Send 2*YourName`;
    } else {
        // Invalid input
        response = `END Invalid input. Please try again.`;
        // Send the response back to the user
        res.set('Content-Type: text/plain');
        res.send(response);
    }
});

app.listen(3001, ()=>{
    console.log('Server is running on port 3001')
})