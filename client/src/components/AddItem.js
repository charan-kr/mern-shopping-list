import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../actions/itemActions";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
  Alert
} from "reactstrap";

function AddItem() {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const handleChange = e => setItem(e.target.value);

  const handleSubmit = () => {
    if (!item) setMsg("Empty items cannot be added");
    else {
      dispatch(addItem({ name: item }));
      setItem("");
      toggle();
    }
  };
  return (
    <div>
      <Button className="m-2" color="dark" onClick={toggle}>
        ADD ITEM
      </Button>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}> ADD TO SHOPPING LIST</ModalHeader>
        <ModalBody>
          {msg && (
            <Alert className="my-0" color="warning">
              {msg}
            </Alert>
          )}
          <FormGroup>
            <Label for="addItem">Item Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Item Name..."
              value={item}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="dark" onClick={handleSubmit}>
            ADD
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddItem;
