import React, { useEffect, useState } from "react";
import api from "../config/api";
import styles from "../styles/TodoItem.module.scss";
import style from "../styles/Form.module.scss";
import { IoDocumentText } from "react-icons/io5";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format, parse } from "date-fns";
import { useLocation } from "react-router-dom";
import { useModalContext } from "../hooks/useModalContext";
import { useAuthContext } from "../hooks/useAuthContext";
// import style from "../styles/Card.module.scss";

const TodoItem = () => {
  const { checked, modalDispatch } = useModalContext();
  const [editMode, setEditMode] = useState(false);
  const [note, setNote] = useState(null);
  const [username, setUsername] = useState("");
  const [noteUsername, setNoteUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [modeMenu, setModeMenu] = useState(false);
  const [completedTask, setCompletedTask] = useState();
  const { user } = useAuthContext();

  const time = format(new Date(note && note.updatedAt), "HH:mm:ss a");

  const location = useLocation();
  const id = location.pathname.split("/")[1];

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  useEffect(() => {
    const fetchSingle = async () => {
      const response = await api.get(
        "https://scarlett-realism-api.onrender.com/api/notes/" + id
      );

      setNote(response.data);
      setNoteUsername(response.data.username);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setPriority(response.data.priority);
      modalDispatch({
        type: "SET_CHECKED",
        payload: response.data.completedTask,
      });
    };

    fetchSingle();
  }, [id, modalDispatch]);

  useEffect(() => {
    if (checked !== null) {
      setCompletedTask(checked);
    }
  }, [checked]);

  console.log(note);

  const handleUpdate = async () => {
    try {
      await api.put("/notes/" + id, {
        username,
        title,
        description,
        priority,
        completedTask: checked,
      });
      setEditMode(false);
    } catch (error) {
      console.log(error.response.data.message);
      setEditMode(false);
    }
  };

  const handleCompletedTask = (e) => {
    if (user.username === noteUsername) {
      modalDispatch({
        type: "TOGGLE",
      });

      console.log("checked:", !checked);
      console.log("completed task:", completedTask);

      updateCompleteTask(!checked);
    } else {
      alert("You can only edit a note you posted!!! ");
    }
  };

  const updateCompleteTask = async (parameter) => {
    console.log("parameter", parameter);
    if (parameter !== null) {
      try {
        const res = await api.put("/notes/" + id, {
          username,
          completedTask: parameter,
        });

        const json = res.data;
        console.log(json);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  const handlePriority = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };

  if (note === null) {
    <div>Loading...</div>;
  }

  return (
    <>
      {/* <div className={styles.overLay}>OVERLAY</div> */}
      <div className={styles.stickyMenu}>
        <div className={styles.stickyMenuContainer}>
          <div className={styles.docContainer}>
            <div className={styles.docDetails}>
              <div className={styles.logoContainer}>
                <IoDocumentText size={50} className={styles.logoImage} />
              </div>
              <div className={styles.docName}>
                <span> {title} </span>
              </div>
            </div>
            <div className={styles.docModeDetails}>
              <div className={styles.lastEdit}>
                <span>
                  Last updated was on{" "}
                  {note && format(new Date(note.updatedAt), "MM/dd/yyyy")} at{" "}
                  {format(
                    parse(time.split(":", 2).join(":"), "HH:mm", new Date()),
                    "hh:mm a"
                  )}{" "}
                  by {noteUsername}
                </span>
              </div>
              <div
                className={styles.docMode}
                onClick={() => {
                  setModeMenu(!modeMenu);
                }}
              >
                <span className={styles.menuButton}>
                  {editMode ? "Edit mode" : "View mode"}
                </span>
                {modeMenu && (
                  <div className={styles.menuDropdown}>
                    <div
                      onClick={() => {
                        setEditMode(false);
                      }}
                    >
                      <span>View mode</span>
                      <span>Read your notes and notes</span>
                    </div>
                    <div
                      onClick={() => {
                        setEditMode(true);
                      }}
                    >
                      <span>Edit mode</span>
                      <span>Edit your notes and notes</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.priority}>
                <span className={styles.priorityValue}>
                  Priority:{" "}
                  <span
                    className={`${priority === "high" ? styles.high : ""}
                    ${priority === "medium" ? styles.medium : ""}
                    ${priority === "low" ? styles.low : ""}
                  `}
                  >
                    {priority}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.profilePriority}>
            <div className={styles.profile}>
              {" "}
              {noteUsername.substring(0, 1)}{" "}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div
          className={`${styles.card} ${priority === "high" ? styles.high : ""}
                    ${priority === "medium" ? styles.medium : ""}
                    ${priority === "low" ? styles.low : ""} ${
            checked ? styles.completedTodo : ""
          }`}
        >
          {user && (
            <div className={styles.interactiveBtn}>
              {checked ? (
                <input
                  className={style.trueCheck}
                  type="checkbox"
                  name="checkbox"
                  checked
                  onChange={(e) => handleCompletedTask(e)}
                />
              ) : (
                <input
                  className={style.trueCheck}
                  type="checkbox"
                  name="checkbox"
                  checked={false}
                  onChange={(e) => handleCompletedTask(e)}
                />
              )}
            </div>
          )}

          <div className={styles.todoDetails}>
            {editMode ? (
              <input
                type="text"
                name="title"
                placeholder={title}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className={styles.titleInput}
              />
            ) : (
              <h2 className={styles.title}>{note && title}</h2>
            )}
            {editMode ? (
              <textarea
                name="description"
                cols="30"
                rows="10"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder={description}
                className={styles.descriptionInput}
              ></textarea>
            ) : (
              <p className={styles.description}>{description}</p>
            )}

            {editMode && (
              <div className={style.priorityContainer}>
                <span>Set Priority</span>
                <div className={styles.priorityGroup}>
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
            )}

            {editMode && (
              <div>
                <button className={styles.updateButton} onClick={handleUpdate}>
                  Update
                </button>
              </div>
            )}
            <span className={styles.createdAt}>
              {checked ? (
                <i>
                  {" "}
                  Completed note{" "}
                  {note &&
                    formatDistanceToNow(new Date(note.updatedAt), {
                      addSuffix: true,
                    })}
                </i>
              ) : (
                <i>
                  {" "}
                  Created{" "}
                  {note &&
                    formatDistanceToNow(new Date(note.createdAt), {
                      addSuffix: true,
                    })}{" "}
                </i>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
