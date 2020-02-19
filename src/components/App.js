import React from "react";
import Comments from "./Comments";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";
import Edit from "./Edit";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      add: true,
      value: "",
      newAuthor: "",
      newCommentText: ""
    };
  }

  componentDidMount() {
    let comments = localStorage.getItem("data");
    comments = JSON.parse(comments);

    if (comments !== null) {
      this.setState({ comments });
    }
  }

  local() {
    let localData = JSON.stringify(this.state.comments);
    localStorage.setItem("data", localData);
  }

  deleteComment(key) {
    this.setState({
      comments: this.state.comments.filter((item, i) => i !== key)
    });

    this.local();
  }

  editComment(key) {
    const comments = this.state.comments.map((item, i) => {
      if (key === i) {
        return {
          author: item.author,
          commentText: item.commentText,
          dateComment: item.dateComment,
          edit: true
        };
      } else {
        return item;
      }
    });
    this.setState({ comments });
  }

  editText(ev) {
    this.setState({ value: ev.target.value });
  }

  saveEdit(key) {
    const value = this.state.value;
    const comments = this.state.comments.map((item, i) => {
      if (key === i && value !== "") {
        return {
          author: item.author,
          commentText: value,
          dateComment: item.dateComment,
          edit: false
        };
      } else {
        return {
          author: item.author,
          commentText: item.commentText,
          dateComment: item.dateComment,
          edit: false
        };
      }
    });

    this.setState({ comments, value: "" });
  }

  cancelEdit(key) {
    const comments = this.state.comments.map((item, i) => {
      if (key === i) {
        return {
          author: item.author,
          commentText: item.commentText,
          dateComment: item.dateComment,
          edit: false
        };
      } else {
        return item;
      }
    });
    this.setState({ comments });
  }

  addComment() {
    this.setState({
      add: false
    });
  }

  addAuthor(ev) {
    this.setState({ newAuthor: ev.target.value });
  }

  addNewText(ev) {
    this.setState({ newCommentText: ev.target.value });
  }

  addNewComment() {
    const comments = this.state.comments;
    if (this.state.newAuthor !== "" && this.state.newCommentText !== "") {
      comments.push({
        author: this.state.newAuthor,
        dateComment: new Date().toLocaleString(),
        commentText: this.state.newCommentText,
        edit: false
      });

      this.setState({
        comments,
        add: true,
        newAuthor: "",
        newCommentText: "",
        edit: false
      });

      this.local();
    } else {
      return alert("Заполните все поля!");
    }
  }

  cancelAddComment() {
    this.setState({
      add: true
    });
  }

  render() {
    return (
      <div className="comments">
        <ul className="comments__list">
          {this.state.comments !== null
            ? this.state.comments.map((item, i) =>
                !item.edit ? (
                  <CommentsList
                    key={i + item.dateComment}
                    author={item.author}
                    commentText={item.commentText}
                    dateComment={item.dateComment}
                    editComment={this.editComment.bind(this, i)}
                    deleteComment={this.deleteComment.bind(this, i)}
                  />
                ) : (
                  <Edit
                    author={item.author}
                    commentText={item.commentText}
                    dateComment={item.dateComment}
                    cancelEdit={this.cancelEdit.bind(this, i)}
                    saveEdit={this.saveEdit.bind(this, i)}
                    editText={this.editText.bind(this)}
                  />
                )
              )
            : null}
        </ul>
        {this.state.add ? (
          <Comments addComment={this.addComment.bind(this)} />
        ) : (
          <AddComment
            cancelAddComment={this.cancelAddComment.bind(this)}
            addAuthor={this.addAuthor.bind(this)}
            addNewText={this.addNewText.bind(this)}
            addNewComment={this.addNewComment.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default App;
