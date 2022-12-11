const [nameForm, temperatureForm] = document.querySelectorAll("fieldset input");
const [submitButton, resetButton] = document.querySelectorAll("fieldset button");

const endpoint = "http://localhost:3000";

submitButton.addEventListener("click", () => {
    const name = nameForm.value.trim();
    const temperature = +temperatureForm.value;
    if(name === "" || temperature < 30 || 50 < temperature){
        alert("不正な入力です。");
        return;
    }
    const temperatureString = Number.isInteger(temperature) ? `${temperture}.0` : ("" + temperature);
    const confirmMessage = `${name}: ${temperatureString}℃\n以上でよろしいですか？`;
    if(!window.confirm(confirmMessage)) return;
    const url = `${endpoint}/add`;
    fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({name, temperature}),
    });
    nameForm.value = "";
    temperatureForm.value = "";
});

resetButton.addEventListener("click", () => {
    nameForm.value = "";
    temperatureForm.value = "";
})