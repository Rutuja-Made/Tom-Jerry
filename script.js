score=0;
highScore=12;
cross=true;

audio=new Audio('tom_and_jerry_theme.mp3');
audiogo=new Audio('losing-horn-313723.mp3');

document.addEventListener("keydown",function(){
    audio.play();

});


document.onkeydown=function(e){
    jerry=document.querySelector('.jerry');
    if(e.keyCode==38){
        jerry.classList.add('animateJerry');
        jerryX=parseInt(window.getComputedStyle(jerry,null).getPropertyValue('left'));
         function animate(){
                jerry.style.left=jerryX+250+"px";
         }
        setTimeout(()=>{
                jerry.classList.remove('animateJerry');
        },200); 
        if(jerryX<999){
            animate();
        }
        jerry.classList.add('animateJerry2');
        setTimeout(()=>{
            jerry.classList.remove('animateJerry2');
        },400);  
    }

    jerryX=parseInt(window.getComputedStyle(jerry,null).getPropertyValue('left'));
    if(jerryX<1190&&e.keyCode==39){
        jerry.style.left=jerryX+10+"px";
    }

    if(jerryX>6&&e.keyCode==37){
        jerry.style.left=(jerryX-10)+"px";
    }
}

let id = setInterval(()=>{

    tom=document.querySelector('.tom');
    jerry=document.querySelector('.jerry');

    jx=parseInt(window.getComputedStyle(jerry,null).getPropertyValue('left'));
    jy=parseInt(window.getComputedStyle(jerry,null).getPropertyValue('top'));
    tx=parseInt(window.getComputedStyle(tom,null).getPropertyValue('left'));
    ty=parseInt(window.getComputedStyle(tom,null).getPropertyValue('top'));
    
    offsetX=Math.abs(jx-tx);
    offsetY=Math.abs(jy-ty);
    // console.log(offsetX , offsetY);
    if(offsetX<100 && offsetY<73){
        tom.classList.remove('animateTom');
        audio.pause();
        audiogo.play();
        scoreCont.style.display='none';
        document.querySelector('.loose').style.display='block';
        document.querySelector('#score').innerHTML=score;
        highScore=Math.max(score,highScore);
        document.querySelector('#highscore').innerHTML=highScore;
        setTimeout(()=>{
            jerry.style.display='none';
            tom.classList.remove('tom');
            tom.classList.add('TomAndJerryAfterLoose');
            if(jx<999){
            tom.style.left=(jx)+"px";
            }else{
            tom.style.left=910+"px";
            }
            funAfterLoose();
        },5);
    } else if(offsetX<150&&cross){
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000);
       
        setTimeout(()=>{
            aniDur=parseFloat(window.getComputedStyle(tom,null).getPropertyValue('animation-duration'));
            newDur=aniDur-0.1;
            tom.style.animationDuration=newDur+'s';   
        },500);   
    }    
},10);   

function funAfterLoose(){
    console.log("called");
       clearInterval(id);
       gameOver=document.querySelector('.gameOver');
    
       setTimeout(()=>{
            tom.classList.remove('TomAndJerryAfterLoose');
            document.querySelector('.loose').style.display='none';
        },1999);

        setTimeout(()=>{
            gameOver.style.display='block';
        },2000);
        
        setTimeout(()=>{
            audio.play();
            audiogo.pause();
        },4000);
}

function updateScore(score){
    scoreCont.innerHTML="Your Score : " + score;
}