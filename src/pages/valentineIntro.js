import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';

const ValentineIntro = () => {
  const history = useHistory();

  const handleContinue = () => {
    history.push('/valentine/question');
  };

  return (
    <div style={styles.container}>
      {/* Subtle background decoration */}
      <div style={styles.decoration}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.floatingShape,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Hey Mimi!</h1>
        </div>

        <div style={styles.contentSection}>
          <p style={styles.mainText}>
            Thanks so much for helping me scan this QR code from my friend!
          </p>
          
          <p style={styles.mainText}>
            I really appreciate it.
          </p>

          <p style={styles.mainText}>
            Could you help me open the file? Just click the button below.
          </p>

          <div style={styles.noteBox}>
            <p style={styles.noteText}>
              It should just be a document or something they sent me...
            </p>
          </div>
        </div>

        <button
          onClick={handleContinue}
          style={styles.continueButton}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 12px rgba(211, 47, 47, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
        >
          Open File
        </button>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Thanks again, Mikalia!
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
  decoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  floatingShape: {
    position: 'absolute',
    fontSize: '20px',
    color: '#ff6b9d',
    opacity: 0.15,
    animation: 'gentleFloat 6s infinite ease-in-out',
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
    marginBottom: '30px',
  },
  title: {
    fontSize: '42px',
    margin: '0',
    color: '#d32f2f',
    fontWeight: 'normal',
    letterSpacing: '1px',
  },
  contentSection: {
    margin: '30px 0 40px 0',
  },
  mainText: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
    lineHeight: '1.7',
  },
  noteBox: {
    marginTop: '30px',
    padding: '15px',
    background: '#f5f5f5',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  noteText: {
    fontSize: '16px',
    color: '#888',
    fontStyle: 'italic',
    margin: 0,
  },
  continueButton: {
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
    fontFamily: "'Georgia', serif",
    letterSpacing: '1px',
    marginTop: '10px',
  },
  footer: {
    marginTop: '30px',
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

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes gentleFloat {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(20px, -20px) rotate(5deg);
    }
    66% {
      transform: translate(-20px, 20px) rotate(-5deg);
    }
  }
`;
document.head.appendChild(styleSheet);

export default ValentineIntro;
