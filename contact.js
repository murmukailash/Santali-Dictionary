function sendEmail(event) {
  // Uncomment the next line if you're using `type="submit"` and want to prevent the form from actually submitting
    event.preventDefault();

// Fetch form data
    var nameField = document.getElementById("name");
    var emailField = document.getElementById("email");
    var subjectField = document.getElementById("subject");
    var messageField = document.getElementById("message");
    var contactbtn = document.getElementById("contactbtn");

// Additional validation checks
    if (!validateInput(nameField, "Full Name") ||
        !validateInput(emailField, "Email") ||
        !validateInput(messageField, "Message")) {
        // Validation failed, do not proceed with sending the email
        return;
    }

    var name = nameField.value;
    var email = emailField.value;
    var subject = subjectField.value;
    var message = messageField.value;

//Change button status to sending
contactbtn.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Sending Message`;

    // Use the Email.js send method
    emailjs.send("service_ywjuz36", "santalidictionary", {
        from_name : name,
        email: email,
        subject: subject,
        message: message
    })
    .then(response => {
        console.log("Email sent successfully:", response);
        // You can handle success or error messages here
        window.alert("Email sent successfully.");
// Clear all fields for new message
        nameField.value = "";
        emailField.value = "";
        subjectField.value = "";
        messageField.value = "";
        contactbtn.innerHTML = "Send Email";
    })
    .catch(error => {
      console.error("Error sending email:", error);
    window.alert("Email sending failed! The maximum limit of recieving messages for the support team have be reached today. So, please try again tommorrow.");
    });
}

function validateInput(inputField, fieldName) {
    // Simple validation, check if the input value is not empty
    if (!inputField.value.trim()) {
        window.alert(fieldName + " cannot be empty.");
        return false;
    }
    return true;
}
