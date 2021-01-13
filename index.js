var counter = document.querySelector('.counter-zone');
var my = document.querySelector('.my-zone');
var stage = document.querySelector('.stage');
var heroWrap = document.querySelector('.hero-wrap');
var counterWrap = document.querySelector('.soldier-wrap');
var counterHeroArr = [];
var myHeroArr=[];
var counterArr=[];
var myArr=[];
var hero=true;
var cardInform;


function Card (){
  
        this.hp = Math.ceil(Math.random()*5);
        this.att = Math.ceil(Math.random()*10);
        this.cost = Math.floor((this.hp + this.att)/2);
        return;
    }
    
function Herocard (){
    this.hero = true;
    this.hp = Math.ceil(Math.random()*10);
    this.att = Math.ceil(Math.random()*5);
    this.cost = Math.floor((this.hp + this.att)/2);
    return;
}

function cardMaking(a,arr,team,wrap,hero){
    for(i=0;i<a;i++){
        if(hero){
            cardInform = new Herocard(); 
            console.log(cardInform)
        }else{
            cardInform = new Card();
        }
        
        console.log(cardInform);
        arr.push(cardInform);
        var card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML=''+
        '<div class="img-wrap">'+
            '<img src="" alt="">'+
            '<p class="cost">'+ cardInform.cost+'</p>'+
        '</div>'+
        '<div class="stat">'+
            '<p class="hp">'+ cardInform.hp +'</p>'+
            '<p class="att">'+ cardInform.att+'</p>'+
        '</div>'
        
        team.querySelector(wrap).appendChild(card);
    }
    
}



function init(){
    cardMaking(1,counterHeroArr,counter,'.hero-wrap',hero);
    cardMaking(1,myHeroArr,my,'.hero-wrap',hero);
    cardMaking(5,counterArr,counter,'.deck');
    cardMaking(5,myArr,my,'.deck');
}

init();