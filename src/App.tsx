import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PostsDetail from './view/posts/postsDetail';
import PostsForm from './view/posts/postsForm';
import PostsHome from './view/posts/postsHome';

function App() {
  return (
    <BrowserRouter>
      <Route exact path={'/'} component={PostsHome} />
      <Route exact path={'/postsForm'} component={PostsForm} />
      <Route exact path={'/postsDetails'} component={PostsDetail} />
    </BrowserRouter>
  );
}

export default App;
