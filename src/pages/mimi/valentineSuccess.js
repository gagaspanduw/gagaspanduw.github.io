import React, { useEffect, useState } from 'react';
import '../../App.css';

const ValentineSuccess = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create continuous hearts
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 25 + 15,
      };
      setHearts((prev) => [...prev, newHeart]);

      // Remove old hearts
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 3000);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      {/* Continuous hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            ...styles.risingHeart,
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
        >
          ♥
        </div>
      ))}

      <div style={styles.content}>
        <div style={styles.celebration}>
          <h1 style={styles.title}>I knew you'd say yes!</h1>
          <div style={styles.decorativeLine}></div>
          
          <div style={styles.messageBox}>
            <p style={styles.mainMessage}>
              You just made my day, Mimi
            </p>
            
            <p style={styles.subMessage}>
              Even though we're miles apart, you're always close to my heart. 
              Thank you for saying yes and making this Valentine's Day special.
            </p>

            <div style={styles.loveLetterContainer}>
              <div style={styles.letterHeader}>A Letter for You</div>
              <div style={styles.loveLetter}>
                <p style={styles.letterText}>
                  Dear Mikalia,
                </p>
                <p style={styles.letterText}>
                  I wish I could be there with you right now, but distance can't stop me from 
                  celebrating this day with you. You bring so much joy into my life, and I wanted 
                  to do something to show you how much you mean to me.
                </p>
                <p style={styles.letterText}>
                  Every message from you makes me smile, every moment we share — even across 
                  the distance — is precious to me. You're someone truly special, and I'm grateful for you.
                </p>
                <p style={styles.letterText}>
                  Thank you for being you, for your kindness, your laughter, and for just being 
                  the amazing person you are.
                </p>
                <p style={styles.signature}>
                  With all my heart,<br/>
                  Your Valentine
                </p>
              </div>
            </div>

            <div style={styles.giftBox}>
              <div style={styles.giftIcon}>♥</div>
              <p style={styles.giftTitle}>A Special Gift</p>
              <p style={styles.giftText}>
                I have something special prepared for you. I can't wait to share it with you!
              </p>
            </div>

            <div style={styles.promiseSection}>
              <h3 style={styles.promiseTitle}>My Promises to You</h3>
              <div style={styles.promiseGrid}>
                <div style={styles.promiseItem}>
                  <span style={styles.promiseIcon}>♥</span>
                  <span>Send you good morning texts</span>
                </div>
                <div style={styles.promiseItem}>
                  <span style={styles.promiseIcon}>♥</span>
                  <span>Share music that reminds me of you</span>
                </div>
                <div style={styles.promiseItem}>
                  <span style={styles.promiseIcon}>♥</span>
                  <span>Listen when you need someone to talk to</span>
                </div>
                <div style={styles.promiseItem}>
                  <span style={styles.promiseIcon}>♥</span>
                  <span>Make you laugh when you're down</span>
                </div>
              </div>
            </div>

            <div style={styles.funnyNote}>
              <p style={styles.funnyText}>
                P.S. I saw you trying to click "No" 😂<br/>
                Did you really think I'd let you? Nice try, Mimi!<br/>
                Also... there was no QR code from my friend 😏<br/>
                Surprise!
              </p>
            </div>

          </div>
        </div>

        <div style={styles.heartBeat}>
          ♥
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#ffe0e9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Georgia', serif",
  },
  risingHeart: {
    position: 'absolute',
    bottom: '-50px',
    animation: 'rise 3s ease-in forwards',
    pointerEvents: 'none',
    zIndex: 0,
    color: '#ff6b9d',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '750px',
  },
  celebration: {
    background: '#ffffff',
    borderRadius: '15px',
    padding: '45px 35px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    border: '3px solid #ff6b9d',
  },
  title: {
    fontSize: '42px',
    color: '#d32f2f',
    marginBottom: '10px',
    fontWeight: 'normal',
    letterSpacing: '1px',
  },
  decorativeLine: {
    width: '100px',
    height: '3px',
    background: '#ff6b9d',
    margin: '0 auto 30px auto',
  },
  messageBox: {
    padding: '20px',
  },
  mainMessage: {
    fontSize: '30px',
    fontWeight: 'normal',
    color: '#d32f2f',
    marginBottom: '20px',
    letterSpacing: '0.5px',
  },
  subMessage: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '40px',
    lineHeight: '1.8',
  },
  loveLetterContainer: {
    margin: '40px 0',
  },
  letterHeader: {
    fontSize: '22px',
    color: '#d32f2f',
    marginBottom: '15px',
    fontWeight: 'normal',
    borderBottom: '2px solid #ffb3d1',
    paddingBottom: '10px',
  },
  loveLetter: {
    background: '#fffafc',
    borderRadius: '10px',
    padding: '30px',
    border: '2px solid #ffc5d9',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
  },
  letterText: {
    fontSize: '17px',
    color: '#444',
    marginBottom: '18px',
    lineHeight: '1.9',
    textAlign: 'left',
  },
  signature: {
    fontSize: '18px',
    color: '#d32f2f',
    marginTop: '25px',
    fontStyle: 'italic',
    textAlign: 'right',
  },
  giftBox: {
    margin: '40px 0',
    padding: '30px',
    background: '#fff9e6',
    borderRadius: '12px',
    border: '2px solid #ffd966',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
  },
  giftIcon: {
    fontSize: '50px',
    color: '#d32f2f',
    marginBottom: '10px',
    animation: 'heartbeat 1.5s infinite',
  },
  giftTitle: {
    fontSize: '22px',
    color: '#c17900',
    fontWeight: 'normal',
    marginBottom: '10px',
  },
  giftText: {
    fontSize: '17px',
    color: '#8b6914',
  },
  promiseSection: {
    margin: '40px 0',
    padding: '30px',
    background: '#f0f8f0',
    borderRadius: '12px',
    border: '2px solid #a5d6a7',
  },
  promiseTitle: {
    fontSize: '22px',
    color: '#2e7d32',
    marginBottom: '20px',
    fontWeight: 'normal',
  },
  promiseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
  },
  promiseItem: {
    fontSize: '16px',
    color: '#2c2c2c',
    padding: '15px',
    background: '#ffffff',
    borderRadius: '8px',
    textAlign: 'left',
    border: '1px solid #c8e6c9',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  promiseIcon: {
    fontSize: '20px',
    color: '#d32f2f',
    flexShrink: 0,
  },
  funnyNote: {
    marginTop: '40px',
    padding: '20px',
    background: '#fffbea',
    borderRadius: '10px',
    border: '2px dashed #ffd54f',
  },
  funnyText: {
    fontSize: '16px',
    color: '#ef6c00',
    fontStyle: 'italic',
    lineHeight: '1.8',
    margin: 0,
  },
  heartBeat: {
    fontSize: '70px',
    marginTop: '30px',
    color: '#d32f2f',
    animation: 'heartbeat 1.5s infinite',
    textAlign: 'center',
  },
};

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes rise {
    0% {
      bottom: -50px;
      opacity: 1;
    }
    100% {
      bottom: 110%;
      opacity: 0;
    }
  }

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    10%, 30% {
      transform: scale(1.1);
    }
    20%, 40% {
      transform: scale(1.05);
    }
  }
`;
document.head.appendChild(styleSheet);

export default ValentineSuccess;
