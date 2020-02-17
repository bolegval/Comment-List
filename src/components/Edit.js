import React from "react";

export default props => (
  <div>
    <p>
      <span>
        Автор:
        {props.author}
      </span>
      <span>Дата: {props.dateComment} </span>
      <textarea
        defaultValue={props.commentText}
        value={props.value}
        onChange={props.editText}
      />
    </p>
    <button className="save" onClick={props.saveEdit}>
      Сохранить
    </button>
    <button onClick={props.cancelEdit}>Отмена</button>
  </div>
);
