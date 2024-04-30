document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("serialNumberForm");
  const loader = document.getElementById("loader");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      loader.style.display = "block";

      var xhr = new XMLHttpRequest();

      var url =
        "https://sea-turtle-app-g3i6y.ondigitalocean.app/en/core/generate_serial_number/";

      xhr.open("POST", url, true);

      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          loader.style.display = "none";

          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            document.querySelector("[name='count']").value = response.count;
            successMessage.style.display = "block";
            errorMessage.style.display = "none";
          } else {
            console.error("HTTP error", xhr.status);
            successMessage.style.display = "none";
            errorMessage.style.display = "block";
          }
        }
      };

      var formData = new FormData(form);

      xhr.send(new URLSearchParams(formData));
    } catch (error) {
      console.error("An error occurred:", error);
      successMessage.style.display = "none";
      errorMessage.style.display = "block";

      loader.style.display = "none";
    }
  });
});
