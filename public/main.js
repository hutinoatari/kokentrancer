const [nameForm, temperatureForm] = document.querySelectorAll("fieldset input");
const [submitButton, resetButton] = document.querySelectorAll("fieldset button");

submitButton.addEventListener("click", () => {
    const name = nameForm.value.trim();
    const temperature = +temperatureForm.value;
    if(name === "" || temperature < 30 || 50 < temperature){
        alert("不正な入力です。");
        return;
    }
    console.log({name, temperature});
    nameForm.value = "";
    temperatureForm.value = "";
});

resetButton.addEventListener("click", () => {
    nameForm.value = "";
    temperatureForm.value = "";
})