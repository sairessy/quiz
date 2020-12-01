class Question {
    constructor(player) {
        this.questions = this.getAll();
        this.passed = [];
        this.player = player;
    }

    getAll() {
        let qs;
        $.ajax({
            url: 'js/json/questions.json',
            method: 'GET',
            async: false,
            data: {},
            success: (data)=> {
                qs = data;
            }
        });

        return qs;
    }

    getCategory(cat) {
        let qs = [];
        $.ajax({
            url: 'js/json/questions.json',
            method: 'GET',
            async: false,
            data: {},
            success: (data)=> {
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    if(element.type.includes(cat.toLowerCase())) {
                        qs.push(element);
                    }   
                }
            }
        });

        if(qs.length > 0) {
            this.questions = qs;
            this.player.points = 0;
            this.passed = [];
            $('.slider').animate({'width': '0'});  
            this.put();
        }
    }

    put() {
        
        this.q = Math.round(Math.random()*(this.questions.length-1));

        while (this.passed.includes(this.q)) {
            this.q = Math.round(Math.random()*(this.questions.length-1));
        }

        this.passed.push(this.q);

        // console.log(this.passed);
       
        $('#questions-answers p').text(this.questions[this.q].question);

        const qs = [];

        while(qs.length < 5) {
            const j = Math.round(Math.random()*4);
            if(!qs.includes(j)) {
                qs.push(j);
                // console.log(qs);
            }    
        }
 
        $('#buttons').html('');

        qs.forEach(e=> {
            $('#buttons').append(`<button id="btn-${e}"></button>`);
            $(`#buttons #btn-${e}`).text(this.questions[this.q].options[e]);
        });
    }

    checkAnswer(answer) {
        if(answer == this.questions[this.q].answer.toLowerCase()) {
            for (let i = 0; i < 5; i++) {
                const txt = $(`#buttons #btn-${i}`).text().toLowerCase();
                if(txt == this.questions[this.q].answer.toLowerCase()) {
                    $(`#buttons #btn-${i}`).css({'background-color': '#2bccb1', 'color': '#fff'});
                  
                    setTimeout(() => {
                        $('#buttons button').css({'background-color': '#311B92', 'color': '#fff'});
                        $('#buttons button').attr("disabled", false);
                        this.put();
                    }, 500); 
                  
                    break;
                } 
            }
            
        } else {
            for (let i = 0; i < 5; i++) {
                const txt = $(`#buttons #btn-${i}`).text().toLowerCase();
                if(txt == this.questions[this.q].answer.toLowerCase()) {
                    $(`#buttons #btn-${i}`).css({'background-color': '#2bccb1', 'color': '#fff'});
                    break;
                } 
            }

            for (let i = 0; i < 5; i++) {
                const txt = $(`#buttons #btn-${i}`).text().toLowerCase();
                if(txt == answer) {
                    $(`#buttons #btn-${i}`).css({'background-color': '#FF5252', 'color': '#fff'});
                    setTimeout(() => {
                        $('#buttons button').css({'background-color': '#311B92', 'color': '#fff'});
                        $('#buttons button').attr("disabled", false);
                        this.put();
                    }, 2000);

                    break;
                }
            }   

            this.passed = [];
            
        }

        return (answer == this.questions[this.q].answer.toLowerCase());
    }
}