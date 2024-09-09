
// Function to display painting info when the user clicks on/look at/or near a painting
export function displayPaintingInfo(data) {
    // Get the div element where the painting info will be displayed
    const infoDiv = document.querySelector("#painting_info");
    //change the content of the div element to the painting info
    document.querySelector("#painting_title").textContent = data.info.title;
    document.querySelector("#painting_poem").innerHTML = `"${data.info.poem}"`;
    document.querySelector("#painting_description").innerHTML = data.info.description;
    document.querySelector("#painting_year").textContent = data.info.year;
    document.querySelector("#painting_material").textContent = data.info.material;
    document.querySelector("#painting_size").textContent = data.info.size;
    document.querySelector("#painting_link").src = data.link;
    document.querySelector("#paintingID").textContent = data.info.paintingID + 1;
    document.querySelector("#painting_price").value = `${data.info.price} VND`;
    document.querySelector("#price").value = data.info.value;
    document.querySelector("#price").step = 100000;
    document.querySelector("#price").min = data.info.price;
    
    if (!data.info.isBuyAble) {
        document.querySelector("#purchare_form_div").style.display = "none";
    } else {
        document.querySelector("#purchare_form_div").style.display = "block";
    }
    // document.querySelector("#painting_title").textContent = data.info.title_en;
    // document.querySelector("#painting_poem").innerHTML = `"${data.info.poem_en}"`;
    // document.querySelector("#painting_description").innerHTML = data.info.description_en;


    // Add the active class to the div element to display it
    infoDiv.classList.add("show");
}

// Function to hide the painting info when the user is not looking at a painting
export function hidePaintingInfo() {
    // Get the div element where the painting info is displayed
    const infoDiv = document.querySelector("#painting_info");
    // Remove the active class from the div element to hide
    infoDiv.classList.remove("show");
}