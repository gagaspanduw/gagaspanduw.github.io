import { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import Bday from "./bday";

class Naybdays extends Component {
    constructor() {
        super()
        this.state = {
            countdown: null,
            isActive: false,
            words: ['Cieee kena prank :P', 
                'Ngga ngga coba pencet tombol dibawah'],
            isShow: false,
            currentWord: 0,
            birthdayText: '',
            isTextFullyDisplayed: false
        }
    }

    componentDidMount() {
        this.getCountdown();
    }

    getCountdown = () => {
        // const targetDate = new Date('2024-07-21T07:00:00.000Z'); // July 28th, 2023
        const targetDate = moment.tz('2024-07-28 00:00:00', 'Asia/Jakarta'); // July 28th, 2024, 07:00:00 GMT+7
        const currentDate = new Date();
    
        if (currentDate >= targetDate) {
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

    handleShowText = () => {
        this.setState({ isShow: true });
        this.showBirthdayText();
    }

    showBirthdayText = () => {
        const { words, currentWord } = this.state;
        if (currentWord < words.length) {
            setTimeout(() => {
                this.setState({ birthdayText: words[currentWord] });
                this.setState({ currentWord: currentWord + 1 });
                this.showBirthdayText();
                setTimeout(() => {
                    this.setState({ isTextFullyDisplayed: true });
                }, 8000);
            }, 3000);
        } 
    }

    render() {
        return (
            <div className="h-screen flex justify-center items-center">
                {this.state.isActive?(
                <div className="-mt-60 lg:mt-0 h-screen flex justify-center items-center"> {/* Add flex and justify-center classes */}
                    <div className="text-center"> {/* Add text-center class */}
                        <p className={`mt-5 lg:-mt-12 text-3xl font-bold text-center ${this.state.isShow? 'opacity-100' : 'invisible'}`} style={{ transition: 'opacity 0.5s' }}>{this.state.birthdayText}</p>
                        <button className={`bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center ${this.state.isShow? 'invisible' : 'opacity-100'}`} style={{ transition: 'opacity 0.5s' }} onClick={this.handleShowText}>Open</button>
                        <Link to="/bday">
                            <button className={`mx-auto bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center ${this.state.isTextFullyDisplayed? 'opacity-100' : 'invisible'}`} style={{ transition: 'opacity 0.5s' }}>Open</button>
                        </Link>
                    </div>
                </div>
                ):(
                <p className="-mt-80 lg:mt-0 mx-auto justify-center text-3xl font-bold text-center">{this.state.countdown}</p>
                )}
            </div>
        );
    }
}

const Naybday = (props) => (
    <div>
        <Naybdays></Naybdays>
    </div>
)

export default Naybday