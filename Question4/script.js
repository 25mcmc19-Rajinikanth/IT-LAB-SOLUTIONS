function validateName() {
    let name = document.getElementById("name").value;
    let pattern = /^[A-Za-z ]+$/;

    if (!pattern.test(name)) {
        document.getElementById("nameError").innerHTML = "Only alphabets allowed";
        return false;
    } else {
        document.getElementById("nameError").innerHTML = "";
        return true;
    }
}

function validateEmail() {
    let email = document.getElementById("email").value;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!pattern.test(email)) {
        document.getElementById("emailError").innerHTML = "Invalid email format";
        return false;
    } else {
        document.getElementById("emailError").innerHTML = "";
        return true;
    }
}

function validatePassword() {
    let pwd = document.getElementById("password").value;
    let strength = 0;

    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    
    let score = Math.min(strength, 5);

    if (score < 4) {
        document.getElementById("passwordError").innerHTML =
            "Password must contain uppercase, lowercase, number & special char";
    } else {
        document.getElementById("passwordError").innerHTML = "";
    }

    if (score <= 2)
        document.getElementById("strength").innerHTML = "Weak Password";
    else if (score <= 4)
        document.getElementById("strength").innerHTML = "Medium Password";
    else
        document.getElementById("strength").innerHTML = "Strong Password";

    return score >= 4;
}

function validateDOB() {
    let dob = new Date(document.getElementById("dob").value);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    if (age < 18) {
        document.getElementById("dobError").innerHTML = "Must be at least 18 years old";
        return false;
    } else {
        document.getElementById("dobError").innerHTML = "";
        return true;
    }
}

function validatePhone() {
    let phone = document.getElementById("phone").value;
    let pattern = /^[0-9]{10}$/;

    if (!pattern.test(phone)) {
        document.getElementById("phoneError").innerHTML =
            "Phone number must be 10 digits";
        return false;
    } else {
        document.getElementById("phoneError").innerHTML = "";
        return true;
    }
}

function validateForm() {
    if (
        validateName() &&
        validateEmail() &&
        validatePassword() &&
        validateDOB() &&
        validatePhone()
    ) {
        alert("Registration Successful!");
        return true;
    } else {
        alert("Please fix the errors in the form");
        return false;
    }
}
