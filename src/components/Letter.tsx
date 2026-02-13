import { useState, useEffect } from 'react';
import '../App.css';

interface LetterProps {
  isOpened: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

const Letter = ({ isOpened, onOpen, onClose, children }: LetterProps) => {
  const [showContent, setShowContent] = useState(false);

  // Handle the zoom sequence
  useEffect(() => {
    if (isOpened) {
      // 1. Envelope opens (CSS transition)
      // 2. Letter slides out (CSS transition)
      // 3. Zoom effect (CSS animation on envelope-wrapper or letter)
      
      // Wait for envelope/letter open animation, then show content
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 2000); // Adjust timing based on CSS
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpened]);

  return (
    <div className={`envelope-wrapper ${isOpened ? 'open' : ''}`}>
      <div className="envelope-container" onClick={isOpened ? undefined : onOpen}>
        <div className="envelope">
          <div className="flap">
            <div className="heart-seal">❤</div>
          </div>
          <div className="body"></div>
          <div className={`letter ${isOpened ? 'full-screen' : ''}`}>
             {isOpened && showContent ? (
               <div className="letter-content open-fade-in">
                 {children}
                 <button className="back-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>
                   Start Over
                 </button>
               </div>
             ) : (
                <div className="text">My Dearest...</div>
             )}
          </div>
        </div>
      </div>
      {!isOpened && <div className="instruction-text">Click to open</div>}
    </div>
  );
};

export default Letter;
