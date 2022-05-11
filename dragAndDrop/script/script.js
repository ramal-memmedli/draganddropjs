let draggableElements = document.querySelectorAll(".draggable-element");
let droppableAreas = document.querySelectorAll(".droppable-area");

let draggableElementPositionX;
let draggableElementPositionY;
let draggableElementWidth;
let draggableElementHeight;

for (const element of draggableElements) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    element.style.backgroundColor = `#${randomColor}`;
    draggableElementWidth = element.offsetWidth;
    draggableElementHeight = element.offsetHeight;
    element.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("elementId", event.target.id);
        draggableElementPositionX = event.offsetX;
        draggableElementPositionY = event.offsetY;
        event.target.style.cursor = "grab";
        event.target.style.transform = "scale(0)";
    });
    element.addEventListener("dblclick", (event) => {
        event.target.classList.toggle("circle");
    });
}

for (const area of droppableAreas) {
    area.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
    area.addEventListener("drop", (event) => {
        let areaWidth = event.target.offsetWidth;
        let areaHeight = event.target.offsetHeight;
        let elementId = event.dataTransfer.getData("elementId");
        let draggableElement = document.getElementById(elementId);
        draggableElement.style.transform = "scale(1)";
        if (event.target.classList.contains("droppable-area")) {
            event.target.appendChild(draggableElement);
            area.style.position = "relative";
            draggableElement.classList.add("dragging");

            if (event.offsetX < draggableElementWidth && event.offsetY < draggableElementWidth) {
                draggableElement.style.left = "0";
                draggableElement.style.top = "0";
            }
            else if (event.offsetX > (areaWidth - draggableElementWidth) && event.offsetY > (areaHeight - draggableElementWidth)) {
                draggableElement.style.top = areaHeight - draggableElementHeight + "px";
                draggableElement.style.left = areaWidth - draggableElementWidth + "px";
            }
            else if (event.offsetX < draggableElementWidth && event.offsetY > (areaHeight - draggableElementWidth)) {
                draggableElement.style.left = "0";
                draggableElement.style.top = areaHeight - draggableElementHeight + "px";
            }
            else if (event.offsetX > (areaWidth - draggableElementWidth) && event.offsetY < draggableElementHeight) {
                draggableElement.style.top = "0";
                draggableElement.style.left = areaWidth - draggableElementWidth + "px";
            }
            else if (event.offsetY < draggableElementHeight) {
                draggableElement.style.top = "0";
                draggableElement.style.left = event.offsetX - draggableElementPositionX + "px";
            }
            else if (event.offsetX < draggableElementWidth) {
                draggableElement.style.left = "0";
                draggableElement.style.top = event.offsetY - draggableElementPositionY + "px";
            }
            else if (event.offsetY > (areaHeight - draggableElementWidth)) {
                draggableElement.style.top = areaHeight - draggableElementHeight + "px";
                draggableElement.style.left = event.offsetX - draggableElementPositionX + "px";
            }
            else if (event.offsetX > (areaWidth - draggableElementWidth)) {
                draggableElement.style.left = areaWidth - draggableElementWidth + "px";
                draggableElement.style.top = event.offsetY - draggableElementPositionY + "px";
            }
            else {
                draggableElement.style.left = event.offsetX - draggableElementPositionX + "px";
                draggableElement.style.top = event.offsetY - draggableElementPositionY + "px";
            }
        }
        else if (event.target.classList.contains("draggable-element")) {
            event.target.appendChild(draggableElement);
            area.style.position = "relative";
            draggableElement.classList.add("dragging");
            draggableElement.style.left = event.offsetX - draggableElementPositionX + "px";
            draggableElement.style.top = event.offsetY - draggableElementPositionY + "px";
        }
    });
}

