import React, { useEffect, useState } from "react";
import styles from './Tictactoe.module.css';

export default () => {
    const [currentValue, setCurrentValue] = useState('X');
    const [winner, setWinner] = useState('');
    const [matrix, setMatrix] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);

    useEffect(() => {
        //row check
        for (let i = 0; i < 3; i++) {
            let val = matrix[i][0];
            if (val == '') {
                continue;
            }
            let count = 1;
            for (let j = 1; j < 3; j++) {
                if (val == matrix[i][j]) {
                    count++;
                    console.log(count);
                    if (count == 3) {
                        setWinner(val);
                        return;
                    }
                    continue;
                } else {
                    break
                }
            }
        }
    }, [matrix]);

    useEffect(() => {
        //column check
        for (let i = 0; i < 3; i++) {
            let val = matrix[0][i];
            if (val == '') {
                continue;
            }
            let count = 1;
            for (let j = 1; j < 3; j++) {
                if (val == matrix[j][i]) {
                    count++;
                    console.log(count);
                    if (count == 3) {
                        setWinner(val);
                        return;
                    }
                    continue;
                } else {
                    break
                }
            }
        }
    }, [matrix]);

    useEffect(() => {
        //diagonal check
        let val = matrix[1][1];
        if ((val == matrix[0][0] && val == matrix[2][2]) || (val == matrix[0][2] && val == matrix[2][0])) {
            setWinner(val);
        }
    }, [matrix]);

    const handlerOnClick = (rowIndex, cellIndex) => {
        if (winner !== '') {
            return;
        }
        if (matrix[rowIndex][cellIndex] !== '') {
            return;
        }
        const newMatrix = [...matrix];
        newMatrix[rowIndex][cellIndex] = currentValue;
        setMatrix(newMatrix);
        if (currentValue == 'X') {
            setCurrentValue('O');
        } else {
            setCurrentValue('X');
        }
    }

    return (
        <>
        <div className={styles.board}>
            {matrix.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className={styles.row}>
                        {row.map((cell, cellIndex) => {
                            return (
                                <div
                                    onClick={() => handlerOnClick(rowIndex, cellIndex)}
                                    key={cellIndex}
                                    className={styles.cell}
                                >
                                    <span className={styles.value}>{matrix[rowIndex][cellIndex]}</span>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            {winner !== '' && <h1>Winner is {winner}</h1>}
        </div>

        <button type="button"
                onClick={() => {
                    setMatrix([
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],]);
                    setCurrentValue('X');
                }}>Start new game</button>
        </>
    );
};