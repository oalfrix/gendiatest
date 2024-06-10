//=====================Count Script==========================
var counters = document.querySelectorAll('.counter');
var speed = 500; // The lower the number, the faster the count

counters.forEach(counter => {
  var updateCount = () => {
    var target = +counter.getAttribute('data-count');
    var count = +counter.innerText;

    var inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});



//========================Move Up Btn=============================
document.addEventListener("DOMContentLoaded", function () {
    var scrollToTopButton = document.getElementById("scrollToTop");

    // Initially hide the scroll-to-top button
    scrollToTopButton.style.opacity = "0";
    scrollToTopButton.style.display = "none";

    // Smoothly show the scroll-to-top button when scrolling starts
    var isScrolling = false;

    window.addEventListener("scroll", function () {
        if (!isScrolling) {
            fadeIn(scrollToTopButton, 1500); // Adjust the duration (in milliseconds) for the fade-in animation
            isScrolling = true;
        }

        clearTimeout(isScrolling);
        isScrolling = setTimeout(function () {
            isScrolling = false;
        }, 200);
    });

    // Scroll to the top smoothly when the button is clicked
    scrollToTopButton.addEventListener("click", function () {
        scrollToTop(1000); // Adjust the duration (in milliseconds) to control the speed
    });

    // Function to fade in an element
    function fadeIn(element, duration) {
        var opacity = 0;
        var start = null;

        // Show the element
        element.style.display = "block";

        function fadeInAnimation(timestamp) {
            if (!start) start = timestamp;

            var progress = timestamp - start;
            opacity = Math.min(progress / duration, 1);

            element.style.opacity = opacity;

            if (progress < duration) {
                requestAnimationFrame(fadeInAnimation);
            }
        }

        requestAnimationFrame(fadeInAnimation);
    }

    // Function to scroll to the top smoothly
    function scrollToTop(duration) {
        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        function scroll() {
            const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
            const progress = Math.min(1, (currentTime - startTime) / duration);
            window.scroll(0, Math.ceil(easeInOut(progress) * (0 - start) + start));

            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        }

        function easeInOut(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(scroll);
    }
});


if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }
  



  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    showInstallPromotion();
  });
  
  buttonInstall.addEventListener('click', (e) => {
    // Hide the app provided install promotion
    hideInstallPromotion();
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
  