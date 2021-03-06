//DEFINE FUNCTIONS
function slideshow() {
    $('.slideshow-img').slice(1).hide();
    setInterval(function() {
        $('.slideshow-img').first().fadeOut(2500)
            .next().fadeIn(2500)
            .end()
            .appendTo('.slideshow-container');
    }, 6000); //end set interval
} //end function define

function setCenterButtons() {
    $('.center-button-container').css('opacity', 0);
    $('.center-button-container').delay(600).animate({
            top: '+=23px',
            opacity: 1
        },
        1600
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
function bodyFadeIn(){
    $('body').fadeIn(700).removeClass('hidden');
}

function bordersAnimation(){
    var interval = setInterval(function(){

        if($('.divider2').visible(true)){
            var storyWrap = $('.section-story-border-wrap');
            var storyCol = $('.section-story-col');
            var storyHeight = storyWrap.height();
            storyWrap.height(storyHeight);
            storyCol.hide();
            storyWrap.css('margin', '8% 50%');
        }

        if ($('.effect-marker').visible(true)){
            
            storyWrap.animate({
                margin: '8% -5%'
            }, {
                duration: 700,
                specialEasing: 'easOutCirc'
            }).
            animate({
                margin:'8% 0%'
            }, 500, function(){
                storyCol.fadeIn(1200);
                storyWrap.height('initial');
            });
            

            clearInterval(interval);
        }
    });
}

//READY EXPRESSION
$(function() {
    slideshow();
    bodyFadeIn();
    setCenterButtons();
    vacations.init();
    bordersAnimation();
});
