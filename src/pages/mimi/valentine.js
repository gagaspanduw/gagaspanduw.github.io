import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';

const Valentine = () => {
  const history = useHistory();
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '60%', left: '40%' });
  const [noButtonText, setNoButtonText] = useState('No');
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [hearts, setHearts] = useState([]);

  const noButtonTexts = [
    'No',
    'Are you sure?',
    'Really?',
    'Think again',
    'But why?',
    "Don't be mean",
    'Please?',
    'Pretty please?',
    'Come on...',
    "I miss you",
    "You know I care about you",
    "Just give me a chance",
    'Still no?',
    'Mimi please',
    'Last chance',
    'Really really?',
    'Mikalia...',
    'Fine, keep trying',
  ];

  const handleNoButtonHover = () => {
    const newTop = Math.random() * 80 + 10;
    const newLeft = Math.random() * 80 + 10;
    
    setNoButtonPosition({
      top: `${newTop}%`,
      left: `${newLeft}%`,
    });

    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Change text based on hover count
    if (newCount < noButtonTexts.length) {
      setNoButtonText(noButtonTexts[newCount]);
    }
    
    // Make No button smaller and Yes button bigger
    setNoButtonSize(Math.max(0.3, noButtonSize - 0.05));
    setYesButtonSize(yesButtonSize + 0.1);
  };

  const handleNoButtonClick = (e) => {
    e.preventDefault();
    handleNoButtonHover();
  };

  const handleYesClick = () => {
    // Create heart explosion effect
    const newHearts = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 0.5,
    }));
    setHearts(newHearts);

    setTimeout(() => {
      history.push('/valentine/success');
    }, 2000);
  };

  return (
    <div style={styles.container}>
      {/* Floating hearts background */}
      <div style={styles.heartsBackground}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.floatingHeart,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 15 + 15}px`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Celebration hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            ...styles.celebrationHeart,
            left: `${heart.left}%`,
            animationDelay: `${heart.animationDelay}s`,
          }}
        >
          ♥
        </div>
      ))}

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            Surprise!
          </h1>
          <div style={styles.titleHeart}>♥</div>
        </div>
        
        <div style={styles.surpriseNote}>
          <p style={styles.surpriseText}>
            So... there wasn't really a QR code from my friend 😏
          </p>
          <p style={styles.surpriseText}>
            But since you're here, I have a very important question!
          </p>
        </div>
        
        <div style={styles.questionContainer}>
          <p style={styles.question}>
            Will you be my Valentine?
          </p>
          <p style={styles.subtext}>
            I know we're far apart right now, but I wanted to do something special for you
          </p>
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={handleYesClick}
            style={{
              ...styles.yesButton,
              transform: `scale(${yesButtonSize})`,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = `scale(${yesButtonSize * 1.1})`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = `scale(${yesButtonSize})`;
            }}
          >
            Yes! 💖
          </button>

          <button
            onMouseEnter={handleNoButtonHover}
            onTouchStart={handleNoButtonHover}
            onClick={handleNoButtonClick}
            style={{
              ...styles.noButton,
              top: noButtonPosition.top,
              left: noButtonPosition.left,
              transform: `scale(${noButtonSize})`,
            }}
          >
            {noButtonText}
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Made with love for the most amazing Mikalia
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#ffc5d9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Georgia', serif",
  },
  heartsBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  floatingHeart: {
    position: 'absolute',
    animation: 'float 8s infinite ease-in-out',
    opacity: 0.3,
    color: '#ff6b9d',
  },
  celebrationHeart: {
    position: 'absolute',
    top: '50%',
    fontSize: '30px',
    animation: 'explode 2s ease-out forwards',
    pointerEvents: 'none',
    color: '#ff1744',
  },
  card: {
    background: '#ffffff',
    borderRadius: '15px',
    padding: '50px 40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    maxWidth: '550px',
    width: '100%',
    position: 'relative',
    zIndex: 1,
    border: '3px solid #ff6b9d',
  },
  header: {
    position: 'relative',
    marginBottom: '25px',
  },
  title: {
    fontSize: '42px',
    margin: '0',
    color: '#d32f2f',
    fontWeight: 'normal',
    letterSpacing: '1px',
  },
  titleHeart: {
    display: 'inline-block',
    fontSize: '36px',
    color: '#d32f2f',
    marginLeft: '10px',
    animation: 'pulse 2s infinite',
  },
  surpriseNote: {
    margin: '20px 0 30px 0',
    padding: '20px',
    background: '#fff9e6',
    borderRadius: '10px',
    border: '2px dashed #ffd54f',
  },
  surpriseText: {
    fontSize: '17px',
    color: '#ef6c00',
    marginBottom: '10px',
    lineHeight: '1.6',
    fontStyle: 'italic',
  },
  questionContainer: {
    margin: '30px 0 40px 0',
    padding: '20px',
    background: '#fff5f8',
    borderRadius: '10px',
    border: '2px dashed #ffb3d1',
  },
  question: {
    fontSize: '28px',
    fontWeight: 'normal',
    color: '#2c2c2c',
    marginBottom: '15px',
    letterSpacing: '0.5px',
  },
  subtext: {
    fontSize: '16px',
    color: '#666',
    fontStyle: 'italic',
    lineHeight: '1.6',
  },
  buttonContainer: {
    position: 'relative',
    height: '200px',
    marginTop: '40px',
  },
  yesButton: {
    backgroundColor: '#d32f2f',
    color: 'white',
    border: '3px solid #b71c1c',
    borderRadius: '8px',
    padding: '18px 50px',
    fontSize: '22px',
    fontWeight: 'normal',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    zIndex: 2,
    fontFamily: "'Georgia', serif",
    letterSpacing: '1px',
  },
  noButton: {
    backgroundColor: '#757575',
    color: 'white',
    border: '2px solid #616161',
    borderRadius: '8px',
    padding: '12px 35px',
    fontSize: '17px',
    fontWeight: 'normal',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    zIndex: 1,
    fontFamily: "'Georgia', serif",
  },
  footer: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '2px solid #ffb3d1',
  },
  footerText: {
    color: '#888',
    fontSize: '15px',
    fontStyle: 'italic',
    margin: 0,
  },
};

// Add keyframe animations via a style tag
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-30px) rotate(5deg);
    }
    50% {
      transform: translateY(-60px) rotate(-5deg);
    }
    75% {
      transform: translateY(-30px) rotate(3deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes explode {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--tx), var(--ty)) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Valentine;
