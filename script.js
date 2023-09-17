const popUpNewCollection = document.querySelector(".popup-new-collection");
const addPopUp = document.getElementById("add-popup");
const backgroundColorDropdown = document.querySelector(".backgroundColor");

addPopUp.addEventListener("click", () => {
    popUpNewCollection.classList.toggle("displayToggle");
    backgroundColorDropdown.classList.toggle("backgroundBtnColor");
    addPopUp.src = addPopUp.src.includes("images/plus-icon.png") ? "images/dropdown-icon.png" : "images/plus-icon.png";
    
    // document.getElementById("add-popup").src = addPopUp.src.replace("images/plus-icon.png", "images/dropdown-icon.png");
})

const selectorColors = document.getElementById("selector-colors");
const selectorEmojis = document.getElementById("selector-emojis");


function switchPopUpSelectors(){
    selectorColors.addEventListener("click", () => {
        selectorColors.style.backgroundColor = "#EDEDF2";
        selectorEmojis.style.backgroundColor = "white";
        emojiList.style.display = "none";
    })

    selectorEmojis.addEventListener("click", () => {
        selectorColors.style.backgroundColor = "white";
        selectorEmojis.style.backgroundColor = "#EDEDF2";
        emojiList.style.display = "grid";
    })
}

switchPopUpSelectors();

let emojiCopyCounter = 0;

const emojiList = document.getElementById("emojiList");

fetch("https://emoji-api.com/emojis?access_key=68d9debb15e652dd872a6182de1c93a3d277de62")
    .then(res => res.json())
    .then(data => loadEmoji(data))

const addCollectionLeft = document.querySelector(".add-collection-left");
const dropdownColorsEmojis = document.querySelector(".dropdown-colors-emojis");

function loadEmoji(data) {
    data.forEach(emoji => {
        let li = document.createElement("li");
        li.setAttribute("emoji-name", emoji.slug);
        li.textContent = emoji.character;
        emojiList.appendChild(li);

// add collection

    // const btnAddCollection = document.getElementById("btn-add-collection");

    /*btnAddCollection.addEventListener("click", () => {
    popUpNewCollection.classList.toggle("displayToggle");

    // 
    let nameInput = document.getElementById("inputCollection");
    let collectionDiv = document.querySelector(".collection");

    let containerDiv = document.createElement("div");
        
        const collection = `
        <div class="collection">
        <div class="collection-left">
                <img src="images/home-icon.png">
                <p>${nameInput.value}</p>
            </div>
            <div class="collection-right">
                <img src="images/settings-icon.png">
                <p class="todo-counter">12</p>
        </div>
        </div>
        `
        containerDiv.innerHTML = collection;

        // collectionDiv.innerHTML = collection;

        //containerDiv = collection.innerHTML;

        collectionDiv.parentNode.insertBefore(containerDiv, collectionDiv);



    }) */

// add emoji to dropdown
        li.addEventListener("click", () => {
            if(emojiCopyCounter === 1){
                return;
            }

            emojiCopyCounter++;

            const selectedEmoji = li;
            emojiCopy = selectedEmoji.cloneNode(true);
            dropdownColorsEmojis.appendChild(emojiCopy);
            backgroundColorDropdown.classList.toggle("backgroundColor-add-spacing");

            })     

    })
}






const searchEmojisColors = document.getElementById("search-emojis-colors");

searchEmojisColors.addEventListener("keyup", e => {

    let value = e.target.value;
    let emojis = document.querySelectorAll("#emojiList li");
    emojis.forEach(emoji => {
       /* emoji.addEventListener("click", () => {

            const allEmojis = emojiList.children;
    
            const selectedEmoji = allEmojis[1];
            console.log(selectedEmoji);
    
        }) */

        if(emoji.getAttribute("emoji-name").toLowerCase().includes(value)) {
            emoji.style.display = "grid";
        } else {
            emoji.style.display = "none";
        }
    })
})




function deleteIcon(containerDiv){
    containerDiv.classList.toggle("displayToggleNone");
}


// Add a collection

const btnAddCollection = document.getElementById("btn-add-collection");

let deleteIcons = document.querySelectorAll(".delete-icon");


btnAddCollection.addEventListener("click", () => {

    

    popUpNewCollection.classList.toggle("displayToggle");


// Wichtiges container Element
    let containerDiv = document.createElement("div");
    containerDiv.classList.add('collectionClass');

    let nameInput = document.getElementById("inputCollection");
    let collectionDiv = document.querySelector(".collection");
    let addCollectionDiv = document.querySelector(".add-collection");


// PREVENT XSS -> CROSS SITE SCRIPTING
    const escape = (str) => {
        return str.replace(/['"<>&]/g, (str) => {
            switch (str) {
                case '\'':
                    return '&#039;';
                case '"':
                    return '&quot;';
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '&':
                    return '&amp;';
            }
        })
    }
        const collection = `
        <div class="collection">
            <div class="collection-left">
                    <img src="images/home-icon.png" id="home-icon">
                    <p>${escape(nameInput.value)}</p>
                </div>
                <div class="collection-right">
                    <button type="button" class="delete-icon" onclick="deleteIcon(containerDiv);"><img src="images/settings-icon.png"></button>
                    <p class="todo-counter">12</p>
            </div>
        </div>
        `
// XSS -> CROSS SITE SCRIPTING
// containerDiv.innerHTML = collection;

            containerDiv.innerHTML = collection;
            collectionDiv.parentNode.insertBefore(containerDiv, addCollectionDiv);

            /* containerDiv.addEventListener("click", () => {
                deleteIcon(containerDiv);
            }) */

            
            deleteIcons.forEach(deleteIconElement => {
                deleteIconElement.addEventListener("click", () => {
                        deleteIcon(containerDiv);
                })
            })
})

// Delete later defined ToDos
//function deleteIcon() {
    /* deleteIcons.forEach(deleteIcon => {
        deleteIcon.addEventListener("click", () => {
            // containerDiv.classList.toggle("displayToggleNone");
            console.log("clickIcon");
        })
    }) */

    //console.log("clickIcon");
    //containerDiv.classList.toggle("displayToggleNone");
//}


// Delete already defined ToDos

deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener("click", () => {
        let collectionDiv = document.querySelector(".collection");

        collectionDiv.classList.toggle("displayToggleNone"); 
    })
})



