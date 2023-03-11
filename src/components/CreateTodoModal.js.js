import React, { useEffect, useState } from "react";
import api from "../config/api";
import style from "../styles/Form.module.scss";

import ModalBG from "../image/bg/Modal-bg.jpg";
import { useTodoContext } from "../hooks/useTodosContext";
import { useModalContext } from "../hooks/useModalContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateTodoModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState(null);

  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const { dispatch } = useTodoContext();
  const { modal, modalDispatch } = useModalContext();

  useEffect(() => {
    modalDispatch({
      type: "SET_MODAL",
      payload: modal,
    });
  }, [modal, modalDispatch]);

  const handleRetryForm = () => {
    if (title || description !== "") {
      setError(null);
    }
  };

  const handlePriority = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      const savedNote = {
        username: user.username,
        title,
        description,
        priority,
      };

      try {
        const res = await api.post(
          "https://scarlett-realism-api.onrender.com/api/notes",
          savedNote
        );
        console.log(res.response);
        setTitle("");
        setDescription("");
        setPriority("");
        setError(null);
        setEmptyFields([]);
        const json = res.data;
        dispatch({
          type: "POST_TODO",
          payload: json,
        });
        modalDispatch({
          type: "CLOSE_MODAL",
          payload: false,
        });
      } catch (error) {
        if (error.response.status === 400) {
          setError(error.response.data.message);
        } else {
          const json = error.response.data;
          console.log(json);
          setError(json.error);
          setEmptyFields(json.emptyFields);
        }
      }
    } else {
      alert("Please login or create an account to add a note");
    }
  };

  // console.log(todos);

  return (
    <div className={style.AddTodoModalContainer}>
      <div className={style.formModalOverlay}>
        <img
          src={ModalBG}
          alt="thumbnail by Kelly Sikkema"
          className={style.overlayPhoto}
        />
        <div className={style.attribute}>
          Photo by{" "}
          <Link to="https://unsplash.com/@kellysikkema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Kelly Sikkema
          </Link>
          on
          <Link to="https://unsplash.com/photos/Pmq77M23eU8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </Link>
        </div>
      </div>

      <div className={style.formModalContainer} onClick={handleRetryForm}>
        <div
          className={style.cancelBtn}
          onClick={() => {
            modalDispatch({
              type: "CLOSE_MODAL",
              payload: false,
            });
          }}
        >
          [ X ]
        </div>
        <h2>Add Todo</h2>
        <form
          onSubmit={handleSubmit}
          className={emptyFields.includes("priority") ? style.error : ""}
        >
          <div className={style.inputContainer}>
            <input
              type="text"
              id="title"
              placeholder="Pick up Grocies"
              onChange={(e) => setTitle(() => e.target.value)}
              value={title}
            />
            <label htmlFor="title">Title</label>
          </div>
          <div className={style.inputContainer}>
            <textarea
              type="text"
              id="description"
              cols={10}
              rows={5}
              placeholder="Pick up Grocies at market square"
              onChange={(e) => setDescription(() => e.target.value)}
              value={description}
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className={style.priorityContainer}>
            <span>Set Priority</span>
            <div className={style.priorityGroup}>
              <div>
                <input
                  type="radio"
                  id="low"
                  name="priority"
                  value="low"
                  checked={priority === "low"}
                  onChange={handlePriority}
                />
                <label htmlFor="low">Low</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="medium"
                  name="priority"
                  value="medium"
                  checked={priority === "medium"}
                  onChange={handlePriority}
                />
                <label htmlFor="medium">Medium</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="high"
                  name="priority"
                  value="high"
                  checked={priority === "high"}
                  onChange={handlePriority}
                />
                <label htmlFor="high">High</label>
              </div>
            </div>
          </div>

          <div className={style.buttonContainer}>
            <button
              type="submit"
              className={style.button}
              disabled={error && true}
            >
              Add Todo
            </button>
          </div>
          {error && (
            <div className={style.errorContainer}>
              <span className={style.errorText}>{error}</span>
              <span className={style.errorText}>{emptyFields.join(", ")}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTodoModal;