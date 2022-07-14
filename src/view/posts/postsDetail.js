import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';
import {
  deletePost,
  getOnePost,
  updatePost,
} from '../../service/posts.service';

const PostsDetail = ({ location }) => {
  const history = useHistory();
  const postId = location.state;
  const [updateMode, setUpdateMode] = useState(false);

  const [postDetail, setPostDetail] = useState({
    id: '',
    title: '',
    author: '',
    content: '',
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await getOnePost(postId);
    setPostDetail({
      id: res.id,
      title: res.title,
      author: res.author,
      content: res.content,
    });
  };

  const onClickRedButton = (isUpdate) => {
    if (isUpdate) {
      setUpdateMode(false);
    } else {
      history.push('/');
    }
  };

  const onClickBlueButton = async (isUpdate, post) => {
    if (isUpdate) {
      const res = await updatePost(postId, post);
      console.log(res);
      setUpdateMode(!isUpdate);
    } else {
      setUpdateMode(!isUpdate);
    }
  };

  const onClickdeletePost = async (id) => {
    const res = await deletePost(id);
    if (res) {
      alert(`${id}번 게시물이 삭제되었습니다.`);
      history.push('/');
    }
  };

  return (
    <Container>
      <PageTitle>{updateMode ? '게시글 수정' : '상세내용'}</PageTitle>
      <ContentContainer>
        <ContentLabel>글 번호</ContentLabel>
        <ContentInput value={postDetail.id} disabled />

        <ContentLabel>제목</ContentLabel>
        <ContentInput
          value={postDetail.title}
          disabled={!updateMode}
          onChange={(e) =>
            setPostDetail({ ...postDetail, title: e.target.value })
          }
        />

        <ContentLabel>작성자</ContentLabel>
        <ContentInput value={postDetail.author} disabled />

        <ContentLabel>내용</ContentLabel>
        <ContentTextArea
          value={postDetail.content}
          disabled={!updateMode}
          onChange={(e) =>
            setPostDetail({ ...postDetail, content: e.target.value })
          }
        />
      </ContentContainer>
      <ButtonContainer>
        <SaveOrEditButton
          borderColor={'#4AA8D8'}
          bgColor={'#4AA8D8'}
          color={'white'}
          onClick={() => onClickBlueButton(updateMode, postDetail)}
        >
          {updateMode ? '저장' : '수정'}
        </SaveOrEditButton>

        <CancelOrPrevButton
          isUpdateMode={updateMode}
          onClick={() => onClickRedButton(updateMode)}
        >
          {updateMode ? '취소' : '이전'}
        </CancelOrPrevButton>
        <DeleteButton onClick={() => onClickdeletePost(postId)}>
          {'삭제'}
        </DeleteButton>
      </ButtonContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;
const ContentContainer = styled.div`
  margin: 20px 0 20px 0;
`;
const ContentLabel = styled.div`
  margin-top: 10px;
  font-size: 1rem;
`;
const ContentInput = styled.input`
  padding: 4px;
  font-size: 1rem;
  width: 500px;
`;

const ContentTextArea = styled.textarea`
  padding: 4px;
  font-size: 1rem;
  width: 500px;
  height: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SaveOrEditButton = styled.button`
  display: flex;
  padding: 10px 20px 10px 20px;
  margin-right: 10px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: 2px solid;
  border-color: ${(props) => props.borderColor};
  border-radius: 8px;
  &:hover {
    cursor: pointer;
  }
`;
const CancelOrPrevButton = styled.button`
  display: flex;
  padding: 10px 20px 10px 20px;
  margin-right: 10px;

  border: 2px solid;
  border-color: ${(props) => props.borderColor};
  border-radius: 8px;
  border-color: gray;

  ${({ isUpdateMode }) => css`
    background-color: ${isUpdateMode ? 'white' : 'gray'};
    color: ${isUpdateMode ? 'gray' : 'white'};
  `}
  &:hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  padding: 10px 20px 10px 20px;
  margin-right: 10px;
  background-color: #c4302b;

  color: white;
  border: 2px solid #c4302b;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
  }
`;
const PageTitle = styled.div`
  font-size: 2rem;
`;

export default PostsDetail;
