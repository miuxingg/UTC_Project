import dayjs from 'dayjs';
import React from 'react';
import { IBlogApi } from '../../../../libs/apis/blog/types';

const BlogCard: React.FC<IBlogApi> = ({ id, title, content, createdAt }) => {
  return (
    <div className="col-md-6 col-lg-4 col-sm-12">
      <div className="post__itam">
        <div className="content">
          <h3>
            <a>{title}</a>
          </h3>
          <p>{content}</p>
          <div className="post__time">
            <span className="day">{dayjs(createdAt).format('DD/MM/YYYY')}</span>
            {/* <div className="post-meta">
              <ul>
                <li>
                  <a href="#">
                    <i className="bi bi-love" />
                    72
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bi bi-chat-bubble" />
                    27
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
