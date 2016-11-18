$(document).ready(function(){

    //alter image of coffee when hovered over
    var sources = ["images/coffee1.jpg", "images/coffee2.jpg", "images/coffee3.jpg", "images/coffee4.jpg", "images/coffee5.jpg", "images/coffee6.jpg", "images/coffee7.jpg", "images/coffee8.jpg", "images/coffee9.jpg"];
    var color = ["black","#000066","#660000","#006600","#4d0066","#663300","#666600","#004d66","#006666"];
    var coffeeCount = 0;
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
    },function(){
        $('#coffee-img').attr({
            'src': sources[0]
        });
        $('p:first').css({
    		color: color[0]
    	}); //end css
    }); //end hover

    $('h1').click(function(){
        // http://www.clipartpanda.com/clipart_images/coffee-bean-clip-art-20547903
        $('h1').append('<img src="images/coffee-bean-nb.png" alt="coffee bean">');
        for (i=0; i < 100; i++){
            var jump = Math.round(Math.random()*40);
            var jumpPos = '+='.concat(String(jump)).concat('px');
            var jumpNeg = '-='.concat(String(jump)).concat('px');
            $('header img').animate({
                bottom: jumpPos,
                left: jumpPos
            }, 100, function() {
                // Animation complete.
            })
            .animate({
                    bottom: jumpNeg,
                    left: jumpPos
                }, 100, function() {
                // Animation complete.
            });
        }
        /* I wanted to remove the beans when they were off the page... but I
         couldn't get this to work, adding the line below made all of the
         functioning of the bouncing beans not work */
        // $('header img:last-of-type').remove();
    });

    var submitNoError = true;
    $('#submit-btn').click(function(submit){
        var nE = nameError();
        var pE = phoneError();
        var eE = emailError();
        var zE = zipcodeError();
        if (!nE || !pE || !eE || !zE){
            $('#submit-msg').html('Please Fill All Required Fields');
            submitNoError = true;
            submit.preventDefault();
        }
    }); //end click

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
    function emailError () {
        if (!$('#email').val().match(/\S+\@\S+\S/g)){
            $('#email').attr({
                'placeholder': 'REQUIRED ex: example@site.com'
            }).addClass('error');
            return false;
        }
        else {
            return true;
        }
    };
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
    $('#name').focusout(function(){
        nameError();
    }); //end focusout
    $('#name').focus(function(){
        $('#name').removeClass('error').attr({
            'placeholder': 'Jane Doe'
        });
        $('#submit-msg').html('');
    }); //end focus
    $('#phone').focusout(function(){
        phoneError();
    }); //end focusout
    $('#phone').focus(function(){
        $('#phone').removeClass('error').attr({
            'placeholder': '(123)456-7890'
        });
        $('#submit-msg').html('');
    }); //end focus
    $('#email').focusout(function(){
        emailError();
    }); //end focusout
    $('#email').focus(function(){
        $('#email').removeClass('error').attr({
            'placeholder': 'example@site.com'
        });
        $('#submit-msg').html('');
    }); //end focus
    $('#zipcode').focusout(function(){
        zipcodeError();
    }); //end focusout
    $('#zipcode').focus(function(){
        $('#zipcode').removeClass('error').attr({
            'placeholder': '12345'
        });
        $('#submit-msg').html('');
    }); //end focus

    // ***CANVAS FUNCTIONALITY***

    // draw cup, saucer, and message
    function setStage () {
        $('canvas').drawRect({
            fillStyle: 'lightgrey',
            x: 250, y: 200,
            width: 500,
            height: 400
        })
        .drawText({
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
        .drawEllipse({
            fillStyle: '#ffffff',
            strokeStyle: '#000000',
            strokeWidth: 1,
            x: 150, y: 350,
            width: 200, height: 80
        })
        .drawQuadratic({
          strokeStyle: '#000',
          strokeWidth: 1,
          x1: 232, y1: 250, // Start point
          cx1: 280, cy1: 280, // Control point
          x2: 210, y2: 300 // End point
        })
        .drawQuadratic({
          strokeStyle: '#000',
          strokeWidth: 1,
          x1: 232, y1: 246, // Start point
          cx1: 287, cy1: 282, // Control point
          x2: 210, y2: 304 // End point
        })
        .drawPath( {
            strokeStyle: '#000000',
            strokeWidth: 1,
        	fillStyle: '#ffffff',
        	p1: {
        		type: 'line',
    			x1: 50, y1: 200,//tl
        		x2: 100, y2: 350,//bl
                x3: 200, y3: 350,//br
                x4: 250, y4: 200 //tr
            }
        });
    }; //end setStage
    setStage();

    function oneEspressoShot () {
        $('canvas').drawPath( {
            fillStyle: '#331a00',
            p1: {
                type: 'line',
                x1: 84, y1: 300,//tl
                x2: 100, y2: 350,//bl
                x3: 200, y3: 350,//br
                x4: 217, y4: 300 //tr
            }
        })
    };

    function twoEspressoShot () {
        $('canvas').drawPath( {
        	fillStyle: '#331a00',
        	p1: {
        		type: 'line',
    			x1: 66, y1: 250,//tl
        		x2: 84, y2: 300,//bl
                x3: 217, y3: 300,//br
                x4: 234, y4: 250 //tr
            }
        })
    };

    function threeEspressoShot () {
        $('canvas').drawPath( {
        	fillStyle: '#331a00',
        	p1: {
        		type: 'line',
    			x1: 54, y1: 210,//tl
        		x2: 66, y2: 250,//bl
                x3: 234, y3: 250,//br
                x4: 247, y4: 210 //tr
            }
        })
    };

    var espressoCount = 0;
    var milkCount = 0;
    var milkTypeColor = '#f2f2d9';

    $('#espresso-btn').click(function(){
        espressoCount++;
        if (espressoCount == 1 && milkCount == 0) {
            oneEspressoShot();
        }
        else if (espressoCount == 2 && milkCount == 0) {
            twoEspressoShot();
        }
        else if (espressoCount == 3 && milkCount == 0) {
            threeEspressoShot();
            // espressoCount--;
        }
        else {
            espressoCount--;
        }
        console.log("espressoCount:" + espressoCount);
    });

    function oneMilkShot (milkType) {
        $('canvas').drawPath( {
        	fillStyle: milkType,
        	p1: {
        		type: 'line',
    			x1: 66, y1: 250,//tl
        		x2: 84, y2: 300,//bl
                x3: 217, y3: 300,//br
                x4: 234, y4: 250 //tr
            }
        })
    };
    function twoMilkShot (milkType) {
        $('canvas').drawPath( {
        	fillStyle: milkType,
        	p1: {
        		type: 'line',
    			x1: 54, y1: 210,//tl
        		x2: 66, y2: 250,//bl
                x3: 234, y3: 250,//br
                x4: 247, y4: 210 //tr
            }
        })
    };

    $('#milk').click(function(){
        console.log('milk has been clicked');
        milkCount++;
        if (espressoCount == 1 && milkCount == 1) {
            oneMilkShot(milkType());
            console.log('inside oneshot');
        }
        else if (espressoCount == 2 || (espressoCount == 1 && milkCount == 2)) {
            twoMilkShot(milkType());
            console.log('inside two shot');
            milkCount = 2;
        }
        else if (espressoCount == 0){
            milkCount = 0;
            //no can do, submit message "pour your espresso first"
        }
        else {
            //no can do, submit message "your cup is either full, or there is no espresso,
            milkCount = 2;
        }
        // console.log("milkCount" + milkCount);
    });

    function milkType (){
        var milkType = $('#milk-opt').val();
        console.log(milkType);
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
    $('#clear-btn').click(function(){
        $('canvas').clearCanvas();
        setStage();
        espressoCount = 0;
        milkCount = 0;
    });

});//end doc ready
