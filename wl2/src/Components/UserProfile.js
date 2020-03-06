import React from 'react';
import {UserContext} from "../contexts/UserContext";

import defaultPhoto from "../generic-user-icon.jpg";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCog, faEnvelope, faPortrait, faSignOutAlt, faVolumeDown} from "@fortawesome/free-solid-svg-icons";

export default function UserProfile(props) {
    // const { user } = React.useContext(UserContext)
    const [open, setOpen] = React.useState(false);
    const [scroll] = React.useState('paper');

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <>
            <span style={{ position: 'fixed', right: '16px' }}>
                <div onClick={handleClick}>
                    <img src={defaultPhoto} alt="User" style={{ width: '50px', height: '50px' }} />
                </div>
            </span>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClick}
                    scroll="paper"
                    aria-labelledby="scroll-dialog-title"
                >
                    <div style={{ backgroundColor: 'white', minWidth: '300px', boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)' }}>
                        <DialogTitle id="scroll-dialog-title">
                            <div style={{ width: '100%', margin: '0 8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 600, }} >{props.user.first_name}</div>
                                <img src={defaultPhoto} alt="User" style={{ width: '56px', height: '56px' }} />
                            </div>
                        </DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <div
                                onClick={() => {
                                    localStorage.clear()
                                    props.history.push('/')
                                }}
                                style={{height: '36px', display: 'flex', alignItems: 'center', margin: '24px auto', fontSize: '18px', cursor: 'pointer'}}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} alt='test' style={{height: '24px', width: '24px', marginRight: '16px'}}/>
                                Sign out
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClick} style={{ color: 'black', fontWeight: 600, }}>
                                Close
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        </>
    );
}
