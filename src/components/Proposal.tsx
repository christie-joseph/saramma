import { useState, useEffect, useRef } from 'react';

// Placeholders
const SAD_GIF = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R6bW13aG54bW13aG54bW13aG54bW13aG54bW13aG54bW13aG54/L95W4wv8nnb9K/giphy.gif"; 
const HAPPY_GIF = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNG9qcjh6NmUyd21zcHVuNWZ5a3E2YW5vY29qOXhxMHdocXFubmZkOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TnPAmP7OLTaeY/giphy.gif"; 

const Proposal = () => {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [viewState, setViewState] = useState<'question' | 'yes' | 'no'>('question');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  
  const textLine1 = "My dearest Sarammooo...";
  const textLine2 = "Will you be my valentine?";
  const noBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (viewState === 'question') {
      setLine1('');
      setLine2('');
      setShowButtons(false);
      
      let index1 = 0;
      let index2 = 0;

      // Type Line 1
      const interval1 = setInterval(() => {
        setLine1(textLine1.slice(0, index1 + 1));
        index1++;
        if (index1 === textLine1.length) {
          clearInterval(interval1);
          
          // Pause before Line 2
          setTimeout(() => {
            // Type Line 2
            const interval2 = setInterval(() => {
              setLine2(textLine2.slice(0, index2 + 1));
              index2++;
              if (index2 === textLine2.length) {
                clearInterval(interval2);
                setTimeout(() => setShowButtons(true), 500);
              }
            }, 100);
          }, 1000); // 1s pause
        }
      }, 100);

      return () => {
        clearInterval(interval1);
      };
    }
  }, [viewState]);

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoPosition({ x, y });
  };

  const handleNoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling interactions
    setViewState('no');
  };

  const handleYesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewState('yes');
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewState('question');
  };

  if (viewState === 'yes') {
    return (
      <div className="celebration">
        <h1>YAY! ❤️</h1>
        <img src={HAPPY_GIF} alt="Happy" className="gif-result" />
        <div className="heart-rain">🌸💖🥰</div>
        <p className="meeting-text">Appo 12pm Sharp!!!!!!!</p>
        <a href="https://www.google.com/maps/search/China+Town+London" target="_blank" rel="noopener noreferrer" className="location-link">
          📍 China Town London
        </a>
      </div>
    );
  }

  if (viewState === 'no') {
    return (
      <div className="sad-state">
        <h1>But... why? 😿</h1>
        <img src={SAD_GIF} alt="Sad" className="gif-result" />
        <button className="btn yes-btn" onClick={handleRetry}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="proposal-container">
      <div className="text-container">
        <h1 className="typing-text">{line1}</h1>
        <h1 className="typing-text">{line2}</h1>
      </div>
      
      {showButtons && (
        <div className="buttons-container fade-in">
          <button className="btn yes-btn" onClick={handleYesClick}>Yes</button>
          <button 
            ref={noBtnRef}
            className="btn no-btn" 
            style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }}
            onMouseEnter={handleNoHover}
            onClick={handleNoClick}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default Proposal;
