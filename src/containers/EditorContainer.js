import { connect } from 'react-redux';
import EditorPage from '../pages/EditorPage';
import {
  toggleShowChangesMode,
  setIsModifiedToTrue,
  setIsModifiedToFalse,
  setNewBlocksCandidate,
  removeNewBlocksCandidate,
  setCurrentNoteAndBranch,
  setSharedUsers
} from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    onShowModificationsModeToggle() {
      dispatch(toggleShowChangesMode());
    },
    onNoteModify(blocks, isModified) {
      dispatch(setNewBlocksCandidate(blocks));
      if (isModified) return;
      dispatch(setIsModifiedToTrue());
    },
    onSave(note, branch) {
      dispatch(setIsModifiedToFalse());
      dispatch(removeNewBlocksCandidate());
      dispatch(setCurrentNoteAndBranch(note, branch));
    },
    onNoteLoad(note, branch) {
      dispatch(setCurrentNoteAndBranch(note, branch));
    },
    onNoteChange(note, branch) {
      dispatch(setCurrentNoteAndBranch(note, branch));
    },
    onSharedUsersLoad(sharedUsers) {
      dispatch(setSharedUsers(sharedUsers));
    },
    onHomeButtonClick() {
      dispatch(setCurrentNoteAndBranch(null, null));
    }
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentBranch: state.currentBranch,
    currentNote: state.currentNote,
    isShowModificationsMode: state.isShowModificationsMode,
    isModified: state.isModified,
    newBlocksCandidate: state.newBlocksCandidate,
    authorName: state.authorName,
    sharedUsers: state.sharedUsers
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
