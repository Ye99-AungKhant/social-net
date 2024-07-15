import React, { useState, useEffect, useRef } from 'react';
import user from '../../src/components/user.png';
import './style/menuPopup.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteComment, editComment } from '../store/slices/commentSlice';

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editId: number
    deleteId: number
}
function MenuPopup({ open, setOpen, editId, deleteId }: Props) {

    const initialRef: any = null;
    const dispatch = useAppDispatch()
    const { comments } = useAppSelector((state) => state.comments)
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

    const commentDelete = () => {
        dispatch(deleteComment(deleteId))
    }
    const commentEdit = () => {
        dispatch(editComment(editId))
    }

    return (
        <div className='menu-container' ref={menuRef}>
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                <ul>
                    <li className='dropdownItem' onClick={commentEdit}>
                        <div><EditIcon /></div>
                        <a> Edit </a>
                    </li>
                    <li className='dropdownItem' onClick={commentDelete}>
                        <div><DeleteForeverIcon /></div>
                        <a> Delete </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default MenuPopup