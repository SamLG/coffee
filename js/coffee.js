/**
 * This js file add functionality to coffe.samgrise.me for form validation,
 * interaction, and virtual-barrista
 *
 * @author Sam Grise
 * @version Last modified 11_18_16
**/
$(document).ready(function(){

    var sources = ["images/coffee1.jpg", "images/coffee2.jpg", "images/coffee3.jpg", "images/coffee4.jpg", "images/coffee5.jpg", "images/coffee6.jpg", "images/coffee7.jpg", "images/coffee8.jpg", "images/coffee9.jpg"];
    var color = ["black","#000066","#660000","#006600","#4d0066","#663300","#666600","#004d66","#006666"];
    var coffeeCount = 0;
    //alter image of coffee when hovered over
    $('#coffee-img').hover(function(){
        if (coffeeCount == (sources.length-1)) {
            coffeeCount = 0;
        }
        else {
            coffeeCount++;
        }
        $('#coffee-img').attr({
			'src': sources[coffeeCount]
		});
        $('p:first').css({
            color: color[Math.round(Math.random()*(color.length))]
        }); //end css
    //return state on hover off
    },function(){
        $('#coffee-img').attr({
            'src': sources[0]
        });
        $('p:first').css({
    		color: color[0]
    	}); //end css
    }); //end hover

    //create bouncing coffee beans on click, bounce is randomized, for more natural effect
    $('h1').click(function(){
        // http://www.clipartpanda.com/clipart_images/coffee-bean-clip-art-20547903
        $('h1').append('<img src="images/coffee-bean.png" alt="coffee bean">');
        // i < 100 gets the bean off the screen
        for (i=0; i < 100; i++){
            var jump = Math.round(Math.random()*40);
            var jumpPos = '+='.concat(String(jump)).concat('px');
            var jumpNeg = '-='.concat(String(jump)).concat('px');
            $('header img').animate({
                bottom: jumpPos,
                left: jumpPos
            }, 100, function() {
                // Animation complete jump up.
            })
            .animate({
                    bottom: jumpNeg,
                    left: jumpPos
                }, 100, function() {
                // Animation complete jump down.
            });
        }
        /* I wanted to remove the beans when they were off the page... but I
         couldn't get this to work, adding the line below made all of the
         functioning of the bouncing beans not work */
        // $('header img:last-of-type').remove();
    });

    //check that all requried fields validate before submission and display error if necessary
    $('#submit-btn').click(function(submit){
        var nE = nameError();
        var pE = phoneError();
        var eE = emailError();
        var zE = zipcodeError();
        if (!nE || !pE || !eE || !zE){
            $('#submit-msg').html('Please Fill All Required Fields');
            submit.preventDefault();
        }
    }); //end click

    /**
     * This method will check to make sure name has length and display error if necessary
     *
     * @return  Returns boolean value
     */
    function nameError () {
        if ($('#name').val().length == 0){
            $('#name').attr({
                'placeholder': 'REQUIRED ex: Jane Doe'
            }).addClass('error');
            return false;
        }
        else {
            return true;
        }
    };

    /**
     * This method will check to make sure phone number is (xxx)xxx-xxxx and display error if necessary
     *
     * @return  Returns boolean value
     */
    function phoneError () {
        if (!$('#phone').val().match(/^\(\d{3}\)\d{3}-\d{4}$/g)){
            $('#phone').attr({
                'placeholder': 'REQUIRED ex: (123)456-7890'
            }).addClass('error');
            return false;
        }
        else {
            return true;
        }
    };

    /**
     * This method will check to make sure email is x@x.x and display error if necessary
     *
     * @return  Returns boolean value
     */
    function emailError () {
        if (!$('#email').val().match(/\S+\@\S+\.\S/g)){
            $('#email').attr({
                'placeholder': 'REQUIRED ex: example@site.com'
            }).addClass('error');
            return false;
        }
        else {
            return true;
        }
    };

    /**
     * This method will check to make sure zipcode is 5 digits and display error if necessary
     *
     * @return  Returns boolean value
     */
    function zipcodeError () {
        if (!$('#zipcode').val().match(/\d{5}/g)){
            $('#zipcode').attr({
                'placeholder': 'REQUIRED ex: 12345'
            }).addClass('error');
            return false;
        }
        else {
            return true;
        }
    };

    //validate name when user leaves input area
    $('#name').focusout(function(){
        nameError();
    }); //end focusout

    //on focus remove error styling and remove submit error message
    $('#name').focus(function(){
        $('#name').removeClass('error').attr({
            'placeholder': 'Jane Doe'
        });
        $('#submit-msg').html('');
    }); //end focus

    //validate phone when user leaves input area
    $('#phone').focusout(function(){
        phoneError();
    }); //end focusout

    //on focus remove error styling and remove submit error message
    $('#phone').focus(function(){
        $('#phone').removeClass('error').attr({
            'placeholder': '(123)456-7890'
        });
        $('#submit-msg').html('');
    }); //end focus

    //validate email when user leaves input area
    $('#email').focusout(function(){
        emailError();
    }); //end focusout

    //on focus remove error styling and remove submit error message
    $('#email').focus(function(){
        $('#email').removeClass('error').attr({
            'placeholder': 'example@site.com'
        });
        $('#submit-msg').html('');
    }); //end focus

    //validate zipcode when user leaves input area
    $('#zipcode').focusout(function(){
        zipcodeError();
    }); //end focusout

    //on focus remove error styling and remove submit error message
    $('#zipcode').focus(function(){
        $('#zipcode').removeClass('error').attr({
            'placeholder': '12345'
        });
        $('#submit-msg').html('');
    }); //end focus

      /****************************************************
       ***                                              ***
       ***               VIRTUAL-BARRISTA               ***
       ***              CANVAS FUNCTIONALITY            ***
       *** Rules: must pour espresso, then milk, then   ***
       *** foam.                                        ***
       ****************************************************/

    var espressoCount = 0; //keep track of shots of espresso
    var milkCount = 0;  //keep track of shots of milk
    var milkTypeColor = '#f2f2d9'; //keep track of chosen milk, intially whole milk
    var liquidLevel = 'none'; //keep track of volume to know where to draw foam
    var foamAdded = false; //know when foam was added
    var drink = "no name"; //keep track of drink name

    /**
     * This method will draw cup, saucer, and message and initialize values
     */
    function setStage () {
        $('canvas').clearCanvas(); //clear the canvas before drawing the stage
        $('canvas').drawRect({ //background color
            fillStyle: 'lightgrey',
            x: 250, y: 175,
            width: 500,
            height: 350
        })
        .drawText({ //text
            layer: true,
            fillStyle: 'black',
            strokeStyle: 'black',
            strokeWidth: 1,
            x: 250,
            y: 20,
            fontSize: '20px',
            fontFamily: 'Verdana, sans-serif',
            text: 'Make your ideal espresso-based drink',
        }) //end text
        .drawEllipse({ //cup saucer
            fillStyle: '#ffffff',
            strokeStyle: '#000000',
            strokeWidth: 1,
            x: 150, y: 300,
            width: 200, height: 80
        })
        .drawQuadratic({ //cup handle
          strokeStyle: '#000',
          strokeWidth: 1,
          x1: 232, y1: 200, // Start point
          cx1: 280, cy1: 230, // Control point
          x2: 210, y2: 250 // End point
        })
        .drawQuadratic({ //cup handle
          strokeStyle: '#000',
          strokeWidth: 1,
          x1: 232, y1: 196, // Start point
          cx1: 287, cy1: 232, // Control point
          x2: 210, y2: 254 // End point
        })
        .drawPath( { //cup
            strokeStyle: '#000000',
            strokeWidth: 1,
        	fillStyle: '#ffffff',
        	p1: {
        		type: 'line',
    			x1: 50, y1: 150,//tl
        		x2: 100, y2: 300,//bl
                x3: 200, y3: 300,//br
                x4: 250, y4: 150 //tr
            }
        });
    }; //end setStage
    setStage(); //must call the above method when the page loads

    /**
     * This method will draw a shot of liquid based on coordinates and color
     * from when the method is called
     *
     * I did have separate methods for espresso shots 1, 2, 3 and milk 1, 2
     * but realized it was repetitive... now there is just shot()
     * I did also try to see if there was a pattern in the coordinates to
     * reduce params, but it there weren't any significant differences to work
     * from
     *
     * @param color the color of the liquid
     * @param xOne top left x coordinate
     * @param xTwo bottom left x coordinate
     * @param xThree bottom right x coordinate
     * @param xFour top right x coordinate
     * @param yTop top y coordinate
     * @param yBottom bottom y coordinate
     */
    function shot (color, xOne, xTwo, xThree, xFour, yTop, yBottom) {
        $('canvas').drawPath( {
            fillStyle: color,
            p1: {
                type: 'line',
                x1: xOne, y1: yTop,//tl
                x2: xTwo, y2: yBottom,//bl
                x3: xThree, y3: yBottom,//br
                x4: xFour, y4: yTop //tr
            }
        })
    };
    /*  Values for espresso shot()
        espresso: '#331a00'
        oneEspressoShot 84 100 200 217 250 300
        twoEspressoShot 66 84 217 234 200 250
        threeEspressoShot 54 66 234 247 160 200
     */

    /*when the espresso button is clicked add espresso depending on how much
    espresso is already in cup, make sure that there is no foam or milk */
    $('#espresso-btn').click(function(){
        if (!foamAdded && milkCount == 0) {
            espressoCount++;
            if (espressoCount == 1) {
                shot('#331a00', 84, 100, 200, 217, 250, 300);
                liquidLevel = 'low';
            }
            else if (espressoCount == 2) {
                shot('#331a00', 66, 84, 217, 234, 200, 250);
                liquidLevel = 'middle';
            }
            else if (espressoCount == 3) {
                shot('#331a00', 54, 66, 234, 247, 160, 200);
                liquidLevel = 'top';
            }
            /*this means that the espressoCount is over 3... not currently allowed
             so  must decrement*/
            else {
                espressoCount--;
            }
            //for testing console.log("espressoCount:" + espressoCount);
        }
        //at every stage of drink mixing, must inform user of their drink choice
        whatDrink();
    });

    /*  Values for milk shot()
        milkType
        66 84 217 234 200 250
        54 66 234 247 160 200
     */

    /*when milk button is clicked a shot will be drawn so long as there is
      espresso already in the cup, the cup isn't full, and no foam has been
      added*/
    $('#milk p').click(function(){
        // if foam or no espresso then no milk
        if (!foamAdded && espressoCount > 0 && liquidLevel != 'top'){
            // for testing console.log('milk has been clicked');
            milkCount++;
            // espresso 1 milk 1 liquid level is in the middle
            if (espressoCount == 1 && milkCount == 1) {
                shot(milkType(), 66, 84, 217, 234, 200, 250);
                liquidLevel = 'middle';
                // inform user when change is made, what drink is
                whatDrink();
                // for testing console.log('inside oneshot');
            }
            // espresso 2 or espresso 1 milk 2 -> liquid top
            if (espressoCount == 2 || (espressoCount == 1 && milkCount == 2)){
                shot(milkType(), 54, 66, 234, 247, 160, 200);
                liquidLevel = 'top';
                // inform user when change is made, what drink is
                whatDrink();
                // for testing console.log('inside two shot espresso is 2');
            }
        }
        // for testing console.log("milkCount" + milkCount);
    });

    /**
     * This method will get from the select input what kind of milk the user
     * wants and return a corresponding color
     *
     * @return milkTypeColor the color of the chosen milk
     */
    function milkType (){
        var milkType = $('#milk-opt').val();
        // for testing console.log(milkType);
        switch (milkType) {
            case 'whole':
                milkTypeColor = '#f2f2d9';
                break;
            case '2%':
                milkTypeColor = '#f5f5ef';
                break;
            case 'soy':
                milkTypeColor = '#d9efc3';
                break;
            default:
                milkTypeColor = '#f2f2d9';
                break;
        }
        return milkTypeColor;
    }

    /**
     * This method will draw a shot of liquid based on coordinates and color
     * from when the method is called
     *
     * @param height the y coordinate of the bottom of the foam
     * @param diff the difference from x coordinates at top of cup
     *             to change the width of the foam
     */
    function drawFoam (height, diff) {
        $('canvas').drawQuadratic({ // first foam dollop
            strokeStyle: '#ffff99',
            strokeWidth: 2,
            fillStyle: '#f5f5ef',
            x1: 50 + diff, y1: height, // Start point
            cx1: 200, cy1: height-150, // Control point
            x2: 250 - diff, y2: height // End point
        })
        .drawQuadratic({ // second foam dollop
            strokeStyle: '#ffff99',
            strokeWidth: 2,
            fillStyle: '#f5f5ef',
            x1: 100, y1: height-50, // Start point
            cx1: 200, cy1: height-150, // Control point
            x2: 200, y2: height-50 // End point
        })
        .drawLine({ // outline for bottom of foam
            strokeStyle: '#ffff99',
            strokeWidth: 2,
            x1: 50 + diff, y1: height,
            x2: 250 - diff, y2: height
        });
    }

    /*determines the liquid level and corresponding position of the foam in the
    cup also sets the foamAdded value for the other methods*/
    function addFoam () {
        switch (liquidLevel) {
            case 'low':
                drawFoam(250, 34);
                foamAdded = true;
                // foam has been added, need to inform user of updated drink
                whatDrink();
                break;
            case 'middle':
                drawFoam(200, 17);
                foamAdded = true;
                // foam has been added, need to inform user of updated drink
                whatDrink();
                break;
            case 'top':
                drawFoam(160, 5);
                foamAdded = true;
                // foam has been added, need to inform user of updated drink
                whatDrink();
                break;
            default:
                foamAdded = false;
                break;
        }
    }
    /*when foam button clicked draws foam*/
    $('#foam-btn').click(function(){
        addFoam();
    });

    /**
     * This method will check the values of the various counts and foam to
     * determine if the combination correlates to any specific espresso drinks
     * then that result is written to the page. The drinks below are the only
     * drinks that correlated with the options of espresso, milk, foam...
     * Unless the combo fits one of the statements below, then the drink does
     * not have a common name and "no name" is written to the page
     */
    function whatDrink () {
        if (espressoCount == 1 && milkCount == 0 && !foamAdded) {
            drink = "espresso (30ml espresso) <br/>or ristretto (22ml concentrated espresso)";
        }
        else if (espressoCount == 1 && milkCount == 1 && foamAdded) {
            drink = "cappucino (60ml espresso | 60ml steamed milk | 60ml foam) <br/>or cafe latte (60ml espresso | 300ml steamed milk | 2ml foam)";
        }
        else if (espressoCount == 1 && milkCount == 2 && !foamAdded) {
            drink = "flat white (60ml espresso | 120ml steamed milk)";
        }
        else if (espressoCount == 2 && milkCount == 0 && !foamAdded){
            drink = "espresso doppio (60ml espresso)";
        }
        else if (espressoCount == 2 && milkCount == 0 && foamAdded){
            drink = "cafe cortado (60ml espresso | 30ml foam) <br/>or cafe macchiato (60ml espresso | dot of foam) <br/>or dry cappucino (60ml espresso | 120ml foam)";
        }
        else if (espressoCount == 2 && milkCount == 1 && !foamAdded) {
            drink = "cafe noisette (60ml espresso | 30ml hot milk)";
        }
        else if (espressoCount == 3 && milkCount == 0 && !foamAdded) {
            drink = "lungo (90ml less concentrated espresso)";
        }
        else {
            drink = "no name";
        }
        $('#virtual-barrista-intro p:last-of-type').html(drink);
    }

    // when the clear button is clicked the stage and vars are reset
    $('#clear-btn').click(function(){
        espressoCount = 0;
        milkCount = 0;
        milkTypeColor = '#f2f2d9';
        liquidLevel = 'none';
        foamAdded = false;
        $('#virtual-barrista-intro p:last-of-type').text('Your drink name will display here.');
        setStage();
    });

    /**
     * This method will check the values of the various counts and foam to
     * determine to redraw the drink that is on the page currently. This
     * is to address a jcanvas bug, in which when the Canvas is hovered off
     * of the image disappears. Multiple shots of one type of liquid are drawn
     * at once.
     */
    function redraw () {
        switch (espressoCount) {
            case 1:
            // for testing console.log("made it");
                shot('#331a00', 84, 100, 200, 217, 250, 300);
                if (milkCount == 1) {
                    shot(milkType(), 66, 84, 217, 234, 200, 250);
                }
                if (milkCount == 2) {
                    shot(milkType(), 54, 84, 217, 247, 160, 250);
                }
                break;
            case 2:
                shot('#331a00', 66, 100, 200, 234, 200, 300);
                if(milkCount == 1) {
                    shot(milkType(), 54, 66, 234, 247, 160, 200);
                }
                break;
            case 3:
                shot('#331a00', 54, 100, 200, 247, 160, 300);
                break;
            default:
                break;
        }
        if (foamAdded) {
            addFoam();
        }
    }
    /*I moved my original clear on click functionality all into setStage so I
    could address the jcanvas bug on hover off, in which all of my canvas but text
    was getting wiped*/
    $('canvas').hover(
        function() {
        },
        function() {
            setStage();
            redraw();
        }
    );

});//end doc ready
