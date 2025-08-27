// src/components/Canvas.js
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import styles from './Canvas.module.css';
import Chatbot from './chatbot';
import Navbar from './Navbar';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [clothingType, setClothingType] = useState('t-shirt');
  const [design, setDesign] = useState(null);
  const [color, setColor] = useState('#FFFFFF');
  const [size, setSize] = useState('M');
  const [activePanel, setActivePanel] = useState(null);
  const [designPosition, setDesignPosition] = useState({ x: 0, y: 0 });
  const [designScale, setDesignScale] = useState(0.5);
  const [showPostImage, setShowPostImage] = useState(false);
  const [clothingMask, setClothingMask] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setCtx(context);
  }, []);

  useEffect(() => {
    if (ctx) {
      redrawCanvas();
    }
  }, [ctx, clothingType, color, design, designPosition, designScale]);

  const redrawCanvas = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    loadClothingImage(clothingType);
  };

  const loadClothingImage = (type) => {
    if (!ctx) return;

    const img = new Image();
    img.src = `/assets/images/clothing/${type}/${type}_l.png`;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
      createClothingMask(img);
      applyColorToClothing();
      if (design) {
        applyDesign(design);
      }
    };
    img.onerror = (err) => {
      console.error('Error loading image:', err);
      img.src = `/assets/images/clothing/${type}/${type}_m.png`;
    };
  };

  const createClothingMask = (img) => {
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = ctx.canvas.width;
    maskCanvas.height = ctx.canvas.height;
    const maskCtx = maskCanvas.getContext('2d');

    maskCtx.drawImage(img, 0, 0, maskCanvas.width, maskCanvas.height);
    const imageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        data[i] = data[i + 1] = data[i + 2] = 255;
        data[i + 3] = 255;
      }
    }

    maskCtx.putImageData(imageData, 0, 0);
    setClothingMask(maskCanvas);
  };

  const applyColorToClothing = () => {
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] !== 0) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r !== 255 || g !== 255 || b !== 255) {
          const newColor = hexToRgb(color);
          data[i] = (r * newColor.r) / 255;
          data[i + 1] = (g * newColor.g) / 255;
          data[i + 2] = (b * newColor.b) / 255;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const applyDesign = (designName) => {
    if (!ctx || !clothingMask) return;

    const img = new Image();
    img.src = `/assets/images/${designName.startsWith('print') ? 'prints' : 'designs'}/${designName}.png`;
    img.onload = () => {
      const scaledWidth = img.width * designScale;
      const scaledHeight = img.height * designScale;
      const x = designPosition.x + (ctx.canvas.width - scaledWidth) / 2;
      const y = designPosition.y + (ctx.canvas.height - scaledHeight) / 2;
      
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = ctx.canvas.width;
      tempCanvas.height = ctx.canvas.height;
      const tempCtx = tempCanvas.getContext('2d');

      tempCtx.drawImage(img, x, y, scaledWidth, scaledHeight);
      
      tempCtx.globalCompositeOperation = 'destination-in';
      tempCtx.drawImage(clothingMask, 0, 0);
      
      ctx.drawImage(tempCanvas, 0, 0);
    };
    img.onerror = (err) => {
      console.error('Error loading design:', err);
    };
    setDesign(designName);
  };

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  const changeSize = (newSize) => {
    setSize(newSize);
  };

  const togglePanel = (panelName) => {
    setActivePanel(activePanel === panelName ? null : panelName);
  };

  const handleDrag = (e, ui) => {
    setDesignPosition({ x: ui.x, y: ui.y });
  };

  const handleResizeDesign = (e) => {
    setDesignScale(parseFloat(e.target.value));
  };

  const handlePostClick = () => {
    setShowPostImage(true);
  };

  return (
    <>
      <Navbar />
      <div className={styles.customizer}>
        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} width={500} height={500} />
          {design && (
            <Draggable
              position={designPosition}
              onDrag={handleDrag}
              bounds="parent"
            >
              <div className={styles.designWrapper}></div>
            </Draggable>
          )}
        </div>
        <div className={styles.controls}>
          {['clothingType', 'design', 'print', 'color', 'size'].map((option) => (
            <button
              key={option}
              className={`${styles.mainButton} ${activePanel === option ? styles.active : ''}`}
              onClick={() => togglePanel(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
          <button className={`${styles.mainButton} ${styles.postButton}`} onClick={handlePostClick}>Post</button>
        </div>
        {activePanel && (
          <div className={styles.subPanel}>
            {activePanel === 'clothingType' && (
              ['t-shirt', 'dress', 'hoodie', 'pants', 'shorts', 'skirts', 'crewneck'].map((type) => (
                <button
                  key={type}
                  onClick={() => setClothingType(type)}
                  className={clothingType === type ? styles.active : ''}
                >
                  {type}
                </button>
              ))
            )}
            {activePanel === 'design' && (
              ['floral', 'polka_dot', 'striped'].map((designName) => (
                <button
                  key={designName}
                  onClick={() => applyDesign(designName)}
                  className={design === designName ? styles.active : ''}
                >
                  {designName}
                </button>
              ))
            )}
            {activePanel === 'print' && (
              <div className={styles.printGrid}>
                {['print1', 'print2', 'print3', 'print4'].map((printName) => (
                  <img
                    key={printName}
                    src={`/assets/images/prints/${printName}.png`}
                    alt={printName}
                    onClick={() => applyDesign(printName)}
                    className={design === printName ? styles.active : ''}
                  />
                ))}
              </div>
            )}
            {activePanel === 'color' && (
              <input
                type="color"
                value={color}
                onChange={(e) => changeColor(e.target.value)}
                className={styles.colorPicker}
              />
            )}
            {activePanel === 'size' && (
              ['S', 'M', 'L'].map((sizeOption) => (
                <button
                  key={sizeOption}
                  onClick={() => changeSize(sizeOption)}
                  className={size === sizeOption ? styles.active : ''}
                >
                  {sizeOption}
                </button>
              ))
            )}
          </div>
        )}
        {design && (
          <div className={styles.designControls}>
            <label>
              Resize:
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={designScale}
                onChange={handleResizeDesign}
              />
            </label>
          </div>
        )}
      </div>
      {showPostImage && (
        <div className={styles.postImageOverlay}>
          <div className={styles.postImageContainer}>
            <button className={styles.closeButton} onClick={() => setShowPostImage(false)}>×</button>
            <img src={canvasRef.current.toDataURL()} alt="Posted design" />
            <p className={styles.postMessage}>Posted to your OOTD feed!</p>
          </div>
        </div>
      )}
      <Chatbot />
    </>
  );
};

export default Canvas;