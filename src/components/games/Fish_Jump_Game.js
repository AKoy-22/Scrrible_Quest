import classes from './css/fish_jump_game.module.css';
import { useRef, useEffect, useState } from 'react';
import useInterval from './useInterval';
import { Link } from 'react-router-dom';

function Fish_Jump_Game() {
    const characterRef = useRef(null);
    const blockRef = useRef(null);
    const scoreSpanRef = useRef(null);
    const [counter, setCounter] = useState(0);
    const [gameOver, setGameOver] = useState(false)


    useEffect(() => {
        const handleKeyDown = (event) => {

            jump();

        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useInterval(() => {
        let characterTop = parseInt(window.getComputedStyle(characterRef.current).getPropertyValue('top'));
        let blockLeft = parseInt(window.getComputedStyle(blockRef.current).getPropertyValue('left'));

        if (blockLeft < 10 && blockLeft > -10 && characterTop >= 150) {
            blockRef.current.style.animation = 'none';
            alert('Game Over. score: ' + Math.floor(counter / 100));
            setCounter(0);
            setGameOver(true)
        } else {
            if (!gameOver) {
                setCounter((prevCounter) => prevCounter + 1);
                scoreSpanRef.current.innerHTML = Math.floor(counter / 100);
            }

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
        setGameOver(false);
    }

    return (
        <div>
            <style>
                {`
                body {
               
                }
        `   }
            </style>
            <Link className={classes.homeLink} to="/">Home</Link>
            <h3 className={classes.pressKey}> Press Any Key to Jump !</h3>
            <div className={classes.game} >
                <div className={classes.character} id="character" ref={characterRef}></div>
                <div className={classes.block} id="block" ref={blockRef}></div>
            </div>
            <p className={classes.score}>Score: <span className={classes.scoreSpan} id="scoreSpan" ref={scoreSpanRef}></span></p>
            {gameOver && <div className={classes.playAgain}> <button onClick={playAgain}>Play Again</button></div>}
        </div>
    )
}

export default Fish_Jump_Game;