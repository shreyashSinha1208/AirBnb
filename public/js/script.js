(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    },
      false);
  });
})();


// document.addEventListener('DOMContentLoaded', function() {
//   var inputs = document.querySelectorAll('.search-inp');
//   inputs.forEach(function(input) {
//     input.addEventListener('focus', function() {
//       this.style.outline = 'none';
//     });
//     input.addEventListener('blur', function() {
//       this.style.outline = ''; // Restore default outline on blur
//     });
//   });
// });

const filtersDiv = document.getElementById('filters');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down, decrease height
    filtersDiv.style.height = '90px'; // Adjust this value as needed
  } else {
    // Scrolling up, increase height
    filtersDiv.style.height = '120px'; // Adjust this value as needed
  }
});


// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");
// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



// Function to add 'hide' class after 3 seconds
function hideAlert(alertElement) {
  setTimeout(function () {
    alertElement.classList.add('hide');
  }, 2000);
}
// Find the alert element and add the 'hide' class after 3 seconds
var alertElement = document.querySelector('.alert');
if (alertElement) {
  hideAlert(alertElement);
}


