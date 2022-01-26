let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    techs: [
        'bootstrap',
        'css',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react',
        'typescript'], 
    
    cards: null,

    checkGameOver: function () {
       return this.cards.filter(card => !card.flipped).length == 0
    },
    
    setCard: function(id){

        let card = this.cards.filter(card => card.id === id)[0]
        
        if(card.flipped || this.lockMode){
            return false
        }

        if(this.firstCard == null){
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }else{
            this.secondCard = card
            this.lockMode = true
            this.secondCard.flipped = true
            return true
        }

    },

    checkMatch: function(){
        if(this.firstCard == null || this.secondCard == null){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unflipCards(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    createCardsFromTechs: function (){
        this.cards = []
        for(tech of this.techs){
            this.cards.push(this.createPairFromTech(tech))   
        }
        this.cards = this.cards.flatMap(pair => pair)
        //Essa função (flatMap) desmembra todos os elementos que tem um array, ao fazer isso aqui, está retornando um array com 20 elementos.
        this.shuffleCards()
    },
    
    createPairFromTech: function (tech){
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]
    },
    
    createIdWithTech: function (tech){
        return tech + parseInt(Math.random() *1000)
    },
    
    shuffleCards: function (cards) {    
        for(let i = this.cards.length - 1; i > 0; i--){
                const j = Math.floor(Math.random() * (i + 1));
                
                [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
            }
    },
}