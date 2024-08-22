
// Function to display painting info when the user clicks on/look at/or near a painting
export function displayPaintingInfo(info) {
    // Get the div element where the painting info will be displayed
    const infoDiv = document.querySelector("#painting_info");
    // Set the innerHTML of the div element to the painting info
    infoDiv.innerHTML = `
        <h3>${info.title}</h3>
        <p>Artist: ${info.artist}</p>
        <p>Description: ${info.description}</p>
        <p>Year: ${info.year}</p>
    `;
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