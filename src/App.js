import React from 'react';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Chapters from './pages/Chapters';
import Exam from './pages/Exam';
import Dictionary from './pages/Dictionary';
import Creator from './pages/Creator';

import { Routes, Route, Navigate } from 'react-router-dom';

import { addChapterState, loadingState, wordsState } from './recoil';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react/cjs/react.development';
import getWords from './util/getWords';
import setWordsStatsList from './util/setWordsStatsList';

function App() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [words, setWords] = useRecoilState(wordsState);
  const [addChapter, setAddChapter] = useRecoilState(addChapterState);

  useEffect(() => {
    getWords(setWords, setLoading);
  }, [addChapter]);

  if (loading) {
    return <Loading />;
  }

  setWordsStatsList(words);

  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/chapters' element={<Chapters />} />
      <Route path='/chapters/:chapter' element={<Chapters />} />
      <Route exact path='/chapters/create' element={<Creator />} />
      <Route path='/chapters/create/:chapterName' element={<Creator />} />
      <Route exact path='/exam/:chapter' element={<Exam />} />
      <Route path='/dictionary' element={<Dictionary />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
