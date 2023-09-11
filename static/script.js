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
    
    const clickedButtons = document.querySelectorAll(".type_btn.clicked");
    if (clickedButtons.length > 2) {
        clickedButtons.forEach((btn) => {
            btn.classList.remove("clicked");
        });
    }
}

// 