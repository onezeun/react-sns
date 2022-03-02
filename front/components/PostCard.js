import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Button, Card, Comment, List, Popover } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import ButtonGroup from 'antd/lib/button/button-group';
import Avatar from 'antd/lib/avatar/avatar';

import PostImages from './PostImages';
import CommentForm from './CommentForm';



const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);  // false는 true로 true는 false로 (이전데이터를 기반으로 다음 데이터를 만듦)
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const id = useSelector((state) => state.user.me?.id);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        // 배열 안에는 항상 key를 넣어줘야 함
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
          ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
          : <HeartOutlined key="heart" onClick={onToggleLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <ButtonGroup>
                {/* 내 ID와 작성자 ID가 같을때 수정, 삭제 가능 다르면 신고 가능 */}
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </ButtonGroup>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        {/* 게시글 부분 */}
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
        <Button></Button>
      </Card>
      {commentFormOpened && (
        <div>
          {/* post를 넘겨주는 이유 : 어떤 게시글에 댓글을 달건지 정보가 필요하기 때문에 
          게시글의 id를 받아야 하기 때문에*/}
          <CommentForm post={post}/>
          <List
          header={`${post.Comments.length}개의 댓글`}
          itemLayout="horizontal"
          dataSource={post.Comments}
          renderItem={(item) => (
            <li>
              <Comment
              author={item.User.nickname}
              avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
              content={item.content}
              />
            </li>
          )}
          />          
        </div>
      )}
    </div>
  );
};



PostCard.propTypes = {
  // 더 자세하게 작성하려면 shape을 쓰고 안에 속성을 넣어주면 됨
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
