document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("newsForm");
  var btn = document.getElementById("openNewsFormBtn");
  var span = document.getElementsByClassName("closeBtn")[0];

  if (btn) {
    btn.onclick = function () {
      form.style.display = "block";
    };
  }

  if (span) {
    span.onclick = function () {
      form.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target == form) {
      form.style.display = "none";
    }
  };

  var newsForm = document.getElementById("newsForm");
  if (newsForm) {
    newsForm.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Form submitted");
    
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../../../app/controller/NewsController.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        xhr.onload = function () {
            console.log("Response from PHP:", this.responseText);
        };
    
        xhr.onerror = function () {
            console.log("Request error:", xhr.status, xhr.statusText);
        };
    
        var formData = new FormData(this); // 'this' refers to the form
        xhr.send(new URLSearchParams(formData).toString());
    });
    
  }
});

function updateNewsSection(newNews) {
  // Logic to update the news section of your page with newNews using DOM
}
