document.addEventListener('DOMContentLoaded', init);

const muscleGroup = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps"
    ];
const difficulty = [
    "beginner",
    "intermediate",
    "expert"
];
let exercise = [];

function init(){

    let workout1 = document.getElementById('workout1');
    muscleGroup.forEach((item) =>{
        const option = document.createElement('OPTION');
        option.value = item;
        option.innerText = item;
        workout1.appendChild(option);
    });
    let difficulty1 = document.getElementById('difficulty1');
    difficulty.forEach((item) =>{
        const option = document.createElement('OPTION');
        option.value = item.codePointAt;
        option.innerText = item;
        difficulty1.appendChild(option);
    });

    workout1.addEventListener('change',(e) => {
        const code = e.target.value;

        const url = 'https://api.api-ninjas.com/v1/exercises?muscle=' + code;
        
        fetch( url, {
        method: "GET",
        headers: {
            'X-Api-Key': 'IGWz0KSPZ9x79d4rDs6Phw==BPLz2nz7Uzilln0R'
        },
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
        })
        .then((response) => response.json())
        .then((data) => {
            exercise = data;

            exercise.forEach((item) =>{
  
                let workoutPrinted = `<section class="set ${item.difficulty}">
                                    <p>Workout: ${item.name}</p>
                                    <p>Type: ${item.type}</p>
                                    <p>Difficulty: ${item.difficulty}</p>
                                    <p>Instructions: ${item.instructions}</p>
                                    </section>`
                                    ;
        
                let workList = document.querySelector('.work-out-list');
                workList.innerHTML += workoutPrinted;

                const diffLabel = document.querySelector('#difficultyLabel');
                diffLabel.classList.remove("hide");

                const beg = document.querySelector('.beginner');
                const int = document.querySelector('.intermediate');
                const exp = document.querySelector('.expert ');

                difficulty1.addEventListener('change', (e) => {
                    const intensity = e.target.value;
                    console.log(intensity);

                    if(intensity === "beginner"){
                        int.classList('.hide');
                        exp.classList('.hide')
                    }
                    else if(intensity === "intermediate"){
                        beg.classList('.hide');
                        exp.classList('.hide')
                    }
                    else if (intensity === 'expert'){
                        beg.classList('.hide');
                        int.classList('.hide')
                    }
                });
            });
    })
    .catch((err) => console.log("Oops!", err));
    });

    //Clear Out For new Muscle Selection 
    const container = document.querySelector('.work-out-list');
    container.innerHTML = "";

}

