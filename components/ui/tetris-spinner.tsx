'use client';

import React, { forwardRef, useImperativeHandle } from 'react';

interface Block {
  x: number;
  y: number;
  color: string;
}

const TETRIS_SHAPES: Block[][] = [
  // I-piece (горизонтальная линия)
  [
    { x: 0, y: 1, color: 'bg-cyan-500' },
    { x: 1, y: 1, color: 'bg-cyan-500' },
    { x: 2, y: 1, color: 'bg-cyan-500' },
    { x: 3, y: 1, color: 'bg-cyan-500' },
  ],
  // O-piece (квадрат)
  [
    { x: 1, y: 0, color: 'bg-yellow-500' },
    { x: 2, y: 0, color: 'bg-yellow-500' },
    { x: 1, y: 1, color: 'bg-yellow-500' },
    { x: 2, y: 1, color: 'bg-yellow-500' },
  ],
  // T-piece
  [
    { x: 1, y: 0, color: 'bg-purple-500' },
    { x: 0, y: 1, color: 'bg-purple-500' },
    { x: 1, y: 1, color: 'bg-purple-500' },
    { x: 2, y: 1, color: 'bg-purple-500' },
  ],
  // L-piece
  [
    { x: 0, y: 0, color: 'bg-orange-500' },
    { x: 0, y: 1, color: 'bg-orange-500' },
    { x: 1, y: 1, color: 'bg-orange-500' },
    { x: 2, y: 1, color: 'bg-orange-500' },
  ],
  // S-piece
  [
    { x: 1, y: 0, color: 'bg-green-500' },
    { x: 2, y: 0, color: 'bg-green-500' },
    { x: 0, y: 1, color: 'bg-green-500' },
    { x: 1, y: 1, color: 'bg-green-500' },
  ],
];

export interface TetrisSpinnerRef {
  startDisappearingAnimation: () => void;
}

export const TetrisSpinner = forwardRef<TetrisSpinnerRef>((props, ref) => {
  const [currentShapeIndex, setCurrentShapeIndex] = React.useState(() => 
    Math.floor(Math.random() * TETRIS_SHAPES.length)
  );
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isDisappearing, setIsDisappearing] = React.useState(false);
  const [isFlickering, setIsFlickering] = React.useState(false);

  // Получаем скорость из переменной окружения, по умолчанию 300ms
  const spinnerSpeed = parseInt(process.env.NEXT_PUBLIC_SPINNER_SPEED || '300', 10);
  const animationDuration = Math.floor(spinnerSpeed / 2); // Половина времени для анимации

  // Функция для запуска анимации исчезновения
  const startDisappearingAnimation = () => {
    setIsDisappearing(true);
    
    // Выстраиваем в линию
    setTimeout(() => {
      setIsFlickering(true);
      
      // Мерцание
      const flickerInterval = setInterval(() => {
        setIsFlickering(prev => !prev);
      }, 100);
      
      // Исчезновение
      setTimeout(() => {
        clearInterval(flickerInterval);
        setIsVisible(false);
      }, 600);
    }, 300);
  };

  useImperativeHandle(ref, () => ({
    startDisappearingAnimation
  }));

  React.useEffect(() => {
    // Анимация появления
    const entranceTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const interval = setInterval(() => {
      if (!isDisappearing) {
        setIsAnimating(true);
        
        setTimeout(() => {
          setCurrentShapeIndex((prev) => (prev + 1) % TETRIS_SHAPES.length);
          setIsAnimating(false);
        }, animationDuration);
      }
    }, spinnerSpeed);

    return () => {
      clearTimeout(entranceTimer);
      clearInterval(interval);
    };
  }, [spinnerSpeed, animationDuration, isDisappearing]);

  const currentShape = TETRIS_SHAPES[currentShapeIndex];

  return (
    <div 
      className={`relative transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-75'
      }`}
      style={{ 
        width: '4em', 
        height: '4em',
      }}
    >
      {/* Блоки текущей фигуры */}
      {currentShape.map((block, index) => (
        <div
          key={index}
          className={`absolute ${block.color} rounded-sm shadow-md transition-all duration-300 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          } ${isFlickering ? 'opacity-50' : ''}`}
          style={{
            width: '1em',
            height: '1em',
            left: isDisappearing ? `${index * 1}em` : `${block.x * 1}em`,
            top: isDisappearing ? '1.5em' : `${block.y * 1}em`,
            transform: isAnimating ? 'scale(0.8) opacity-50' : 'scale(1) opacity-100',
            transitionDelay: isVisible ? `${index * 50}ms` : '0ms',
          }}
        />
      ))}
    </div>
  );
});

TetrisSpinner.displayName = 'TetrisSpinner';