const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});


app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const mailId = req.body.mailid;
    mailchimp.setConfig({
        apiKey: "eac3612f5a3fe1bc71991ddb87f9d1dc-us21",
        server: "us21",
    });
    const list_id = "9ff6a69ca2";

    // All the below code are from mailchimp docs

    const run = async () => {
        try {
            const response = await mailchimp.lists.batchListMembers(list_id, {
                members: [{
                    email_address: mailId,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                }],
            });
            console.log(response);
            res.sendFile(__dirname + "/success.html");
        } catch (err) {
            console.log(err.status);
            res.sendFile(__dirname + "/failure.html");
        }
    };
    run();
});
app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server started at 3000...");
});

// // API key: eac3612f5a3fe1bc71991ddb87f9d1dc-us21
// // list id : 9ff6a69ca2 
