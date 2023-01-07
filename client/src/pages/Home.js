import React from 'react';
import axios from "axios";
import { useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {AuthContext} from '../helpers/AuthContext';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const {authState} = useContext(AuthContext);

    let navigate = useNavigate();
    useEffect(() => {

        if(!localStorage.getItem("accessToken")) {
            navigate("/login");
        } else {
            axios.get("http://localhost:3001/posts", { headers: {accessToken: localStorage.getItem("accessToken") } }).then((res) => {
            setListOfPosts(res.data.listOfPosts);
            setLikedPosts(
                res.data.likedPosts.map((like) => {
                return like.PostId;
                })
            );
            });
        }
    }, []);

    const like = (postId) => {
        axios.post("http://localhost:3001/likes", { PostId: postId }, { headers: {accessToken: localStorage.getItem("accessToken") } }).then((res) => {
            setListOfPosts(listOfPosts.map((post) => {
                if (post.id == postId) {
                    if (res.data.liked) {
                        return {...post, Likes: [...post.Likes, 0]};
                    } else {
                        const likesArray = post.Likes;
                        likesArray.pop();
                        return {...post, Likes: likesArray};
                    }
                } else {
                    return post;
                }
            }));

            if (likedPosts.includes(postId)) {
                setLikedPosts(
                  likedPosts.filter((id) => {
                    return id != postId;
                  })
                );
              } else {
                setLikedPosts([...likedPosts, postId]);
              }
        });
    };
  return (
    <div>
        {
            listOfPosts.map((value, key) => {
                return ( 
                    <div className="post" > 
                        <div className="title">
                            { value.title }
                        </div>
                        <div className="body" onClick={() => {
                        navigate(`/post/${value.id}`)
                        }}>
                            { value.postText }
                        </div>
                        <div className="footer">
                            { value.username }
                            <ThumbUpAltIcon
                                onClick={() => {
                                    like(value.id);
                                }}
                                className={
                                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                                }
                                />
                            <label>{value.Likes.length}</label>
                        </div>
                    </div>
                );
            })
        }  
    </div>
  )
}

export default Home
