"use client"

import { useEffect, useState } from 'react';

export default function Home() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [pressedCounter, setPressedCounter] = useState(0);
  const [clicksEaten, setClicksEaten] = useState(0);
  const [clickFactoryCounter, setClickFactoryCounter] = useState(0);
  const [clickFactoryPrice, setClickFactoryPrice] = useState(100);
  const [showBuyFactoryButton, setShowBuyFactoryButton] = useState(false);
  const [promocodeInput, setPromoCodeInput] = useState('');
  const [promoUsed, setPromoUsed] = useState(false);


  // Load data from localStorage on component mount
  useEffect(() => {
    const savedPressedCounter = localStorage.getItem('pressedCounter');
    const savedClickFactoryCounter = localStorage.getItem('clickFactoryCounter');
    if (savedPressedCounter !== null) {
      setPressedCounter(parseInt(savedPressedCounter, 10));
    }
    if (savedClickFactoryCounter !== null) {
      setClickFactoryCounter(parseInt(savedClickFactoryCounter, 10));
    }
  }, []);

  // Save data to localStorage when variables change
  useEffect(() => {
    localStorage.setItem('pressedCounter', pressedCounter.toString());
  }, [pressedCounter]);

  useEffect(() => {
    localStorage.setItem('clickFactoryCounter', clickFactoryCounter.toString());
  }, [clickFactoryCounter]);

  const handleButtonClick = () => {
    setButtonClicked(true);
    setPressedCounter(prevCounter => prevCounter + 1);
    if (!showBuyFactoryButton && pressedCounter >= 50) {
      setShowBuyFactoryButton(true);
    }
  };

  const eatAllClicks = () => {
    setClicksEaten(clicksEaten + pressedCounter);
    setPressedCounter(0);
  };

  const clickFactory = () => {
    if(pressedCounter >= clickFactoryPrice) {
      setPressedCounter(pressedCounter-clickFactoryPrice);
      setClickFactoryCounter(clickFactoryCounter + 1);
      setClickFactoryPrice(clickFactoryPrice+(100*(clickFactoryCounter+1)));
    }
  };

  const handlePromocode = () => {
    setPromoUsed(true);
    if (promocodeInput.trim().toLowerCase() === 'free') {
      setPressedCounter(prevCounter => prevCounter + 1000);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (clickFactoryCounter >=1) {
      interval = setInterval(() => {
        setPressedCounter(prevCounter => prevCounter + 1*clickFactoryCounter);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clickFactoryCounter])

  return (
    <main>
      <h1 className='text-center text-lg'>Simple Clicker game</h1>
      <div className='text-center mt-10'>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          Press Me
        </button>
        {buttonClicked && <p>You have {pressedCounter} clicks</p>}
        {pressedCounter >= 30 && (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
              onClick={eatAllClicks}
            >
              Eat all clicks
            </button>
          </div>
        )}
        {clicksEaten > 0 && (
              <p>You have eaten {clicksEaten} {clicksEaten === 1 ? 'click' : 'clicks'}.</p>
        )}
        {showBuyFactoryButton && (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
              onClick={clickFactory}
            >
              Buy click factory
            </button>
            <p>Price: {clickFactoryPrice} clicks</p>
          </div>
        )}
        {clickFactoryCounter >= 1 && (
          <p>Factory counter: {clickFactoryCounter}</p>
        )}

        {pressedCounter >= 500 && !promoUsed && (
          <div>
            <p>
              We love FREE stuff!
              Enter promocode:</p>
            <input
              className='text-black' 
              type='text'
              value={promocodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={handlePromocode}
            >
              Validate
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
