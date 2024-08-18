import React, { useState, useEffect, useRef } from 'react';
import user from '../../src/components/user.png';
import './style/menuPopup.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editPost: () => void;
    deletePost: () => void;
}
function PostMenuPopup({ open, setOpen, editPost, deletePost }: Props) {

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
                    <li className='dropdownItem' onClick={editPost}>
                        <div><EditIcon /></div>
                        <a> Edit </a>
                    </li>
                    <li className='dropdownItem' onClick={deletePost}>
                        <div><DeleteForeverIcon /></div>
                        <a> Delete </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default PostMenuPopup