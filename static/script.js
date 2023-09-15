// hide results on startup
document.querySelectorAll(".result").forEach(function(result) {
    result.style.display = 'none';
});

// handle clicking button selectors for colors and type
function toggleColorButton(button) {
    button.classList.toggle("clicked");
    
    const clickedButtons = document.querySelectorAll(".color_btn.clicked");
    if (clickedButtons.length > 2) {
        clickedButtons.forEach((btn) => {
            btn.classList.remove("clicked");
        });
    }
}

function toggleTypeButton(button) {
    button.classList.toggle("clicked");
    
    const clickedButtons = document.querySelectorAll(".type_btn.clicked")
    if (clickedButtons.length > 2) {
        clickedButtons.forEach((btn) => {
            btn.classList.remove("clicked");
        });
    }
}

// handle generate button actions
function generateButton() {
    // collect data
    let animal = document.getElementById("looks_like").value
    let habitat = document.getElementById("habitat").value
    let colors = Array.from(document.querySelectorAll('.color_btn.clicked'), element => element.textContent.trim())
    let types = Array.from(document.querySelectorAll('.type_btn.clicked'), element => element.textContent.trim())

    if (!animal || !habitat || colors.length < 1 || types.length < 1) {
        alert("Some data has been left incomplete. Please input and continue.")
        return
    }

    // pass input to backend and handle response
    let data = {
        "animal": animal,
        "habitat": habitat,
        "colors": colors,
        "types": types
    }
    $.ajax({
        type: "POST",
        url: "/get_inspiration",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data),
        beforeSend: function () {
            $("#spinner-div").show()
        },
        success: function(data){
            // display new image
            document.querySelectorAll(".result").forEach(function(result) {
                document.getElementById("pokemon-pic").src = data["image_url"]
                result.style.display = 'block';
            });

            // display possible names
            var name_list = ""
            for (const name of data["names"]) {
                name_list += "<li>" + name + "</li>\n"
            }
            document.getElementById("names_generated").innerHTML = name_list
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        },
        complete: function () {
            $("#spinner-div").hide()
        },
    })
}