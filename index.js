var counter = {
    zone:document.querySelector('.counter-zone'),
    cost:document.querySelector('.counter-zone').querySelector('.cost'),
    soldierArr:[],
    heroArr:[],
    deckarr:[],
    selectedCard:null,
    selectedData:null
}
var my = {
    zone:document.querySelector('.my-zone'),
    cost:document.querySelector('.my-zone').querySelector('.cost'),
    soldierArr:[],
    heroArr:[],
    deckarr:[],
    selectedCard:null,
    selectedData:null
}

var stage = document.querySelector('.stage');
var heroWrap = document.querySelector('.hero-wrap');
var turnBtn = document.querySelector('#turnBtn');
var hero = true;
var turn = true;
var selectCount;


function Card(team, hero) {
    
    if (hero) {
        this.hero = true;
        this.hp = Math.ceil(Math.random() * 5)+20;
        this.att = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.hp + this.att) / 2);
        this.team = team;
        this.stage = true;
        return;
    } else {
        this.hero = false;
        this.hp = Math.ceil(Math.random() * 5);
        this.att = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.hp + this.att) / 2);
        this.team = team;
        return;
    }
}

function deckClick(data,turn,arr,idx,wrap,team){
    var player = turn ? my:counter;
    data.stage =true;
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

function stageClick(e,data,turn){
    var player = turn ? my:counter;
    e.currentTarget.parentNode.parentNode.querySelectorAll('.card').forEach(function(card){
        card.classList.remove('selected');
    })
    e.currentTarget.classList.add('selected');
    player.selectedCard = e.currentTarget;
    player.selectedData = data;
}
function attckClick(e,data,turn){
    var player = turn ? my:counter;
    var counterPlayer = turn ? counter:my;
    data.hp = data.hp - player.selectedData.att;
    e.currentTarget.querySelector('.hp').textContent = data.hp;
    player.selectedCard.classList.remove('selected')
    player.selectedCard.classList.add('turnover')

    if(data.hp <= 0 && data.hero === false){
        e.currentTarget.parentNode.removeChild(e.currentTarget);
        var idx = counterPlayer.soldierArr.indexOf(data)
        counterPlayer.soldierArr.splice(idx,1);
    }else if(data.hp <= 0 && data.hero === true){
        if(player === my){
            console.log("승리")
        }else{
            console.log("패배")
        }
        init();
    }
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
            
            if (team === my.zone &&Number(my.cost.textContent) >= data.cost && data.stage === undefined) {
               deckClick(data,turn,arr,idx,wrap,team)
                myDeck(1, my.deckarr, my.zone, '.deck');

                //공격
            }else if(team === my.zone && data.stage === true ){//내턴이고, 선택카드가 내카드이면서 스테이지에 있는 카드,
                stageClick(e,data,turn);
            }else if(my.selectedData && team === counter.zone){//내턴이고, 내카드를 선택해놓은 상태에서 상대방 카드를 클릭했을때,
                attckClick(e,data,turn)
            }else {
                return;
            }

        } else {//컴퓨터턴
            if (team === counter.zone &&Number(counter.cost.textContent) >= data.cost && data.stage === undefined) {
                deckClick(data,turn,arr,idx,wrap,team)
                 myDeck(1, counter.deckarr, counter.zone, '.deck');
            }else if(team === counter.zone && data.stage === true ){
                stageClick(e,data,turn);
            }else if(counter.selectedData && team === my.zone){
                attckClick(e,data,turn)
            }else {
                return;
            }
        }
    })
    team.querySelector(wrap).appendChild(card);
}


function counterHero(num, arr, team, wrap, hero) {
    var data = new Card(team, hero);
    arr.push(data);
    cardMaking(data, team, wrap,arr,hero);
}


function myHero(num, arr, team, wrap, hero) {
    var data = new Card(team, hero);
    arr.push(data);
    cardMaking(data, team, wrap,arr,hero);

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
    my.cost.textContent='10';
    counter.cost.textContent='10';
    my.zone.querySelector('.deck').innerHTML="";
    my.zone.querySelector('.hero-wrap').innerHTML="";
    my.zone.querySelector('.soldier-wrap').innerHTML="";
    my.soldierArr = [];
    my.deckarr = [];
    my.heroArr = [];
    counter.zone.querySelector('.deck').innerHTML="";
    counter.zone.querySelector('.hero-wrap').innerHTML="";
    counter.zone.querySelector('.soldier-wrap').innerHTML="";
    counter.soldierArr = [];
    counter.deckarr = [];
    counter.heroArr = [];
  



    counterHero(1, counter.heroArr, counter.zone, '.hero-wrap', hero);
    myHero(1, my.heroArr, my.zone, '.hero-wrap', hero);
    counterDeck(5, counter.deckarr, counter.zone, '.deck');
    myDeck(5, my.deckarr, my.zone, '.deck');
   
    

}

turnBtn.addEventListener('click',function(){
    turn=!turn
    document.querySelectorAll('.turnover').forEach(function(card){
        card.classList.remove('turnover')
    })
    if(turn === true){
        counter.cost.textContent="10"
        my.zone.style.backgroundColor = "yellow";
        counter.zone.style.backgroundColor = "white"
        
        
    }
    else{
        my.cost.textContent="10";
        counter.zone.style.backgroundColor = "yellow";
        my.zone.style.backgroundColor = "white";
        
    }
})

init();