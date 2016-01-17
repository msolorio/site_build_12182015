//DEFINE FUNCTIONS
function slideshow() {
    $('.slideshow-img').slice(1).hide();
    setInterval(function() {
        $('.slideshow-img').first().fadeOut(2500)
            .next().fadeIn(2500)
            .end()
            .appendTo('.slideshow-container');
    }, 8000); //end set interval
} //end function define

function setCenterButtons() {
    $('.center-button-container').css('opacity', 0);
    $('.center-button-container').delay(400).animate({
            top: '+=23px',
            opacity: 1
        },
        1200
    );
}

var vacations = {
    init: function() {
        $('.num-of-nights').keyup(this.updateTotal);
        $('.vacation-view-comments').click(this.toggleComments);
    },
    updateTotal: function() {
        var thisVacation = $(this).closest('.vacation-container');

        //fetch price per ticket
        var price = +thisVacation.data('price');

        //fetch number of nights entered
        var numOfNights = +$(this).val();

        //calculate total
        var total = price * numOfNights;
        total = total.toFixed(2);

        //update total
        thisVacation.find('.total').html(total);
    },
    toggleComments: function() {
        //find the active comment
        var activeComments = $('.comments.active');

        //find clicked comments section
        var thisComments = $(this).closest('.vacation-container').find('.comments');

        function showNextComments() {
            thisComments.slideDown(200, function() {
                thisComments.addClass('active');
            });
        }

        if (activeComments.length) {

            //grab the location of comment clicked
            var activeComLoc = activeComments.data('package');
            var nextComLoc = thisComments.data('package');
            activeComments.slideUp(200, function() {
                activeComments.removeClass('active');

                //check if same comment is clicked twice
                //only show if it is a difference comment section
                if (activeComLoc !== nextComLoc) {
                    showNextComments();
                }
            });
        } else {
            showNextComments();
        }
    }
};

//READY EXPRESSION
$(function() {
    slideshow();
    setCenterButtons();
    vacations.init();
});
