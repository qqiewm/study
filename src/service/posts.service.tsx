import axios from 'axios';

const config: any = {
  'Content-Type': 'application/json',
};


//게시물 전체 조회
export const getAllPosts = async () => {
  try {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/posts`)
      .then((response) => {
        console.log(response);
        return response.data;
      });
  } catch (error) {
    console.log('posts.service.getAllPost error' + error);
  }
};

//게시물 저장
export const savePosts = async (parameter: any) => {
  const request = {
    title: parameter.title,
    author: parameter.author,
    content: parameter.content,
  };

  try {
    return await axios
      .post(`${process.env.REACT_APP_API_URL}/v1/posts`, request, config)
      .then((response) => {
        console.log(response);
        return response.data;
      });
  } catch (error) {
    console.log('posts.service.savePosts error' + error);
  }
};

//게시물 상세 조회
export const getOnePost = async (parameter: string) => {
  try {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/posts/${parameter}`)
      .then((response) => {
        console.log(response);
        return response.data;
      });
  } catch (error) {
    console.log('posts.service.getOnePost error' + error);
  }
};

//게시물 수정
export const updatePost = async (id: any, parameter: any) => {
  const request = {
    title: parameter.title,
    content: parameter.content,
  };
  try {
    return await axios
      .put(`${process.env.REACT_APP_API_URL}/v1/posts/${id}`, request, config)
      .then((response) => {
        console.log(response);
        return response.data;
      });
  } catch (error) {
    console.log('posts.service.updatePost error' + error);
  }
};

export const deletePost = async (id: any) => {
  try {
    return await axios
      .delete(`${`${process.env.REACT_APP_API_URL}/v1/posts/${id}`}`)
      .then((response) => {
        console.log(response);
        return response.data;
      });
  } catch (error) {
    console.log('posts.service.delete');
  }
};
