import React, { Component } from 'react';
import './Header.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const styles = theme => ({
    searchCardContentStyle: {
        width: "300px",
        borderRadius: "4px",
        backgroundColor: "#c0c0c0",
        padding: "0px"
    },
    searchInput: {
        marginTop: "6px",
        fontSize: "large"
    },
    searchIcon: {
        paddingLeft: "5px",
        fill: "black"
    }
});


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorRef: null,
            showSearch: this.props.showSearch,
            showAvatar: this.props.showAvatar,
        };
    }

    handleClick = (event) => {
        this.setState({ anchorRef: event.target });
    }

    handleClose = () => {
        this.setState({ anchorRef: null });
    };
     
    logoutHandler = () =>{
        sessionStorage.clear();
        // this.props.history("/");
    }

   

    render() {

        const { classes } = this.props;
        return (
            <div>
                <header className="app-header">
                    Image Viewer
                <div className="right-header-container">
                        {this.state.showSearch && <Card className="search-card">
                            <CardContent className={classes.searchCardContentStyle}>
                                <div className="search-container">
                                    <SearchIcon className={classes.searchIcon} fontSize="large"></SearchIcon>
                                    <Input className={classes.searchInput} placeholder="Search..." onChange={this.props.searchSpace}></Input>
                                </div>
                            </CardContent>
                        </Card>
                        }
                        {this.state.showAvatar &&
                            <IconButton onClick={this.handleClick}><Avatar alt="OnePiece" src="https://i.pinimg.com/originals/2b/be/83/2bbe83c41babaf761466774be9e52a13.png" /></IconButton>
                        }
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorRef}
                            keepMounted
                            open={Boolean(this.state.anchorRef)}
                            onClose={this.handleClose}
                            PaperProps={{
                                style: {
                                    marginTop: "30px",
                                    backgroundColor: '#c0c0c0'
                                }
                            }}
                        // className="simplemenu1"
                        >

                            {this.state.showSearch && 
                            <div style={{padding:"0px"}}>
                            <Link to="/profile"> 
                            <MenuItem style={{ backgroundColor: '#c0c0c0' }}>
                              <b>My Account</b>
                            </MenuItem>
                            </Link>
                            <Divider />
                            </div>
                            }
                            <Link to="/"> 
                            <MenuItem style={{ backgroundColor: '#c0c0c0' }} onClick={this.logoutHandler} >
                                <b>Logout</b>
                            </MenuItem>
                            </Link>

                        </Menu>
                    </div>
                </header>
            </div>
        )
    }

}


export default (withStyles(styles))(Header);
// export default Header;