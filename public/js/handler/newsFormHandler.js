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
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var title = document.getElementById('title').value;
      var content = document.getElementById('content').value;

      var newsItem = new News(title, content);
      newsItem.save();
    });



  }
});
