import React from "react";

export default props => (
  <div>
    <button className="btn__add-comment" onClick={props.addNewComment}>
      Добавить комментарий
    </button>
    <button onClick={props.cancelAddComment}>Отмена</button>
    <div className="add-comment">
      <p>Ваше имя:</p>
      <input
        type="text"
        className="comment__author"
        placeholder="Ваше имя"
        value={props.newAuthor}
        onChange={props.addAuthor}
      />
      <p>Ваш комментарий:</p>
      <textarea
        type="text"
        className="comment__text"
        placeholder="Напишите комментарий"
        value={props.newCommentText}
        onChange={props.addNewText}
      ></textarea>
    </div>
  </div>
);
