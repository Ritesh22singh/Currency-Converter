const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";  // THis is the API link 

let dropDown = document.querySelectorAll(".dropdown select");   // 
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


// for (list in countryList)
// {
//     console.log(list, countryList[list]);

//     // Only for txt perpose
// }

for(let select of dropDown){  // This loop is for dropdown select of country code 
    for (countryCode in countryList){   // This one is for countrycode object were we insert many country and code 

        let newOption = document.createElement("option");  // here we create option and store value in innerText and value
        newOption.innerText = countryCode;
        newOption.value = countryCode;

        if(select.name === "from" && countryCode === "USD")
        {
            newOption.selected = "selected";
        }

        else if (select.name === "to" && countryCode === "INR")
        {
            newOption.selected = "selected";
        }

        // In Above we are setting default show USD and INR in starting

        select.append(newOption);   //Append the new <option> element to the dropdown list



    
        
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    // Here we are add event Listener show we can add country and their code show it's in dropdown menu
    });
};



const updateFlag = (element) => {
    let currCode = element.value;  // Extracts the currency code from the input element
    let countryCode = countryList[currCode];  // Retrieves the country code based on the currency code
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;  // Constructs the URL for the flag image using the country code
    let img = element.parentElement.querySelector("img");  // Finds the <img> element in the parent container of the input element
    img.src = newSrc;  // Updates the source (src) attribute of the <img> element with the new flag image URL
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();  // Prevents the default form submission behavior

    let amount = document.querySelector(".amount input");  // Gets the input element for the amount
    let amtVal = amount.value;  // Retrieves the value entered for the amount

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;  // Sets the amount value to 1 if it is empty or less than 1
        amount.value = "1";  // Updates the input field with the value 1
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // Constructs the API URL based on the selected source and target currencies

    let response = await fetch(URL);  // Sends a fetch request to the API URL
    let data = await response.json();  // Converts the response to JSON format
    let rate = data[toCurr.value.toLowerCase()];  // Retrieves the exchange rate for the target currency

    let finalAmount = amtVal * rate;  // Calculates the converted amount
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    // Updates the message element with the converted amount and currency information
});
