import React from 'react';

import swim from './../images/swim.jpg';
import pull from './../images/pull.jpg';
import enjoy from './../images/enjoy.jpg';
import eat from './../images/eat.jpg';
import jump from './../images/jump.jpg';
import party from './../images/party.jpg';

import back from './../images/back.jpg'


export default class Cards extends React.Component {

    constructor() {
        super();
        // Not used yet
        this.state = {
            message: "",
        }
        // Game variables
        this.flipped = 0;
        this.moves = 0;
        this.pairsUncovered = 0;
    }

    render() {
        const cards = [
            {
                pair: 1,
                back: false,
                content: "schwimmen \ngeschwommen",
            },
            {
                pair: 1,
                back: true,
                content: '',
                img: swim,
            },
            {
                pair: 2,
                back: false,
                content: "ziehen \ngezogen",
            },
            {
                pair: 2,
                back: true,
                content: '',
                img: pull,
            },
            {
                pair: 3,
                back: false,
                content: "genießen \ngenossen",
            },
            {
                pair: 3,
                back: true,
                content: '',
                img: enjoy,
            },
            {
                pair: 4,
                back: false,
                content: "essen \ngegessen",
            },
            {
                pair: 4,
                back: true,
                content: '',
                img: eat,
            },
            {
                pair: 5,
                back: false,
                content: "springen \ngesprungen",
            },
            {
                pair: 5,
                back: true,
                content: '',
                img: jump,
            },
            {
                pair: 6,
                back: false,
                content: "feiern \ngefeiert",
            },
            {
                pair: 6,
                back: true,
                content: '',
                img: party,
            },
        ];

        // Randomize cards
        cards.sort(() => (Math.random() - 0.5));

        // Build cards
        return <div id="game-container">
            {cards.map((e, i) => {
                if(cards[i].back) {
                    return (<div key={i} className="book m-sm-4 d-inline-flex">
                        <div className="image-flip">
                            <div className={`mainflip pair${cards[i].pair}`} onClick={(e) => this.checkPair(e)}>
                                <div className="frontside">
                                    <div className="">
                                        <img className="card-image" src={`${back}`} alt="leaf"/>
                                    </div>
                                </div>
                                <div className="backside">
                                    <div className="">
                                        <div className="">
                                            <img className="card-image" src={`${cards[i].img}`} alt={``}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                } else {
                    return (<div key={i} className="book m-sm-4 d-inline-flex">
                        <div className="image-flip">
                            <div className={`mainflip pair${cards[i].pair}`} onClick={(e) => this.checkPair(e)}>
                                <div className="frontside">
                                    <div className="">
                                        <img className="card-image" src={`${back}`} alt="leaf"/>
                                    </div>
                                </div>
                                <div className="backside">
                                    <div className="back-body">
                                        <pre>{cards[i].content}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            })}
        </div>
    }
    
    checkPair = (element) => {
        
        const toFlip = element.target.closest(".mainflip");
        // prevents flipping more than two || prevents flipping again || prevents flipping after is done
        if (this.flipped === 2 || toFlip.classList.contains("flipcardTrue") || toFlip.classList.contains("flipcard")) {
            return;
        }

        if (toFlip.classList.toggle("flipcard")) {
            this.flipped++;
        }
        toFlip.classList.toggle("flipcardTrue");

        const flippedCards = document.querySelectorAll(".flipcardTrue");
        
        // Check for Pair
        if (flippedCards.length === 2) {
            if (flippedCards[0].classList[1] === flippedCards[1].classList[1]) {
                this.flipped = 0;
                this.pairsUncovered++;
                this.moves++;
                flippedCards[0].classList.remove("flipcardTrue");
                flippedCards[1].classList.remove("flipcardTrue");

                // Add green shadow
                setTimeout(() => {
                    flippedCards[0].closest(".book").classList.add("done");
                    flippedCards[1].closest(".book").classList.add("done");
                }, 999)
                // When you finish:
                if (this.pairsUncovered === 6) {
                    setTimeout(() => {
                    alert(`Congratulations you finished in ${this.moves} moves.`)
                    }, 1000)
                }
                return;
            }
        }

        // flip back in 2 seconds
        if (this.flipped === 2) {
            setTimeout(() => {
                if (this.flipped === 2) {
                    this.moves++;
                    flippedCards.forEach(flippedCard => {
                        flippedCard.classList.toggle("flipcard");
                        flippedCard.classList.toggle("flipcardTrue");
                        this.flipped = 0;
                    })
                } 
            }, 2000)
        }
    }
}