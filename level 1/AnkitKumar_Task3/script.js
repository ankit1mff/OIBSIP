document.getElementById('calcBtn').onclick = function() {
    let inputVal = document.getElementById('tempInput').value.trim();
    let unit = document.getElementById('unitSelect').value;
    let errDiv = document.getElementById('errorBox');
    let outDiv = document.getElementById('outputBox');

    errDiv.innerText = "";
    outDiv.classList.add('hidden');

    if (inputVal === "" || isNaN(inputVal)) {
        errDiv.innerText = "Please enter valid numbers only.";
        return;
    }

    let val = parseFloat(inputVal);
    let c, f, k;

    if (unit === "Celsius") {
        if (val < -273.15) {
            errDiv.innerText = "Value cannot be less than absolute zero (-273.15).";
            return;
        }
        c = val;
        f = (val * 9/5) + 32;
        k = val + 273.15;
    } 
    else if (unit === "Fahrenheit") {
        if (val < -459.67) {
            errDiv.innerText = "Value cannot be less than absolute zero.";
            return;
        }
        c = (val - 32) * 5/9;
        f = val;
        k = c + 273.15;
    } 
    else if (unit === "Kelvin") {
        if (val < 0) {
            errDiv.innerText = "Kelvin cannot be negative.";
            return;
        }
        k = val;
        c = val - 273.15;
        f = (c * 9/5) + 32;
    }

    document.getElementById('cRes').innerText = c.toFixed(2) + " °C";
    document.getElementById('fRes').innerText = f.toFixed(2) + " °F";
    document.getElementById('kRes').innerText = k.toFixed(2) + " K";

    outDiv.classList.remove('hidden');
}