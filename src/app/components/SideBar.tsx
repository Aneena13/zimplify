'use client'
import { useState } from 'react';

import { UnstyledButton, Tooltip, Title, rem } from '@mantine/core';


import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../components/SideBar.module.css';

const linksMockdata = [
  'Overview',
  'Sites',
  'Projects',
  'Builds',
  'Integration',
  'Domain',
  'Support',
  
];

export default function SideBar() {
  const [active, setActive] = useState('Releases');
  const [activeLink, setActiveLink] = useState('Settings');
  

  

  const links = linksMockdata.map((link) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          
            
          </div>
         
        </div>
        <div className={classes.main}>
          

          {links}
        </div>
      
    </nav>
  );
}