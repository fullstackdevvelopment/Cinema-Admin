import React, {useState} from 'react';
import Select from 'react-select';

function Selects() {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    return (
        <div className="admin__dashboard__select">
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />
        </div>

    );
}

export default Selects;
