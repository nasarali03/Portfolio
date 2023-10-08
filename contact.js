var form = document.getElementById("myform");
var successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var message = document.getElementById("text");
  var nameval = name.value;
  var emailval = email.value;
  var messageval = message.value;
  console.log(nameval, emailval, messageval);
  emailjs.init("yzQuxKK07sNK7AozN");
  emailjs
    .send("service_nve8ny2", "template_dvj4zd5", {
      name: nameval,
      email: emailval,
      message: messageval,
    })
    .then(function (response) {
      console.log("Email sent successfully:", response);
      // You can redirect the user or show a success message here
      form.style.display = "none";
      successMessage.style.display = "block";
    })
    .catch(function (error) {
      console.error("Error sending email:", error);
      successMessage.innerText = error;
    });
});
