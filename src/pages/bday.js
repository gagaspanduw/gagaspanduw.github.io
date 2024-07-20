import React, { Component } from 'react'
import { useEffect, useState, useCallback } from "react";
import hbdsong from '../img/hbd.mp3';
import cake_animation from '../img/cake_animation.gif';
import bannerbday from '../img/banner.png'
import moment from 'moment-timezone';
import image from '../img/image';

class Bdays extends Component{
    constructor(){
        super()
        this.state = {
            countdown: null,
            isActive: false,
            isPlaying: false,
            audio: new Audio({hbdsong}), // replace with your music file
            birthdayText: '',
            prankText: ['Cieee kena prank :P', 
                'Ngga ngga coba pencet tombol dibawah'],
            words: ['Happy Birthday Naya Bocil !',
                'Today is',
				'as beautiful as other days',
				'but you realize',
				'another year has gone',
                'in a blink of the eyes',
				'however',
				'Do you know?',
				'today is just special',
				'so special to you',
				"that's why",
				"Let's make it",
				'the best celebration ever',
				'and let me share',
				'a piece of happiness to you',
				'I made all this',
				'as a birthday present to you',
				'I wish you all the best',
				'May your life made easier',
				'May all your wishes come true',
				'Remember',
				'God has your back',
				'and',
				'this year will be better',
				'and I hope',
				"you'll find",
				'happiness along the way',
				'keep your spirit up',
				'enjoy every single moment',
				'that you experience today',
				'fill it with your most beautiful smile',
				'and make it the best memory',
				'lastly',
				"I'd like to wish you one more time",
				'a very happy birthday Alya Zasqia Narendra'],
            currentWord: 0,
            wish: '',
            showWish: false,
            showCake: false,
            showBanner: false,
            isPrankText: false
        };
    }
    
    componentDidMount() {
        this.getCountdown();
    }

    getCountdown = () => {
        // const targetDate = new Date('2024-07-28T07:00:00.000Z'); // July 28th, 2024
        const targetDate = moment.tz('2024-07-28 00:00:00', 'Asia/Jakarta'); // July 28th, 2024, 07:00:00 GMT+7
        const currentDate = new Date();

        console.log(currentDate.getFullYear())
    
        if (currentDate.getFullYear() === targetDate.year() && currentDate.getMonth() === targetDate.month() && currentDate.getDate() === targetDate.date()) {
          this.setState({ isActive: true });
        } else {
          const timeDiff = targetDate - currentDate;
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
          this.setState({
            countdown: `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
          });
    
          setTimeout(this.getCountdown, 1000);
        }
    }

    handlePlayMusic = () => {
        this.setState({ isPlaying: true });
        this.state.audio.play();
        this.state.audio.loop = true
        this.showBirthdayText();
    }

    showBirthdayText = () => {
        const { words, currentWord } = this.state;
        if (currentWord < words.length) {
            setTimeout(() => {
                this.setState({ birthdayText: words[currentWord] });
                this.setState({ currentWord: currentWord + 1 });
                this.showBirthdayText();
            }, 4000);
        } else {
            // show gift button after all birthday texts are displayed
            setTimeout(() => {
                this.setState({ showWish: true });
            }, 4000);
        }
    }

    handleWishChange = (e) => {
        this.setState({ wish: e.target.value });
    }

    handleWishSubmit = () => {
        if (this.state.wish !== '') {
            this.setState({ redirect: true });
            // redirect to a link after submitting the wish
            window.location.href = 'https://wa.me/085810840979?text=Aku mau ' + this.state.wish;
        } else if(this.state.wish === '') {
            alert('Gaboleh kosong!');
        }
    }

    handleShowCake = () => {
        this.setState({ showCake: true});
    }

    handleShowBanner = () => {
        this.setState({ showBanner: true});
    }

    // showPrankText = () => {
    //     const { prankText, currentPrankText } = this.state;
    //         if (currentPrankText < prankText.length) {
    //             setTimeout(() => {
    //                 this.setState({ prankText: prankText[currentPrankText] });
    //                 this.setState({ currentPrankText: currentPrankText + 1 });
    //                 this.showPrankText();
    //         }, 4000);
    //     }
    // }

    // handleShowPrankText = () => {
    //     this.setState({ isPrankText: true});
    //     this.showPrankText();
    // }

    render(){
        return(
            <div>
                {this.state.showBanner ? (
                    <div className='flex flex-row mt-10 lg:-mb-24 lg:mt-10'>
                        <img width="300" height="300" className='items-center justify-center mx-auto' src={bannerbday} alt="birthday cake" />
                    </div>
                ) : null}
                {this.state.showCake ? (
                    <div className='flex flex-row -mb-96 lg:-mb-40 lg:mt-24'>
                        <img width="200" height="200" className='items-center justify-center mx-auto' src={cake_animation} alt="birthday cake" />
                    </div>
                ) : null}
            <div className="h-screen flex justify-center items-center">
                {this.state.isActive ? (
                <div>
                    <p className={`mt-5 lg:-mt-12 text-3xl font-bold text-center ${this.state.isPlaying ? 'opacity-100' : 'invisible'}`} style={{ transition: 'opacity 0.5s' }}>{this.state.birthdayText}</p>
                    {/* <p className={`mt-5 lg:-mt-12 text-3xl font-bold text-center ${this.state.showBanner==true && this.state.isPrankText==true? 'invisible' : this.state.isPrankText ? 'opacity-100' : 'invisible'}`} style={{ transition: 'opacity 0.5s' }}>{this.state.prankText}</p> */}
                    {/* <button className={`mx-auto bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center ${this.state.isPrankText? 'hidden' : 'opacity-100'}`} style={{ transition: 'opacity 0.5s' }} onClick={this.handleShowPrankText}>For Naya</button> */}
                    <button className={`mx-auto bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center ${this.state.showBanner==false? 'opacity-100' : 'hidden'}`} style={{ transition: 'opacity 0.5s' }} onClick={this.handleShowBanner}>Let's decorate</button>
                    <button className={`-mt-40 mx-auto bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center ${this.state.showCake==false && this.state.showBanner==true? 'opacity-100' : 'hidden'}`} style={{ transition: 'opacity 0.5s' }} onClick={this.handleShowCake}>Delicious cake</button>
                    <button className={`mx-auto bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center ${this.state.showCake==true && this.state.isPlaying==false? 'opacity-100' : 'hidden'}`} style={{ transition: 'opacity 0.5s' }} onClick={this.handlePlayMusic}>Play music</button>
                    {this.state.isPlaying? (
                        <audio src={hbdsong} autoPlay loop />
                    ) : null}
                    {this.state.showWish ? (
                    <div>
                        <input className="rounded flex items-center justify-center mx-auto mt-5 mb-5 text-black" type="text" value={this.state.wish} onChange={this.handleWishChange} placeholder="Mau hadiah apa?" />
                        <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded flex items-center justify-center mx-auto" onClick={this.handleWishSubmit}>Wish</button>
                    </div>
                    ) : null}
                </div>
                ) : (
                <p className="-mt-80 lg:mt-0 mx-auto justify-center text-3xl font-bold text-center">{this.state.countdown}</p>
                )}
          </div>
          </div>
        )
    }
}

const Bday = (props) => (
    <div>
        <Bdays></Bdays>
    </div>
)

export default Bday