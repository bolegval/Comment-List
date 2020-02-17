import React from "react";

export default props => (
  <li className="comments__item">
    <div>
      <p>
        <span>Автор: {props.author} </span>
        <span>Дата: {props.dateComment} </span>
        {props.commentText}
      </p>
      <button className="edit" onClick={props.editComment}>
        Редактировать
      </button>
      <button className="edit" onClick={props.deleteComment}>
        Удалить
      </button>
    </div>
  </li>
);
