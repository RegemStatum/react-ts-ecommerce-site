import React, { FC } from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { AiFillHeart } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import { BsArrowRightShort } from "react-icons/bs";
import postImg2 from "../../../assets/images/index/post-2-img.jpg";
import postImg3 from "../../../assets/images/index/post-3-img.jpg";

const Blog: FC = () => {
  return (
    <section className="blog container-2">
      <div className="ad">
        <p className="title">number of day</p>
        <span className="number">197</span>
        <h4 className="offer">
          combo sale off <br /> up to 50%
        </h4>
        <a href="/" className="btn">
          read more
        </a>
      </div>
      <div className="popular">
        <h5>popular</h5>
        <div className="inner-container">
          <div className="post big-post">
            <div className="info">
              <p className="date">
                <FiClock className="clock" /> Date: April 05, 2017
              </p>
              <h5>The best Summer style from Milan Fashion Week</h5>
              <div className="discuss">
                <div className="comments">
                  <GoCommentDiscussion />
                  05
                </div>
                <div className="likes">
                  <AiFillHeart /> 150
                </div>
              </div>
            </div>
          </div>
          <div className="small-posts">
            <div className="post small-post">
              <img src={postImg2} alt="post2" />
              <div className="info">
                <p className="date">
                  <FiClock className="clock" />
                  Date: April 05, 2017
                </p>
                <h5>
                  Fashion Week <br />
                  London
                </h5>
                <div className="discuss">
                  <div className="comments">
                    <GoCommentDiscussion />
                    05
                  </div>
                  <div className="likes">
                    <AiFillHeart /> 150
                  </div>
                </div>
              </div>
            </div>
            <div className="post small-post">
              <img src={postImg3} alt="post3" />
              <div className="info">
                <p className="date">
                  <FiClock className="clock" />
                  Date: April 05, 2017
                </p>
                <h5>
                  Fashion Show <br />
                  2017
                </h5>
                <div className="discuss">
                  <div className="comments">
                    <GoCommentDiscussion />
                    05
                  </div>
                  <div className="likes">
                    <AiFillHeart /> 150
                  </div>
                </div>
              </div>
            </div>
            <a href="/">
              View All <BsArrowRightShort />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
