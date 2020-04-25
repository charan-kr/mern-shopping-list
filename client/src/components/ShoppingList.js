import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { loadUser } from "../actions/userAction";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import AddItem from "./AddItem";

const ShoppingList = () => {
  const items = useSelector(state => state.item.items);
  const auth = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    dispatch(loadUser());
  }, []);

  const handleDelete = id => dispatch(deleteItem(id));

  return (
    <>
      {auth ? (
        <AddItem />
      ) : (
        <h5 className="m-2">Login to manage shopping List</h5>
      )}
      <ListGroup className="mx-2">
        {items.map(item => (
          <ListGroupItem key={item._id}>
            {auth && (
              <Button
                className="mr-2"
                color="danger"
                onClick={() => handleDelete(item._id)}
              >
                X
              </Button>
            )}
            {item.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default ShoppingList;
