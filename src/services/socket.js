import io from 'socket.io-client';

export const socket = io.connect('http://localhost:4000');

export function emitJoinRoom(noteId) {
  if (!noteId) return;

  socket.emit('join-room', noteId);
}

export function emitTyping(noteId, value) {
  if (!noteId) return;

  socket.emit('sharing-note-typed', noteId, value);
}

export function listenForTyping(setValue) {
  socket.on('sharing-note-typed', value => setValue(value));
}
