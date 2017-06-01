/**
 * Created by chotoxautinh on 6/1/17.
 */
import React from 'react';
import Autocomplete from 'react-autocomplete';

const listStyles = {
    item: {
        padding: '2px 6px',
        cursor: 'default'
    },

    highlightedItem: {
        color: 'white',
        background: '#F38B72',
        padding: '2px 6px',
        cursor: 'default'
    }
};

const renderItem = (item, isHighlighted) => (
    <div
        style={isHighlighted ? listStyles.highlightedItem : listStyles.item}
        key={item.id}
        id={item.id}
    >{item.title}</div>
)

const Search = ({tracks, autoCompleteValue, handleSelect, handleChange, handleRenderItem}) => (
    <div className="search">
        {/*Autocomplete usage with value and behavior handled via this.props*/}
        <Autocomplete
            inputProps={{title: "Title"}}
            value={autoCompleteValue}
            items={tracks}
            getItemValue={(item) => item.title}
            onSelect={handleSelect}
            onChange={handleChange}
            renderItem={renderItem}
        />
    </div>
)

// Export Search
export default Search;