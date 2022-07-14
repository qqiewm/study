import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { savePosts } from '../../service/posts.service';

const PostsForm = () => {
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    author: '',
  });

  const save = async (post) => {
    const res = await savePosts(post);
    if (res) {
      history.push({ pathname: './postsDetails', state: res });
    } else {
      alert('게시물 작성에 실패했습니다.');
    }
  };

  return (
    <Container>
      <PostInput
        placeholder="제목을 입력하세요"
        value={postData.title}
        onChange={(e) => {
          setPostData({ ...postData, title: e.target.value });
        }}
      />
      <PostInput
        placeholder="작성자를 입력하세요"
        value={postData.author}
        onChange={(e) => {
          setPostData({ ...postData, author: e.target.value });
        }}
      />
      <PostContent
        placeholder="내용을 입력하세요"
        value={postData.content}
        onChange={(e) => {
          setPostData({ ...postData, content: e.target.value });
        }}
      />
      <ButtonContainer>
        <CommonButton
          color={'white'}
          bgColor={'#4AA8D8'}
          onClick={() => save(postData)}
        >
          등록
        </CommonButton>
        <CommonButton
          color={'#4AA8D8'}
          bgColor={'white'}
          onClick={() => history.push('/')}
        >
          취소
        </CommonButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

const PostInput = styled.input`
  width: 600px;
  margin-bottom: 10px;
  font-size: 1rem;
  padding: 4px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const PostContent = styled.textarea`
  width: 600px;
  margin-bottom: 10px;
  font-size: 1rem;
  padding: 4px;
`;

const CommonButton = styled.button`
  display: flex;
  padding: 10px 20px 10px 20px;
  margin-right: 10px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: 2px solid #4aa8d8;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
  }
`;

export default PostsForm;
