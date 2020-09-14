import React, { useState, useEffect } from 'react';

function SubFilter({setFilter}) {

    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
        setFilter(e.target.value)
    }

    return (
        <div>
            <h4>SubFilter PlaceHolder</h4>
            <label>
            Filter Subs:
            <input type="text" value={text} onChange={handleChange} />
        </label>
        </div>
    )

}
export default SubFilter;