// Copyright current year
var currentYear = new Date().getFullYear();
document.getElementById("current-year").innerHTML = currentYear;

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

// Hide #back-to-top first
$("#back-to-top").hide();

// Fade in #back-to-top
$(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
        $('#back-to-top').fadeIn(500);
    } else {
        $('#back-to-top').fadeOut(500);

    }
});

// Scroll to top
$('#back-to-top').click(function() {
    $('body,html').animate({scrollTop: 0}, 800);
    return false;
});

/************************ Lightbox ************************/
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');

// Add overlay
$overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
$("#gallery-page").append($overlay);

// Hide overlay on default
$overlay.hide();

// When an image is clicked
$("#image-gallery a").click(function(event) {
  event.preventDefault();
  var imageLocation = $(this).attr("href");
  $image.attr("src", imageLocation);
  $overlay.fadeIn("slow");
});

// When the overlay is clicked
$overlay.click(function() {
  $(this).fadeOut("slow");
});

// When next button is clicked
$nextButton.click(function(event) {
  $("#overlay img").hide();
  var $currentImgSrc = $("#overlay img").attr("src");
  var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
  var $nextImg = $($currentImg.closest("div").next().find("img"));
  var $images = $("#image-gallery img");
  if ($nextImg.length > 0) { 
    $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
  } else {
    $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
  }
  event.stopPropagation();
});

// When previous button is clicked
$prevButton.click(function(event) {
  $("#overlay img").hide();
  var $currentImgSrc = $("#overlay img").attr("src");
  var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
  var $nextImg = $($currentImg.closest("div.image").prev().find("img"));
  $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
  event.stopPropagation();
});

// When the exit button is clicked
$exitButton.click(function() {
  $("#overlay").fadeOut("slow");
});

/************************ Show More Image Gallery ************************/
// Show the first eight images
$("#image-gallery img:lt(8)").show();

// When the gallery button is clicked
$("#gallery-btn").on('click', function(event) {
  event.preventDefault();
  var $hidden = $("#image-gallery img:hidden");
  $($hidden).slice(0, 4).fadeIn(800);
});


// Map
function initMap() {
    var uluru = {lat: 34.0580942, lng: -84.3850274};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: uluru,
      scrollwheel: false,
      styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]
    });
    var image = {
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: '#A180AF',
        fillOpacity: 0.8,
        scale: 1,
        strokeColor: '',
        strokeWeight: 0
    };
    var newMarker = new google.maps.Marker({
        position: {lat: 34.0580942, lng: -84.3850274},
        map: map,
        icon: image
    });
}