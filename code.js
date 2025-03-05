const bookmarksContainer = document.getElementById("mainContainer");
const bookList = document.getElementById("bookList");
const bookUrlFor = document.getElementById("bookUrlFor");
const urlRegex = new RegExp(
  "^(?:https?://)?(?:www\\.)?((?:[a-z\\d](?:[a-z\\d-]*[a-z\\d])?\\.)+[a-z]{2,6}|(?:\\d{1,3}\\.){3}\\d{1,3})?(?::(\\d{1,5}))?(?:/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$"
);

function renderBookmarks() {
  const getData = localStorage.getItem("storageObjectOfMyApp");
 let parsData = getData ? JSON.parse(getData) : [];

  
  bookList.innerHTML = "";

  for (let i = 0; parsData.length > i; i++) {
    let element = parsData[i];
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const deleteButton = document.createElement("button");
    const match = element.url.match(urlRegex);

    a.href = element.url;
    p.textContent = element.nameBook ? element.nameBook : match[1];
    a.target = "_blank";

    img.src = "https://" + match[1] + "/favicon.ico";
    img.alt = "";

    li.className = "bookLi";

    deleteButton.className = "delButton";
    deleteButton.textContent = "X";

    deleteButton.value = i;

    a.appendChild(img);
    a.appendChild(p);
    li.appendChild(a);
    li.appendChild(deleteButton);
    bookList.appendChild(li);
  }
}

function addBookmark() {
  let bookUrl = document.getElementById("bookUrl").value;

  let bookName = document.getElementById("bookName").value;

  if (urlRegex.test(bookUrl) && bookUrl !== "") {
    const bookData = { url: bookUrl, nameBook: bookName };
    const getData = localStorage.getItem("storageObjectOfMyApp");
    let parsData = getData ? JSON.parse(getData) : [];
    parsData.push(bookData);
    localStorage.setItem("storageObjectOfMyApp", JSON.stringify(parsData));

    renderBookmarks();
  } else {
    bookUrlFor.innerText = "Not the URL";
    bookUrlFor.style.color = "red";
    setTimeout(() => {
      bookUrlFor.innerText = "";
    }, 3000);
  }
  document.getElementById("bookUrl").value = "";
  document.getElementById("bookName").value = "";
}

var data = {};
for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  data[key] = localStorage.getItem(key);
}
console.log(data);

const createBookmarkButton = document.getElementById("buttonCreateBookmark");
createBookmarkButton.addEventListener("click", () => {
  addBookmark();
});

renderBookmarks();

const deleteOllButton = document.getElementById("buttonDeleteOll");
deleteOllButton.addEventListener("click", () => {
  localStorage.setItem("storageObjectOfMyApp", JSON.stringify([]));
  renderBookmarks();
});

const delButton = document.querySelectorAll(".delButton");

bookmarksContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("delButton")) {
    const getData = localStorage.getItem("storageObjectOfMyApp");
    let parsData = getData ? JSON.parse(getData) : [];
    const index = event.target.value;
    parsData.splice(index, 1);

    localStorage.setItem("storageObjectOfMyApp", JSON.stringify(parsData));
    renderBookmarks();
  }
});

const backgroundDiv = document.getElementById("backgrownd");
function getRandom(max) {
  return Math.floor(Math.random() * max);
}
function setDrop() {
  const dropContainer = document.createElement("div");
  dropContainer.className = "matrix_drop";
  dropContainer.style.left = getRandom(backgroundDiv.clientWidth - 20) + "px";

  dropContainer.style.top = getRandom(backgroundDiv.clientHeight - 20) + "px";
  const numberOfDrops = Math.floor(Math.random() * 12) + 4;
  for (let i = 1; i < numberOfDrops; i++) {
    const drop = document.createElement("p");
    drop.className = "drop";
    drop.style.animationDelay = i * 250 + "ms";
    if (Math.random() < 0.5) {
      drop.innerText = "0";
    } else {
      drop.innerText = "1";
    }
    dropContainer.appendChild(drop);
  }
  backgroundDiv.appendChild(dropContainer);
  setTimeout(() => {
    dropContainer.remove();
  }, 8000);
}

setInterval(setDrop, 250);
