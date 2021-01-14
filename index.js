var counter = {
    zone:document.querySelector('.counter-zone'),
    cost:document.querySelector('.counter-zone').querySelector('.cost'),
    soldierArr:[],
    heroArr:[],
    deckarr:[],
}
var my = {
    zone:document.querySelector('.my-zone'),
    cost:document.querySelector('.my-zone').querySelector('.cost'),
    soldierArr:[],
    heroArr:[],
    deckarr:[],
}

var stage = document.querySelector('.stage');
var heroWrap = document.querySelector('.hero-wrap');
var turnBtn = document.querySelector('#turnBtn');
var hero = true;
var turn = true;


function Card(team, hero) {
    
    if (hero) {
        this.hero = true;
        this.hp = Math.ceil(Math.random() * 5)+20;
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

function deckClick(data,turn,arr,idx,wrap,team){
    var player = turn ? my:counter;
    data.soldier =true;
    player.cost.textContent = Number(player.cost.textContent)-data.cost
    player.soldierArr.push(data);
    arr.splice(idx, 1);
    player.zone.querySelector(wrap).innerHTML = '';
    player.zone.querySelector('.soldier-wrap').innerHTML = '';
    arr.forEach(function (data) {
        cardMaking(data, team, wrap, arr);
    })
    player.soldierArr.forEach(function (data) {
        cardMaking(data, team, '.soldier-wrap', arr);
    })
}

function cardMaking(data, team, wrap, arr, hero) {
    //카드생성
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
     //카드에 이벤트 붙이기   
    card.addEventListener('click', function (e) {
        var idx = arr.indexOf(data);
        if (turn) {//내턴
            
            if (team === my.zone &&Number(my.cost.textContent) >= data.cost && data.soldier === undefined) {
               deckClick(data,turn,arr,idx,wrap,team)
                myDeck(1, my.deckarr, my.zone, '.deck');
            } else {
                return;
            }

        } else {//컴퓨터턴
            if (team === counter.zone &&Number(counter.cost.textContent) >= data.cost && data.soldier === undefined) {
                deckClick(data,turn,arr,idx,wrap,team)
                 myDeck(1, counter.deckarr, counter.zone, '.deck');
             } else {
                 return;
             }
        }
    })
    team.querySelector(wrap).appendChild(card);
}


function counterHero(num, arr, team, wrap, hero) {
    var data = new Card(team, hero);
    cardMaking(data, team, wrap), hero;
}


function myHero(num, arr, team, wrap, hero) {
    var data = new Card(team, hero);
    console.log(data);
    cardMaking(data, team, wrap);
}

function counterDeck(num, arr, team, wrap, hero) {
    for (i = 0; i < num; i++) {
        var cardInform = new Card(team);
        arr.push(cardInform);
    }
    team.querySelector(wrap).innerHTML=""
    arr.forEach(function (data) {
        cardMaking(data, team, wrap, arr);
    })
}

function myDeck(num, arr, team, wrap, hero) {
    for (i = 0; i < num; i++) {
        var cardInform = new Card(team);
        arr.push(cardInform);
    }
    team.querySelector(wrap).innerHTML=""
    arr.forEach(function (data) {
        cardMaking(data, team, wrap, arr);
    })
}

function init() {
    counterHero(1, counter.heroArr, counter.zone, '.hero-wrap', hero);
    myHero(1, my.heroArr, my.zone, '.hero-wrap', hero);
    counterDeck(5, counter.deckarr, counter.zone, '.deck');
    myDeck(5, my.deckarr, my.zone, '.deck');
   my.cost.textContent='10';
   counter.cost.textContent='10';
    

}

turnBtn.addEventListener('click',function(){
    turn=!turn
    if(turn === true){
        counter.cost.textContent="10"
        my.zone.style.backgroundColor = "grey";
        counter.zone.style.backgroundColor = "white"
        
    }
    else{
        
        my.cost.textContent="10";
        counter.zone.style.backgroundColor = "grey";
        my.zone.style.backgroundColor = "white";
    }
})

init();