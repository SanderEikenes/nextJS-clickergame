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
      <p>Simple Clicker game</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        Press Me
      </button>
      {buttonClicked && <p>You pressed the button {pressedCounter} times</p>}
      {pressedCounter >= 30 && (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
    </main>
  );
}
