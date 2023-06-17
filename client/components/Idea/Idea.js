import React, {useState} from "react";
import styles from "./Idea.scss"

export const Idea = () => {

  const [ideaList, setIdeaList] = useState([])

  useEffect(() => {
    const getIdeaList = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/items');
        setIdeaList(res.data);
        console.log('render');
      } catch (error) {
        console.log(error);
      }
    };
    getItemsList();
  }, []);
  /*
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/item/${id}`);
      const newListItem = listItems.filter((item) => item._id !== id);
      setListItems(newListItem);
    } catch (error) {
      console.log(error);
    }
  };
  */

  return (
    <div>
      {/* map input */}

      <div className="idea-list">
        <ul>
          <p>Idea 1</p>
          <span>ideasss</span>
        </ul>
        </div>
      <h1>testing from the idea component</h1>
    </div>
  )
};