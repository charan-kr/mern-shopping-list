import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userAction";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";

function Login() {
  const error = useSelector(state => state.error);
  const { msg, id } = error;

  const [modal, setModal] = useState(false);
  const [validEmail, setValidEmail] = useState(null);
  const [validPass, setValidPass] = useState(null);
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (id === "LOGIN_FAILED") {
      if (msg === "enter all credintials") {
        setValidEmail(true);
        setValidPass(true);
      } else if (msg === "Email doesnot exsist") setValidEmail(true);
      else setValidPass(true);
    } else {
      setLogin({ email: "", password: "" });
      modal && toggle();
    }
  }, [msg, id]);

  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const handleLogin = () => {
    dispatch(loginUser(login));
  };
  const handelForm = e => {
    const { name, value } = e.target;
    name === "email" ? setValidEmail(false) : setValidPass(false);
    setLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <Button color="link" onClick={toggle}>
        Login
      </Button>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                valid={validEmail}
                invalid={validEmail}
                type="email"
                name="email"
                id="email"
                placeholder="example@email.com"
                value={login.email}
                onChange={handelForm}
              />
              <FormFeedback>OOPS!! {msg}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                valid={validPass}
                invalid={validPass}
                type="password"
                name="password"
                id="password"
                value={login.password}
                onChange={handelForm}
              />
              <FormFeedback>OOPs! {msg}</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="dark" onClick={handleLogin}>
            Login
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Login;
