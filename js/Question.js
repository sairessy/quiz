class Question {
    constructor() {
        this.questions = this.getAll();
        this.passed = [];
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
            this.put();
        }
    }

    put() {
        
        this.q = Math.round(Math.random()*(this.questions.length-1));

        while (this.passed.includes(this.q)) {
            this.q = Math.round(Math.random()*(this.questions.length-1));
        }

        this.passed.push(this.q);

        console.log(this.passed);
       
        $('#questions-answers p').text(this.questions[this.q].question);

        for (let i = 0; i < 5; i++) {
            $(`#buttons #btn-${i}`).text(this.questions[this.q].options[i]);
        }   
    }

    checkAnswer(answer) {
        if(answer == this.questions[this.q].answer.toLowerCase()) {
            for (let i = 0; i < 5; i++) {
                const txt = $(`#buttons #btn-${i}`).text().toLowerCase();
                if(txt == this.questions[this.q].answer.toLowerCase()) {
                    $(`#buttons #btn-${i}`).css({'background-color': '#2bccb1'});
                  
                    setTimeout(() => {
                        $('#buttons button').css({'background-color': '#fff'});
                        this.put();
                    }, 500); 
                  
                    break;
                } 
            }
            
        } else {
            for (let i = 0; i < 5; i++) {
                const txt = $(`#buttons #btn-${i}`).text().toLowerCase();
                if(txt == this.questions[this.q].answer.toLowerCase()) {
                    $(`#buttons #btn-${i}`).css({'background-color': '#2bccb1'});
                    break;
                } 
            }

            for (let i = 0; i < 5; i++) {
                const txt = $(`#buttons #btn-${i}`).text().toLowerCase();
                if(txt == answer) {
                    $(`#buttons #btn-${i}`).css({'background-color': '#FF5252'});
                    setTimeout(() => {
                        $('#buttons button').css({'background-color': '#fff'});
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