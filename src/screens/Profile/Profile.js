import React, { Component } from 'react';
import Header from '../../common/Header';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import './Profile.css';
import { Typography, Button, FormControl, Input, InputLabel, FormHelperText, GridList, Divider } from '@material-ui/core';
import Modal from 'react-modal';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: "53px",
        transform: 'translate(-50%, -50%)'
    }
};
const styles = (theme) => ({
    large: {
        width: "100px",
        height: "100px",
    },
    userName: {
        paddingTop: "0px",
        paddingLeft: "20px",
        height: "50px",
        margin: "0.25%"
    },
    fullName: {
        paddingTop: "10px",
        paddingRight: "10px"
    },
    gridList: {
        // padding:"1%",
        width: "100%",
        margin: "100px",
        height: "70%",
    },
    gridImages: {
        margin: "0px",
        objectFit: "cover"
    },
    ModalImage:{
        width:"75%",
        objectFit: "cover"
    }
});



class Profile extends Component {

    constructor() {
        super();
        this.state = {
            favClick: false,
            likeCount: 9,
            open: false,
            fullname: "",
            Ofullname: "Narasimha Ravi Teja Atmakuri",
            fullnameRequired: "dispNone",
            Imageopen: false,
            ImageUrl: "",
            ImageCaption: "",
            userImages: [{}],
            comment:"",
            comments:[],
            commentAdded: false
        }
    }

    componentWillMount() {

        let data = null;
        let dataImage = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        let xhrImageData = [];
        let token = sessionStorage.getItem("access-token");

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                //  console.log(JSON.parse(this.responseText).data);
                let vdata = JSON.parse(this.responseText).data;
                that.setState({ userImages: JSON.parse(this.responseText).data });
                //  console.log(this.state.userImages);



                JSON.parse(this.responseText).data.forEach(function (image, index) {
                    xhrImageData[index] = new XMLHttpRequest();
                    xhrImageData[index].open("GET", "https://graph.instagram.com/" + image.id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + token);
                    xhrImageData[index].send(dataImage);

                    xhrImageData[index].onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {

                            vdata[index].media_url = JSON.parse(this.responseText).media_url;
                            vdata[index].timestamp = JSON.parse(this.responseText).timestamp;

                            that.setState({ userImages: vdata });
                        }

                    }
                })

                that.setState({ imageLoaded: true });

            }

        })

        xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + token);
        xhr.send(data);



    }



    handleClose = () => {
        this.state.open = false;
        this.setState(this.state);

    }

    handleOpen = () => {
        this.state.open = true;
        this.setState(this.state);

    }

    OpenImageModal = (image) => {
        this.state.Imageopen = true;
        this.state.ImageUrl = image.media_url;
        this.state.ImageCaption = image.caption;
        // console.log(url);
        this.setState(this.state);
    }

    CloseImageModal = () => {
        this.state.Imageopen = false;
        this.setState(this.state);
    }

    inputFullNameChangeHandler = (e) => {
        this.setState({ fullname: e.target.value });
    }

    UpdateClickHandler = () => {
        this.state.fullname === "" ? this.setState({ fullnameRequired: "dispBlock" }) : this.setState({ fullnameRequired: "dispNone" });

        if (this.state.fullname !== "") {
            this.state.Ofullname = this.state.fullname;
            this.state.open = false;
            this.setState(this.state);
        }
    }

    favClickHandler = () => {
        this.setState({ favClick: !this.state.favClick, likeCount: !this.state.favClick ? this.state.likeCount + 1 : this.state.likeCount - 1 })

    }

    inputCommentHandler = (e) => {
        this.setState({ comment: e.target.value });


    }

    commentAddHandler = () => {
        let Vcomments = this.state.comments;
        Vcomments.push(this.state.comment);
        this.setState({ commentAdded: true, comments:Vcomments});

    }

    render() {
        const { classes } = this.props;
        return (

            <div>
                <Header showSearch={false} showAvatar={true}></Header>
                <div className="information-container">
                    <Avatar alt="OnePiece" src="https://i.pinimg.com/originals/2b/be/83/2bbe83c41babaf761466774be9e52a13.png"
                        className={classes.large}
                    />
                    <div>
                        <Typography variant='h4' className={classes.userName} >Ravi Atmakuri</Typography>
                        <div className="detail-container">
                            <Typography variant='h6' className="typo" > Posts:6</Typography>
                            <Typography variant='h6' className="typo" > Follows:100</Typography>
                            <Typography variant='h6' className="typo" > Followed by:1000</Typography>
                        </div>
                        <div className="fullname-container">
                            <Typography variant="h5" className={classes.fullName} >{this.state.Ofullname}</Typography>

                            <Button variant="fab" color="secondary" onClick={this.handleOpen}><EditIcon></EditIcon></Button>

                        </div>
                    </div>
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.open}
                        contentLabel="Edit"
                        onRequestClose={this.handleClose}
                        style={customStyles}
                    >
                        <div>
                            <Typography variant="h4">Edit</Typography>
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                <Input id="fullname" type="text" fullname={this.state.fullname} onChange={this.inputFullNameChangeHandler}></Input>

                                <FormHelperText className={this.state.fullnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br></br>
                            <br></br>
                            <Button variant="contained" color="primary" onClick={this.UpdateClickHandler} >Update</Button>
                        </div>
                    </Modal>
                </div>
                <div className="grid-container">
                    <GridList cellHeight={400} cols={4} className={classes.gridList}>
                        {this.state.userImages.map(image => (
                            <img alt="batman" src={image.media_url} className={classes.gridImages} onClick={this.OpenImageModal.bind(this, image)}></img>
                        ))}
                    </GridList>

                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.Imageopen}
                        contentLabel="ImageDetail"
                        onRequestClose={this.CloseImageModal}
                        style={customStyles}
                    >
                        <div className="image-modalContainer">
                                <img alt="batman" style={{width: "50%",float:"left"}} src={this.state.ImageUrl}></img>
                            <div>
                                <div className="image-header-container">
                                    <Avatar alt="OnePiece" src="https://i.pinimg.com/originals/2b/be/83/2bbe83c41babaf761466774be9e52a13.png" style={{ padding: "10px", margin: "0px" }} />
                                    <Typography variant='h5' style={{ padding: "10px" }} >Ravi Atmakuri</Typography>
                                </div>
                                <Divider></Divider>
                                <Typography style={{ padding: "10px" }}><b>{this.state.ImageCaption}</b></Typography>
                                {this.state.commentAdded && this.state.comments.map(comment => (

                                    <div>
                                        <span><b>Ravi Atmakuri:</b><span>{this.state.comment}</span></span>
                                    </div>
                                ))
                                }
                                <div style={{ paddingTop: "90%", paddingLeft: "5%" }}>
                                    <div className="like-container">
                                        {this.state.favClick ? <FavoriteIcon className="favorite" fontSize="large" onClick={this.favClickHandler}></FavoriteIcon> : <FavoriteBorderIcon className="favoriteB" fontSize="large" onClick={this.favClickHandler}></FavoriteBorderIcon>}
                                        <span><b>{this.state.likeCount + " Likes"}</b></span>
                                    </div>
                                    <Button variant="contained" className="addButton" color="primary" onClick={this.commentAddHandler} >Add</Button>
                                    <FormControl required className="formControl">
                                        <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                        <Input id="comment" comment={this.state.comment} type="text" onChange={this.inputCommentHandler}></Input>
                                    </FormControl>
                                </div>
                            </div>

                        </div>
                    </Modal>

                </div>
            </div>
        )
    }
}

export default (withStyles(styles))(Profile);
// export default Profile;