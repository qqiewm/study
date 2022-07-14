import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { getAllPosts } from '../../service/posts.service';

const PostsHome = () => {
  const history = useHistory();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await getAllPosts();
    setPostList(res);
    console.log(res);
  };

  const moveToWrite = () => {
    history.push('./postsForm');
  };

  const setDateFormat = (date) => {
    const splitedDate = date.split('T');
    const splitedTime = splitedDate[1].split(':');
    //  ${splitedTime[0]}:${splitedTime[1]
    return `${splitedDate[0]} ${splitedTime[0]}:${splitedTime[1]}`;
  };

  const moveToDetail = (data) => {
    history.push({ pathname: './postsDetails', state: data });
  };

  return (
    <Container>
      <PostListContainer>
        <WritePostButton onClick={moveToWrite}>{'글 등록'}</WritePostButton>
        <PostInfoTitle>
          <TextBox>번호</TextBox>
          <TextBox>제목</TextBox>
          <TextBox>작성자</TextBox>
          <TextBox>최종수정일</TextBox>
        </PostInfoTitle>
        {postList.map((post) => {
          return (
            <OnePostInfoBox key={post.id}>
              <TextBox>{post.id}</TextBox>
              <TitleBox onClick={() => moveToDetail(post.id)}>
                {post.title}
              </TitleBox>
              <TextBox>{post.author}</TextBox>
              <TextBox>{setDateFormat(post.modifedDate)}</TextBox>
            </OnePostInfoBox>
          );
        })}
      </PostListContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

const WritePostButton = styled.button`
  color: white;
  background-color: skyblue;
  border-radius: 8px;
  width: 70px;
  padding: 12px;
  border: none;
`;

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const PostInfoTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  width: 800px;
  justify-content: space-between;
  background-color: rgb(111, 207, 73, 0.5);
`;

const OnePostInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 800px;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

const TextBox = styled.div`
  width: 25%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const TitleBox = styled.div`
  width: 25%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
export default PostsHome;
