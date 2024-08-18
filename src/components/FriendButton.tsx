import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
interface Props {
    status?: string,
    adding_user?: number,
    profileId?: string
    friendBtnAction?: any
}
const FriendButton = ({ status, adding_user, profileId, friendBtnAction }: Props) => {
    let buttonIcon = <PersonAddIcon sx={{ marginRight: 1 }} />
    let buttonText = "Add Friend"
    if (status === 'Requested') {
        buttonIcon = <PersonRoundedIcon sx={{ marginRight: 1 }} />
        buttonText = "Waiting..."
    } else if (status === 'Accepted') {
        buttonIcon = <PersonRoundedIcon sx={{ marginRight: 1 }} />
        buttonText = "Friend"
    } else if (adding_user == Number(profileId)) {
        buttonIcon = <PersonAddIcon sx={{ marginRight: 1 }} />
        buttonText = "Add Friend"
    }

    if (status === 'Requested') {
        return <button onClick={friendBtnAction} disabled>{buttonIcon}{buttonText}</button>;
    }
    return <button onClick={friendBtnAction}>{buttonIcon}{buttonText}</button>;

};

export default FriendButton;
