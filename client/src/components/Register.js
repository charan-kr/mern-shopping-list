import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { registerUser } from "../actions/userAction";

function Register() {
  const error = useSelector(state => state.error);
  const { msg, id } = error;

  const [modal, setModal] = useState(false);
  const [validname, setValidname] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (id === "REGISTER_FAILED") {
      if (msg === "Enter all credentials") {
        setValidname(true);
        setValidEmail(true);
        setValidPass(true);
      } else if (msg === "Email Already exsist") setValidEmail(true);
      else setValidPass(true);
    } else {
      setRegister({ name: "", email: "", password: "" });
      modal && toggle();
    }
  }, [msg, id]);

  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const handleRegister = () => {
    dispatch(registerUser(register));
  };
  const handelForm = e => {
    const { name, value } = e.target;
    name === "email"
      ? setValidEmail(false)
      : name === "password"
      ? setValidPass(false)
      : setValidname(false);
    setRegister(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <Button color="link" onClick={toggle}>
        Register
      </Button>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">UserName</Label>
              <Input
                invalid={validname}
                type="text"
                name="name"
                id="username"
                placeholder="UserName"
                value={register.name}
                onChange={handelForm}
              />
              <FormFeedback>OOPS!! {msg}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                invalid={validEmail}
                type="email"
                name="email"
                id="email"
                placeholder="example@email.com"
                value={register.email}
                onChange={handelForm}
              />
              <FormFeedback>OOPS!! {msg}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                invalid={validPass}
                type="password"
                name="password"
                id="password"
                value={register.password}
                onChange={handelForm}
              />
              <FormFeedback>Password criteria not met</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="dark" onClick={handleRegister}>
            Register
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Register;
