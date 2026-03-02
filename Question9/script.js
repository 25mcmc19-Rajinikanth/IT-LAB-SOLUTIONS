

$(document).ready(function () {


    const formJSON = {
        fields: [
            { label: "Name", type: "text", id: "name" },
            { label: "Email", type: "email", id: "email" },
            { label: "Password", type: "password", id: "password" },

            {
                label: "Country",
                type: "select",
                id: "country",
                options: ["India", "USA", "Canada"]
            },

            {
                label: "State (USA Only)",
                type: "select",
                id: "state",
                options: ["California", "Texas", "Florida"],
                hidden: true
            },

            {
                label: "User Type",
                type: "select",
                id: "userType",
                options: ["Student", "Professional"]
            },

            {
                label: "College Name (Students Only)",
                type: "text",
                id: "college",
                hidden: true
            },

            {
                label: "Company Name (Professionals Only)",
                type: "text",
                id: "company",
                hidden: true
            }
        ]
    };


    const form = $("<form id='dynamicForm'></form>");

    formJSON.fields.forEach(function (field) {

        const formGroup = $("<div class='form-group'></div>");
        if (field.hidden) {
            formGroup.addClass("hidden");
        }

        const label = $("<label></label>").text(field.label);
        formGroup.append(label);

        let input;

        if (field.type === "select") {

            input = $("<select></select>").attr("id", field.id);

            field.options.forEach(function (option) {
                input.append(
                    $("<option></option>").val(option).text(option)
                );
            });

        } else {

            input = $("<input>")
                .attr("type", field.type)
                .attr("id", field.id);
        }

        formGroup.append(input);
        formGroup.append("<div class='error'></div>");

        form.append(formGroup);
    });

    form.append("<button type='submit'>Submit</button>");

    $("#formContainer").append(form);



    $("#country").change(function () {

        if ($(this).val() === "USA") {
            $("#state").closest(".form-group").removeClass("hidden");
        } else {
            $("#state").closest(".form-group").addClass("hidden");
        }

    });



    $("#userType").change(function () {

        if ($(this).val() === "Student") {

            $("#college").closest(".form-group").removeClass("hidden");
            $("#company").closest(".form-group").addClass("hidden");

        } else {

            $("#company").closest(".form-group").removeClass("hidden");
            $("#college").closest(".form-group").addClass("hidden");

        }

    });



    $("#dynamicForm").submit(function (e) {

        e.preventDefault();

        let isValid = true;

        $(".error").text("");


        if ($("#name").val().trim() === "") {
            $("#name").next(".error").text("Name is required");
            isValid = false;
        }


        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!emailPattern.test($("#email").val())) {
            $("#email").next(".error").text("Enter valid email");
            isValid = false;
        }


        if ($("#password").val().length < 6) {
            $("#password").next(".error").text("Password must be at least 6 characters");
            isValid = false;
        }


        if ($("#country").val() === "USA") {
            if ($("#state").val() === null) {
                $("#state").next(".error").text("Select a state");
                isValid = false;
            }
        }


        if ($("#userType").val() === "Student") {
            if ($("#college").val().trim() === "") {
                $("#college").next(".error").text("College name required");
                isValid = false;
            }
        }


        if ($("#userType").val() === "Professional") {
            if ($("#company").val().trim() === "") {
                $("#company").next(".error").text("Company name required");
                isValid = false;
            }
        }

        if (isValid) {
            alert("Form Submitted Successfully ");
        }

    });

});