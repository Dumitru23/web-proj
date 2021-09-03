import React from 'react';

//iterate buttons based on category

const Categories = ({categories, filterItems}) => {
  return (
        <div className="btn-container">
            {
            categories.map((category, index) => {
                    return (
                        <button 
                            type="button" 
                            className="filter-btn" 
                            key ={index}
                            onClick={() => filterItems (category) }
                            >
                                {category} 
                        </button>
                    );
            })}
        </div>
    );
};
export default Categories;


/* Test reason

 <div className="btn-container"> 
    <button className='filter-btn' onClick={()=>
        filterItems('all')}>
            all
    </button>
    <button className='filter-btn' onClick={()=>
        filterItems('breakfast')}>
        breakfast
    </button>
<div>

*/