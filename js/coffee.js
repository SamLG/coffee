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
        $('h1').append('<img src="images/coffee-bean.png" alt="coffee bean">');
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

    var espressoCount;
    var milkCount;
    var milkTypeColor;
    var liquidLevel;
    var foamAdded;
    // draw cup, saucer, and message
    function setStage () {
        $('#virtual-barrista-intro p:last-of-type').text('Your drink name will display here.');
        $('canvas').clearCanvas();
        espressoCount = 0;
        milkCount = 0;
        milkTypeColor = '#f2f2d9';
        liquidLevel = 'none';
        foamAdded = false;
        $('canvas').drawRect({
            fillStyle: 'lightgrey',
            x: 250, y: 175,
            width: 500,
            height: 350
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
            x: 150, y: 300,
            width: 200, height: 80
        })
        .drawQuadratic({
          strokeStyle: '#000',
          strokeWidth: 1,
          x1: 232, y1: 200, // Start point
          cx1: 280, cy1: 230, // Control point
          x2: 210, y2: 250 // End point
        })
        .drawQuadratic({
          strokeStyle: '#000',
          strokeWidth: 1,
          x1: 232, y1: 196, // Start point
          cx1: 287, cy1: 232, // Control point
          x2: 210, y2: 254 // End point
        })
        .drawPath( {
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
    setStage();

    function oneEspressoShot () {
        $('canvas').drawPath( {
            fillStyle: '#331a00',
            p1: {
                type: 'line',
                x1: 84, y1: 250,//tl
                x2: 100, y2: 300,//bl
                x3: 200, y3: 300,//br
                x4: 217, y4: 250 //tr
            }
        })
    };

    function twoEspressoShot () {
        $('canvas').drawPath( {
        	fillStyle: '#331a00',
        	p1: {
        		type: 'line',
    			x1: 66, y1: 200,//tl
        		x2: 84, y2: 250,//bl
                x3: 217, y3: 250,//br
                x4: 234, y4: 200 //tr
            }
        })
    };

    function threeEspressoShot () {
        $('canvas').drawPath( {
        	fillStyle: '#331a00',
        	p1: {
        		type: 'line',
    			x1: 54, y1: 160,//tl
        		x2: 66, y2: 200,//bl
                x3: 234, y3: 200,//br
                x4: 247, y4: 160 //tr
            }
        })
    };

    // var espressoCount = 0;
    // var milkCount = 0;
    // var milkTypeColor = '#f2f2d9';

    $('#espresso-btn').click(function(){
        if (!foamAdded && milkCount == 0) {
            espressoCount++;
            if (espressoCount == 1) {
                oneEspressoShot();
                liquidLevel = 'low';
            }
            else if (espressoCount == 2) {
                twoEspressoShot();
                liquidLevel = 'middle';
            }
            else if (espressoCount == 3) {
                threeEspressoShot();
                liquidLevel = 'top';
                // espressoCount--;
            }
            else {
                espressoCount--;
            }
            console.log("espressoCount:" + espressoCount);
        }
        whatDrink();
    });

    function oneMilkShot (milkType) {
        $('canvas').drawPath( {
        	fillStyle: milkType,
        	p1: {
        		type: 'line',
    			x1: 66, y1: 200,//tl
        		x2: 84, y2: 250,//bl
                x3: 217, y3: 250,//br
                x4: 234, y4: 200 //tr
            }
        })
    };
    function twoMilkShot (milkType) {
        $('canvas').drawPath( {
        	fillStyle: milkType,
        	p1: {
        		type: 'line',
    			x1: 54, y1: 160,//tl
        		x2: 66, y2: 200,//bl
                x3: 234, y3: 200,//br
                x4: 247, y4: 160 //tr
            }
        })
    };

    $('#milk p').click(function(){
        if (!foamAdded){
            console.log('milk has been clicked');
            milkCount++;
            if (espressoCount == 1 && milkCount == 1) {
                oneMilkShot(milkType());
                liquidLevel = 'middle';
                console.log('inside oneshot');
            }
            else if (espressoCount == 2){
                twoMilkShot(milkType());
                liquidLevel = 'top';
                console.log('inside two shot espresso is 2');
            }
            else if (espressoCount == 1 && milkCount == 2) {
                twoMilkShot(milkType());
                liquidLevel = 'top';
                console.log('inside two shot espresso is 1');
                // milkCount = 2;
            }
            else if (espressoCount == 0){
                milkCount = 0;
                //no can do, submit message "pour your espresso first"
            }
            else {
                //no can do, submit message "your cup is either full, or there is no espresso,
                milkCount = 2;
            }
            console.log("milkCount" + milkCount);
        }
        whatDrink();
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
    function drawFoam (height, diff) {
        $('canvas').drawQuadratic({
            strokeStyle: '#ffff99',
            strokeWidth: 2,
            fillStyle: '#f5f5ef',
            x1: 50 + diff, y1: height, // Start point
            cx1: 200, cy1: height-150, // Control point
            x2: 250 - diff, y2: height // End point
        })
        .drawQuadratic({
            strokeStyle: '#ffff99',
            strokeWidth: 2,
            fillStyle: '#f5f5ef',
            x1: 100, y1: height-50, // Start point
            cx1: 200, cy1: height-150, // Control point
            x2: 200, y2: height-50 // End point
        })
        .drawLine({
            strokeStyle: '#ffff99',
            strokeWidth: 2,
            x1: 50 + diff, y1: height,
            x2: 250 - diff, y2: height
        });
    }
    $('#foam-btn').click(function(){
        foamAdded = true;
        switch (liquidLevel) {
            case 'low':
                drawFoam(250, 34);
                break;
            case 'middle':
                drawFoam(200, 17);
                break;
            case 'top':
                drawFoam(160, 5);
                break;
            default:
                foamAdded = false;
                break;
        }
        whatDrink();
    });

    function whatDrink () {
        var drink = "no name";
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

        $('#virtual-barrista-intro p:last-of-type').html(drink);
    }

    $('#clear-btn').click(function(){
        setStage();
    });
    //I moved my original clear on click functionality all into setStage so I could address part of the jcanvas bug on hover, all of my canvas but text was getting wiped on hover off, so I at least have the cup and saucer drawn again
    $('canvas').hover(
        function() {
        },
        function() {
            setStage();
        }
    );

});//end doc ready
