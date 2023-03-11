import { MdDelete } from "react-icons/md";
import { useDelete } from "../hooks/useDelete";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import style from "../styles/Card.module.scss";
import { Link } from "react-router-dom";

export const Card = ({ todo }) => {
  const { handleDelete, error, isLoading } = useDelete();

  const deleteHandler = async () => {
    console.log(todo._id);
    await handleDelete(todo._id);
  };

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    console.log("loading");
    return <div>Loading...</div>;
  }

  return (
    <div
      key={todo._id}
      className={`${style.card} ${todo.priority === "low" ? style.low : ""} ${
        todo.priority === "medium" ? style.medium : ""
      } ${todo.priority === "high" ? style.high : ""} ${
        todo.completedTask ? style.completedTodo : ""
      }`}
    >
      <div className={style.interactiveBtn}>
        {/* <div className={style.toggleContainer}>
          <div
            className={todo.completedTask ? style.check : style.not_active}
          ></div>
        </div> */}
        <div className={style.deleteContainer}>
          <MdDelete className={style.delete} onClick={deleteHandler} />
        </div>
      </div>
      <Link to={"/" + todo._id} className={style.cardLink}>
        <div>
          <h2 className={style.title}> {todo.title} </h2>
          <p className={style.description}>
            {" "}
            {todo.description.slice(0, 500)}{" "}
          </p>
          <span className={style.createdAt}>
            {todo.completedTask ? (
              <i>
                {" "}
                Completed Todo{" "}
                {formatDistanceToNow(new Date(todo.updatedAt), {
                  addSuffix: true,
                })}{" "}
              </i>
            ) : (
              <i>
                {" "}
                Created{" "}
                {formatDistanceToNow(new Date(todo.createdAt), {
                  addSuffix: true,
                })}{" "}
              </i>
            )}
          </span>
        </div>
      </Link>{" "}
    </div>
  );
};
