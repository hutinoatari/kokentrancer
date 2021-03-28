const fs = window.requires.fs;
const path = window.requires.path;
const __dirname = path.dirname(window.requires.__dirname);

const nameListFile = path.join(__dirname, "nameList.txt");

const nameForm = document.getElementById("nameForm");
const temperatureForm = document.getElementById("temperatureForm");
const nameList = document.getElementById("nameList");
const resetButton = document.getElementById("resetButton");
const sendButton = document.getElementById("sendButton");

const dateToYYYYMMDD = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${y}${(""+m).padStart(2, "0")}${(""+d).padStart(2, "0")}`;
}

const sendForms = () => {
    const name = nameForm.value;
    const temperature = temperatureForm.value;
    if(name.trim()==="" || temperature===""){
        alert("不正な入力です。");
        return;
    }

    const csvFile = path.join(__dirname, `${dateToYYYYMMDD(new Date())}.csv`);
    console.log(csvFile);
    const csvFileExist = fs.existsSync(csvFile);
    if(!csvFileExist) fs.writeFileSync(csvFile, "", "utf-8");
    let csv = fs.readFileSync(csvFile, "utf-8");
    csv += `${name},${temperature}\n`;
    fs.writeFileSync(csvFile, csv, "utf-8");

    const data = fs.readFileSync(nameListFile, "utf-8");
    let names;
    if(data !== ""){
        names = data.split("\n");
        names.push(name);
        names.sort();
        names = names.join("\n");
    }else{
        names = name;
    }
    const nameListFileExist = fs.existsSync(nameListFile);
    if(!nameListFileExist) fs.writeFileSync(nameListFile, "", "utf-8");
    fs.writeFileSync(nameListFile, names, "utf-8");

    alert("記録完了！");
    formInit();
}
sendButton.onclick = sendForms;

const formInit = () => {
    nameForm.value = "";

    temperatureForm.value = "";

    nameList.innerHTML = "";
    const nameListFileExist = fs.existsSync(nameListFile);
    if(!nameListFileExist) fs.writeFileSync(nameListFile, "", "utf-8");
    const data = fs.readFileSync(nameListFile, "utf-8");
    if(data !== ""){
        const names = data.split("\n");
        names.forEach((name) => {
            const option = document.createElement("option");
            const optionText = document.createTextNode(name);
            option.appendChild(optionText);
            nameList.appendChild(option);
        });
    }
}
resetButton.onclick = formInit;

formInit();