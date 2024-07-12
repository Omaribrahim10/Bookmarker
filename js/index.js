var bookmarkName = document.getElementById("bookmarkName");
var websiteURL = document.getElementById("websiteURL");

var bookmarkList;
if (localStorage.getItem("bookmarkList") === null) {
  bookmarkList = [];
} else {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  displayBookmark(bookmarkList);
}
function CreateBookmark() {
  if (validateBookmarkName() === true && validatewebsiteURL() === true) {
    var bookmark = {
      name: bookmarkName.value,
      URL: "https://" + websiteURL.value,
    };
    bookmarkList.push(bookmark);
    displayBookmark(bookmarkList);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    clearForm();
  } else {
    // alert('invalid')
  }
}

function displayBookmark(list) {
  var bookmarkBox = "";
  for (var i = 0; i < list.length; i++) {
    bookmarkBox += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>

        <td><a class="btn btn-info" id="tableButton1" target="_blank" href="${
          list[i].URL
        }"><i class="fa-solid fa-eye me-2"></i>Visit</a>
        </td> 

        <td><button class="btn btn-danger" id="tableButton2" onclick='deleteBookmark(${i})'><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
        </tr>`;
  }
  document.getElementById("data").innerHTML = bookmarkBox;
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  displayBookmark(bookmarkList);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
}

function clearForm() {
  bookmarkName.value = "";
  websiteURL.value = "";
}

function validateBookmarkName() {

  var regex = /^[a-zA-Z]{3,20}$/;

  if (regex.test(bookmarkName.value)) { 
    bookmarkName.classList.replace("is-invalid","is-valid");
    document.getElementById("nameError").classList.replace("d-block", "d-none");
    
    return true;
  } else {
    bookmarkName.classList.add("is-invalid");
    document.getElementById("nameError").classList.replace("d-none", "d-block");
    return false;
  }
}
function validatewebsiteURL() {
  var regex = /^www\..+\.com$/;

  if (regex.test(websiteURL.value)) { 
    websiteURL.classList.replace("is-invalid","is-valid");
    document.getElementById("URLError").classList.replace("d-block", "d-none");
    
    return true;
  } else {
    websiteURL.classList.add("is-invalid");
    document.getElementById("URLError").classList.replace("d-none", "d-block");
    return false;
  }
}