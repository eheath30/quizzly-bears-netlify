import React, { useState } from "react";
import { CreateGame } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "@material-ui/core";
import { storeUser } from "../../actions";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";
import Backdrop from "./Backdrop";
import { loadConfig } from "@babel/core/lib/config/files";
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 30,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    transition: { ease: "easeInOut" },
  },
};
const Home = () => {
  const [createGame, setCreateGame] = useState(false);
  const [username, setUsername] = useState("");
  const [checkForm, setCheckForm] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const handleCreateGameModal = () => setCreateGame(true);
  const handleCloseGameModal = () => setCreateGame(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(storeUser(username));
    socket.emit("join game", {
      username,
      room: lobbyCode,
    });
    setUsername("");
    setLobbyCode("");
    setCheckForm(true);
  };
  const handleUserName = (e) => {
    e.target.value.length > 8
      ? alert("Max length 8 Characters.")
      : setUsername(e.target.value);
  };
  const handleLobbyCode = (e) => {
    setLobbyCode(e.target.value);
  };
  function sendToLeaderboard() {
    navigate("/highscores");
  }
  return (
    <section className="container-fluid pb-3 d-flex flex-column">
      <div className="parent" style={{ height: 'calc(7vw + 7vh + 4vmin)' }}>
        <div className="child">
          <motion.h1
            className="title"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 0.9 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 0.8 }}
            whileTap={{ scale: 0.75 }}
            transition={{
              default: {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
              },
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 400,
                restDelta: 0.001,
              },
            }}
          >
            Ready To Quiz?
          </motion.h1>
        </div>
      </div>
      <div
        className="container col-lg-4 col-md-6 col-sm-10 col-12"
        id="landingPageDiv"
      >
        <div>
          <div className="container text-center">
            <motion.div
              className="card px-1 pt-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.05 }}
              transition={{
                default: {
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                },
                scale: {
                  type: "spring",
                  damping: 10,
                  stiffness: 400,
                  restDelta: 0.001,
                },
              }}
            >
              <div className="d-flex flex-column p-2">
                <div className="create-form-container">
                  {/* INIT OF FORM */}

                  <form onSubmit={handleFormSubmit}>
                    <motion.div
                      className="input-group justify-content-center"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        default: {
                          duration: 0.3,
                          ease: [0, 0.71, 0.2, 1.01],
                        },
                        scale: {
                          type: "spring",
                          damping: 10,
                          stiffness: 400,
                          restDelta: 0.001,
                        },
                      }}
                    >
                      {/* THIS IS THE INPUT FOR USERNAME AND CALLING FUNCTION HANDLE-USER-NAME */}
                      <input
                        required
                        label="Username"
                        onChange={handleUserName}
                        value={username}
                        placeholder="Username"
                        className="input-group-text border border-primary m-1 w-100"
                      />
                    </motion.div>
                    <motion.div
                      className="input-group justify-content-center"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        default: {
                          duration: 0.3,
                          ease: [0, 0.71, 0.2, 1.01],
                        },
                        scale: {
                          type: "spring",
                          damping: 10,
                          stiffness: 400,
                          restDelta: 0.001,
                        },
                      }}
                    >
                      {/* THIS IS THE INPUT FOR THE USER TO PLACE THE LOBBY CODE GENERATED BY THE HOST */}
                      <input
                        required
                        label="Game ID"
                        onChange={handleLobbyCode}
                        minlength="9"
                        maxlength="9"
                        value={lobbyCode}
                        placeholder="Room ID"
                        className="input-group-text border border-primary m-1 w-100"
                      />
                    </motion.div>
                    <motion.div
                      className="create-input  p-1"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        default: {
                          duration: 0.3,
                          ease: [0, 0.71, 0.2, 1.01],
                        },
                        scale: {
                          type: "spring",
                          damping: 10,
                          stiffness: 400,
                          restDelta: 0.001,
                        },
                      }}
                    >
                      {/* SUBMIT BUTTON TO JOIN THE GAME ROOM */}
                      <button
                        type="submit"
                        className="btn btn-primary my-1 w-100"
                      >
                        Join Game
                      </button>
                    </motion.div>
                  </form>
                  {/* END OF FORM */}
                  {checkForm && <Navigate to="/lobby" />}
                </div>
                <span className="display-5">OR</span>
                {/* Create Game Button */}
                <motion.button
                  onClick={handleCreateGameModal}
                  className="btn btn-success my-1 mx-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    default: {
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    },
                    scale: {
                      type: "spring",
                      damping: 10,
                      stiffness: 400,
                      restDelta: 0.001,
                    },
                  }}
                >
                  Create Game
                </motion.button>
                {/* Create Game Button */}
                <motion.button
                  onClick={sendToLeaderboard}
                  className="btn btn-transparent mt-1 mx-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 0.8 }}
                  whileHover={{ scale: 0.85 }}
                  transition={{
                    default: {
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    },
                    scale: {
                      type: "spring",
                      damping: 10,
                      stiffness: 400,
                      restDelta: 0.001,
                    },
                  }}
                >
                  Leaderboard
                </motion.button>
              </div>
              <Backdrop onClick={handleCloseGameModal}>
                <Modal
                  open={createGame}
                  className="mx-auto col-lg-4 col-md-6 col-sm-8 col-12 "
                  style={{ top: "35vh" }}
                >
                  <motion.div
                    variants={dropIn}
                    onClick={(e) => e.stopPropagation()}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ scale: 1.05 }}
                  >
                    <CreateGame />
                  </motion.div>
                </Modal>
              </Backdrop>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
