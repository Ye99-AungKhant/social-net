import React, { useState, useEffect, useRef } from 'react';
import user from '../../src/components/user.png';
import './style/menuPopup.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function MenuPopup({ open, setOpen }: Props) {

    const initialRef: any = null;
    let menuRef = useRef(initialRef);

    useEffect(() => {
        let handler = (e: any) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                console.log(menuRef.current);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

    return (
        <div className='menu-container' ref={menuRef}>
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                <ul>
                    <DropdownItem img={<EditIcon />} text={"Edit"} />
                    <DropdownItem img={<DeleteForeverIcon />} text={"Delete"} />
                </ul>
            </div>
        </div>
    );
}

function DropdownItem(props: any) {
    return (
        <li className='dropdownItem'>
            <div>{props.img}</div>
            <a> {props.text} </a>
        </li>
    );
}

export default MenuPopup