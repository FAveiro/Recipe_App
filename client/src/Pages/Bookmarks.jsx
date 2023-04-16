import React, { useEffect, useContext, useState } from "react";

//* Components
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import ShowRecipe from "../Components/ShowRecipe";
import axios from "axios";

//* Import context
import { UserInfomationContext } from "../Contexts/UserInfo";
import ShowBookmark from "../Components/ShowBookmark";

function Bookmarks() {
  const { userInfo } = useContext(UserInfomationContext);
  const [bookmarkData, setBookmarkData] = useState({
    data: [],
    status: null,
  });

  const [loading, setLoading] = useState(false);
  const [changeBookmark, setChangeBookmark] = useState(null);

  const bookmarkApi = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/bookmark`, {
        params: { user: userInfo },
      });
      setBookmarkData({
        data: response.data,
        status: response.status,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    bookmarkApi();
  }, [changeBookmark]);

  return (
    <div className="w-screen h-screen flex flex-col gap-20">
      <div className="flex flex-col">
        <Header navbar={true} />
      </div>
      <div className="px-10">
        {loading ? <Loading /> : <ShowBookmark data={bookmarkData.data} change={setChangeBookmark}/>}
      </div>
    </div>
  );
}

export default Bookmarks;
