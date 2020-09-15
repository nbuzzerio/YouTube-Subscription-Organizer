import React, { useState, useEffect } from 'react';

function SubFilter({setFilter}) {

    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
        setFilter(e.target.value)
    }

    return (
        <div className='filterWrapper'>
            <label>
            Search:
            <input className='filterSearch' type="text" value={text} onChange={handleChange} />
        </label>
        </div>
    )

}
export default SubFilter;