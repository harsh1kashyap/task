import React, { useState, useRef, useEffect } from 'react';

export function SampleInput() {
    const [name, setName] = useState('Ravi');
    const input = useRef();

    useEffect(() => {
        input.current.onkeyup = handleChange;
        input.current.value = name;
    });

    function handleChange(e) {
        e.preventDefault();

        setName(e.target.value);
    }

    return (
        <React.Fragment     >
            <div>
                Name:
                <input type='text' ref={input} />
            </div>
            <div>Name is: {name}</div>
        </React.Fragment>
    );
}