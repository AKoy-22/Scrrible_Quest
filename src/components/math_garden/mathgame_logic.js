var answer; 
var score;

function newQuestion(){
    const NUM1 = Math.round(Math.random() * 5);
    document.getElementById('n1').innerHTML = NUM1; 

    const NUM2 = Math.round(Math.random() * 5);
    document.getElementById('n2').innerHTML = NUM2; 
    answer = NUM1 + NUM2;
}

function verifyAnswer(){
    const prediction = predictNumber();

    //console.log("check answer "+prediction);

    if(prediction == answer){
        score ++;
        console.log("correct !");
       // document.body.style.backgroundImage = "url('images/PXL_20220105_234828029.jpg')";
    }else{
        if(score !=0) {score--};
        console.log("wrong ");
    }
}