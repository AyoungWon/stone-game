var counter = document.querySelector('.counter-zone');
var my = document.querySelector('.my-zone');
var stage = document.querySelector('.stage');
var heroWrap = document.querySelector('.hero-wrap');
//var counterWrap = document.querySelector('.soldier-wrap');
var counterHeroArr = [];
var myHeroArr = [];
var counterArr = [];
var myArr = [];
var mySoldierArr = [];
var counterSoldierArr = []
var hero;
var turn=true;


function deckClick(e) {



}

function Card(team, hero) {
    if (hero) {
        this.hero = true;
        this.hp = Math.ceil(Math.random() * 10);
        this.att = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.hp + this.att) / 2);
        this.team = team;
        return;
    } else {
        this.hp = Math.ceil(Math.random() * 5);
        this.att = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.hp + this.att) / 2);
        this.team = team;
        return;
    }
}

function cardMaking(data, team, wrap,arr,hero) {

    var card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = '' +
        '<div class="img-wrap">' +
        '<img src="" alt="">' +
        '<p class="cost">' + data.cost + '</p>' +
        '</div>' +
        '<div class="stat">' +
        '<p class="hp">' + data.hp + '</p>' +
        '<p class="att">' + data.att + '</p>' +
        '</div>'
        card.addEventListener('click',function(e){
            
            var idx = arr.indexOf(data);
            if(team === my){
                mySoldierArr.push(data);
                arr.splice(idx,1);
                team.querySelector(wrap).innerHTML='';
                team.querySelector('.soldier-wrap').innerHTML='';
                arr.forEach(function (data) {
                    cardMaking(data, team, wrap,arr);
                })
                mySoldierArr.forEach(function (data) {
                    cardMaking(data, team, '.soldier-wrap',arr);
                })  
            }else{
                counterSoldierArr.push(data);
                arr.splice(idx,1);
                team.querySelector(wrap).innerHTML='';
                team.querySelector('.soldier-wrap').innerHTML='';
                arr.forEach(function (data) {
                    cardMaking(data, team, wrap,arr);
                })
                counterSoldierArr.forEach(function (data) {
                    cardMaking(data, team, '.soldier-wrap',arr);
                })  
            }
            
            
        })
    team.querySelector(wrap).appendChild(card);

}


function counterHero(num, arr, team, wrap, hero) {
    var data = new Card(team, hero);
    cardMaking(data, team, wrap),hero;
}


function myHero(num, arr, team, wrap, hero) {
    var data = new Card(team, hero);
    cardMaking(data, team, wrap);
}

function counterDeck(num, arr, team, wrap, hero) {
    for (i = 0; i < num; i++) {
        var cardInform = new Card(team);
        arr.push(cardInform);
    }
    arr.forEach(function (data) {
        cardMaking(data, team, wrap,arr);
    })
}

function myDeck(num, arr, team, wrap, hero) {
    for (i = 0; i < num; i++) {
        var cardInform = new Card(team);
        arr.push(cardInform);
    }
    arr.forEach(function (data) {
        cardMaking(data, team, wrap,arr);
    })
}

function init() {
    counterHero(1, counterHeroArr, counter, '.hero-wrap', hero);
    myHero(1, myHeroArr, my, '.hero-wrap', hero);
    counterDeck(5, counterArr, counter, '.deck');
    myDeck(5, myArr, my, '.deck');
}

init();