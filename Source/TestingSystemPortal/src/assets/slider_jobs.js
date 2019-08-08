$(document).ready(function() {
  var isSliding = false;

  $('.slider-jobs')
    .on('init', function() {
      addSliderClickEventListener();
    })
    .slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      nextArrow: '<span class="slick-arrow slick-next fa fa-angle-right"></span>',
      prevArrow: '<span class="slick-arrow slick-prev fa fa-angle-left"></span>',
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          rows: 2,
          slidesPerRow: 1,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 576,
        settings: {
          rows: 2,
          slidesPerRow: 1,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }]
    })
    .on('breakpoint', function() {
      addSliderClickEventListener();
    })
    .on('beforeChange', function() {
      isSliding = true;
    })
    .on('afterChange', function() {
      isSliding = false
    });

  function addSliderClickEventListener() {
    $('.slide-item input[type=checkbox]').on('click', function(e) {
      e.stopPropagation();
    });

    $('.slide-item').on('click', function(e) {
      if (isSliding) {
        return;
      }

      $(this)
        .toggleClass('slide-item-selected')
        .find('input[type=checkbox]')
        .each(function() {
          $(this).trigger('click');
        });
    });
  }
});
