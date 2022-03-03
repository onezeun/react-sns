import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {   // 해시태그 모양은
          return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link> // 링크로 감싸서 리턴 slice(1)은 #을 때준 것
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = { postData: PropTypes.string.isRequired };

export default PostCardContent;