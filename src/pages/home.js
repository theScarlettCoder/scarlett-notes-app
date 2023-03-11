import { useEffect, useState } from "react";
import style from "../styles/Home.module.scss";
import { Card } from "../components/Card";
import Masonry from "react-masonry-css";

import { MdAddCircle } from "react-icons/md";
import api from "../config/api";
import { useModalContext } from "../hooks/useModalContext";
import CreateTodoModal from "../components/CreateTodoModal.js.js";
import { useTodoContext } from "../hooks/useTodosContext";

const Home = () => {
  const { todos, dispatch } = useTodoContext();
  const { modal, modalDispatch } = useModalContext();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(
          "https://scarlett-realism-api.onrender.com/api/notes/"
        );

        const json = res.data;
        dispatch({
          type: "SET_TODOS",
          payload: json,
        });
        setNotes(json);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchNotes();
  }, [dispatch]);

  console.log("notes: ", notes);
  console.log("todos: ", todos);

  return (
    <div>
      {modal ? (
        <CreateTodoModal />
      ) : (
        <div className={style.content}>
          <Masonry
            breakpointCols={{
              default: 3,
              1024: 2,
              600: 1,
            }}
            className={style.my_masonry_grid}
            columnClassName={style.my_masonry_grid_column}
          >
            {todos && todos.map((todo) => <Card key={todo._id} todo={todo} />)}
          </Masonry>
          <div className={style.addTodoButtonContainer}>
            <MdAddCircle
              className={style.addTodoButton}
              onClick={() => {
                modalDispatch({
                  type: "SHOW_MODAL",
                  payload: true,
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
