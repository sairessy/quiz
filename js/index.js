$(document).ready(()=> {
    $('#bar').click(()=> {
        $('#sidebar-container').show();
        $('#sidebar').animate({'left': '0'}, 300);
    });

    $('#sidebar-container').click((e)=> {
        if(e.target.id == 'sidebar-container') {
            $('#sidebar').animate({'left': '-80%'});
            setTimeout(() => {
                $('#sidebar-container').hide();
            }, 350);
        }
    });

    // Sounds
    let vol = 0.02;

    const sounds = {
        correct: new Audio('../assets/sound/correct.mp3'),
        wrong: new Audio('../assets/sound/wrong.mp3'),
        winner: new Audio('../assets/sound/winner.mp3')
    } 

    sounds.correct.volume = vol;
    sounds.wrong.volume = vol;
    sounds.winner.volume = vol;

    $("#volume input").on('change', ()=> {
        vol = ($("#volume input").val()*0.01).toFixed(2);
        sounds.correct.volume = vol;
        sounds.wrong.volume = vol;
        sounds.winner.volume = vol;
    });



    const player = new Player();    
    
    // App init
    let question = new Question(player);

    question.put();

    $('#sidebar ul li').click((e)=> {
        question.passed = [];
        question.player.points = 0;
        const cat = e.currentTarget.innerText;
        question.getCategory(cat);

        $('#sidebar').animate({'left': '-90%'});
        setTimeout(() => {
            $('#sidebar-container').hide();
        }, 350);
    });

    $(document).on('click', '#buttons button', (e)=> {
        $('#buttons button').attr("disabled", true);
        if(question.passed.length == question.questions.length) {
            // alert('Esta era a última questão, você venceu parabéns!');
            const answer = e.currentTarget.innerText.toLowerCase();
            const success = question.checkAnswer(answer);
            question.passed = [];
            question.player.points = 0;

            
            if(success) {
                sounds.winner.play();
            }

        } else {
            const answer = e.currentTarget.innerText.toLowerCase();
            const success = question.checkAnswer(answer);
            if(success) {
                question.player.points++;
                sounds.correct.play();
            } else {
                question.player.points = 0;
                sounds.wrong.play();
            }
        }

        const w = (100/question.questions.length)*question.player.points;

        $('.slider').css({'background-color': '#444'}); 
        
        if(w >= 50) {
            $('.slider').css({'background-color': 'yellow'}); 
        }

        if(w >= 70) {
            $('.slider').css({'background-color': 'greenyellow'}); 
        }

        if(w >= 90) {
            $('.slider').css({'background-color': 'green'}); 
        }

        $('.slider').animate({'width': `${w}%`});       
    });

});