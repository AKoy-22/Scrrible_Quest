import classes from './css/fish_jump_game.module.css';
import { useRef, useEffect, useState } from 'react';
import useInterval from './useInterval';

function Fish_Jump_Game() {
    const characterRef = useRef(null);
    const blockRef = useRef(null);
    const scoreSpanRef = useRef(null);
    const [counter, setCounter] = useState(0);
    const [gameOver, setGameOver] = useState(false)
    

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.code === 'Space') {
            jump();
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    useInterval(() => {
        let characterTop = parseInt(window.getComputedStyle(characterRef.current).getPropertyValue('top'));
        let blockLeft = parseInt(window.getComputedStyle(blockRef.current).getPropertyValue('left'));

        if (blockLeft < 15 && blockLeft > -15 && characterTop >= 100) {
            blockRef.current.style.animation = 'none';
            alert('Game Over. score: ' + Math.floor(counter / 100));
            setCounter(0);
            setGameOver(true)
        } else {
            setCounter((prevCounter) => prevCounter + 1);
            scoreSpanRef.current.innerHTML = Math.floor(counter / 100);
        }
    }, 10);

    function jump() {
        if (characterRef.current.classList.contains(classes.animate)) { return }
        characterRef.current.classList.add(classes.animate);
        setTimeout(function () {
            characterRef.current.classList.remove(classes.animate);
        }, 300);
    }

    function playAgain() {
        window.location.reload();
    }

    return (
        <div>
            <style>
                {`
                body {
               
                }
        `   }
            </style>
            <div className={classes.game} >
                <div className={classes.character} id="character" ref={characterRef}></div>
                <div className={classes.block} id="block" ref={blockRef}></div>
            </div>
            <p>Score: <span className={classes.scoreSpan} id="scoreSpan" ref={scoreSpanRef}></span></p>
            <button onClick={jump}>JUMP!</button>
            <button onClick={playAgain}>Play Again</button>
        </div>
    )
}

export default Fish_Jump_Game;