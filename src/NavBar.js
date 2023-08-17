import React from 'react';
import NavBarItems from './NavBarItems';

function NavBar({items}) {

    

    return (
        <div>
            HI im navbar and below are the items:
            {items.map(e=>{
                return (
                    <NavBarItems item={e}/>
                )
            })}
           
        </div>
    );
}

export default NavBar;