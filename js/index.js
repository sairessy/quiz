$(document).ready(()=> {
    $('#cogs #close').click(()=> {
        $('#cogs').animate({'left': '-100%'});
    }); 

    $('#cog').click(()=> {
        $('#cogs').animate({'left': '0'});
    }); 

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

    

    
    let points = 0;

    // App init
    let question = new Question();

    question.put();

    $('#sidebar ul li').click((e)=> {
        question.passed = [];
        points = 0;
        $("#points").text(points);
        const cat = e.currentTarget.innerText;
        question.getCategory(cat);

        $('#sidebar').animate({'left': '-90%'});
        setTimeout(() => {
            $('#sidebar-container').hide();
        }, 350);
    });

    $('#buttons button').click((e)=> {
        if(question.passed.length >= question.questions.length) {
            alert('Esta era a última questão, você venceu parabéns!');
            question.passed = [];
            points = 0;
            $("#points").text(points);
            question.put();
        } else {
            const answer = e.currentTarget.innerText.toLowerCase();
            const success = question.checkAnswer(answer);
            if(success) {
                points++;
                $("#points").text(points);
            } else {
                points = 0;
                $("#points").text(points);
            }
        }
    });




});