import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Entrance from '../../components/Entrance';
import MainPage from '../../pages/MainPage';
import Loading from '../../components/shared/Loading';
import requestBranchList from '../../api/requestBranchList';
import EditorPage from '../../containers/EditorContainer';
import requestCurrentUser from '../../api/requestCurrentUser';

export default function App({
  hasToken,
  currentUser,
  onLogin,
  onLogout,
  onCreateBranch,
  togglePrivateMode,
  isPrivateMode,
  getBranchList,
  branchList,
  currentNote,
}) {
  const history = useHistory();
  const [keyword, setKeyword] = useState('');
  const [skippedBranchNumber, setSkippedBranchNumber] = useState(0);

  useEffect(() => {
    if (!hasToken) {
      history.push('/login');
      return;
    }

    loadCurrentUser();

    async function loadCurrentUser() {
      const currentUser = await requestCurrentUser();

      if (!currentUser) return;

      onLogin(currentUser);
    };
  }, []);

  useEffect(() => {
    console.log(skippedBranchNumber,'skiped')
    async function loadBranchList() {
      const branchList = await requestBranchList(
        currentUser, isPrivateMode, keyword, skippedBranchNumber
      );
      console.log(branchList,'blbl');
      getBranchList(branchList);
    }

    if (currentUser) loadBranchList();
  }, [currentUser, isPrivateMode, keyword, skippedBranchNumber]);

  function handleInput(event) {
    const query = event.target.keyword.value;

    if (!query) return;

    setKeyword(query);
  }

  function skipBranch() {
    setSkippedBranchNumber(skippedBranchNumber + 10);
  }


  return (
    <>
      {
        !hasToken
        && <Entrance onLogin={onLogin} />
      }
      {
        hasToken && !currentUser
        && <Loading text='정보를 불러오고 있어요' />
      }
      {
        hasToken && currentUser
        && <MainPage
          onLogout={onLogout}
          isPrivateMode={isPrivateMode}
          handleOnClick={togglePrivateMode}
          currentUser={currentUser}
          handleInput={handleInput}
          branchList={branchList}
          onLoad={getBranchList}
          onScroll={skipBranch}
        />
      }
      {/* {
        hasToken && currentUser
        && <EditorPage
          currentNote={currentNote}
          onCreateBranch={onCreateBranch}
        />
      } */}
    </>
  );
}