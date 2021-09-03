import React, {useState} from 'react';
import Menu from './Menu';
import Categories from './Categories'; 
import items from './data';

/* Create 2 Component (Menu and Categories)
It is going to be a menu, where we have a list of items and we want to iterate for each item and want to return 
some article with image and text and other data. 

 --menu items state value{menuItems}--
*/

//avoid reapiting buttons (ex: 3 but of breakfast) 
const allCategories = ['all',...new Set(items.map((item) => item.category))]; //filter categories, take only unique categories from menu list
console.log(allCategories);

function App() {
  const [menuItems, setMenuItems] = useState(items);  // any item is taken from data.js
  // eslint-disable-next-line
  const [categories,setCategories] = useState(allCategories);       // useState([]);empty array

  const filterItems = (category) => {
    if(category === "all") { // set to original Menu (all) 
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => 
    item.category === category);
    setMenuItems(newItems)
  };

  return (
    <main>
      <section className='menu section'>
        <div className='title'>
          <h2> Food Menu</h2>
          <div className='underline'></div>
        </div>
          <Categories categories={categories} filterItems={filterItems}/>             
          <Menu items={menuItems}/>  
      </section>
    </main>

  );
}

export default App;
