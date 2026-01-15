import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingAnimation({
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseDuration = 2000
}: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const renderText = () => {
    const currentWord = words[currentWordIndex];
    const parts: { text: string; isGreen: boolean }[] = [];

    if (currentWord === 'Close More Sales') {
      const index = currentText.indexOf('Sales');
      if (index > 0) {
        parts.push({ text: currentText.substring(0, index), isGreen: false });
      }
      if (index !== -1 && currentText.length > index) {
        parts.push({ text: currentText.substring(index, index + 5), isGreen: true });
        if (currentText.length > index + 5) {
          parts.push({ text: currentText.substring(index + 5), isGreen: false });
        }
      } else if (index === -1) {
        parts.push({ text: currentText, isGreen: false });
      }
    } else if (currentWord === 'Win 348% More Sales') {
      const index = currentText.indexOf('348%');
      if (index > 0) {
        parts.push({ text: currentText.substring(0, index), isGreen: false });
      }
      if (index !== -1 && currentText.length > index) {
        parts.push({ text: currentText.substring(index, index + 4), isGreen: true });
        if (currentText.length > index + 4) {
          parts.push({ text: currentText.substring(index + 4), isGreen: false });
        }
      } else if (index === -1) {
        parts.push({ text: currentText, isGreen: false });
      }
    } else if (currentWord.includes('Revenue')) {
      const index = currentText.indexOf('Revenue');
      if (index > 0) {
        parts.push({ text: currentText.substring(0, index), isGreen: false });
      }
      if (index !== -1 && currentText.length > index) {
        parts.push({ text: currentText.substring(index, index + 7), isGreen: true });
        if (currentText.length > index + 7) {
          parts.push({ text: currentText.substring(index + 7), isGreen: false });
        }
      } else if (index === -1) {
        parts.push({ text: currentText, isGreen: false });
      }
    } else if (currentWord.includes('Opportunity')) {
      const index = currentText.indexOf('Opportunity');
      if (index > 0) {
        parts.push({ text: currentText.substring(0, index), isGreen: false });
      }
      if (index !== -1 && currentText.length > index) {
        parts.push({ text: currentText.substring(index, index + 11), isGreen: true });
        if (currentText.length > index + 11) {
          parts.push({ text: currentText.substring(index + 11), isGreen: false });
        }
      } else if (index === -1) {
        parts.push({ text: currentText, isGreen: false });
      }
    } else if (currentWord.includes('Grow')) {
      const index = currentText.indexOf('Grow');
      if (index !== -1 && currentText.length > index) {
        parts.push({ text: currentText.substring(index, index + 4), isGreen: true });
        if (currentText.length > index + 4) {
          parts.push({ text: currentText.substring(index + 4), isGreen: false });
        }
      } else if (index === -1) {
        parts.push({ text: currentText, isGreen: false });
      }
    } else {
      parts.push({ text: currentText, isGreen: false });
    }

    return parts.map((part, idx) => (
      <span key={idx} className={part.isGreen ? 'text-neon-green' : 'text-white'}>
        {part.text}
      </span>
    ));
  };

  return (
    <span className="inline-flex items-baseline">
      <span className="font-bold relative">
        {renderText()}
        <span
          className={`inline-block w-0.5 h-[0.9em] bg-neon-green ml-1 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-100`}
          style={{ verticalAlign: 'middle' }}
        ></span>
      </span>
    </span>
  );
}
