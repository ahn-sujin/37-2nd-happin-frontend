import React, { useEffect, useState } from "react";
import Maked from "./components/Maked";
import Boards from "./components/Boards";
import Profile from "./components/Profile";
import BoardDetail from "./components/BoardDetail";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { API, accessToken } from "../../config";

const MyPage = () => {
  const { id } = useParams();
  const [selectTab, setSelectTab] = useState("저장됨");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${API.MYPAGE}`, {
      headers: { authorization: accessToken },
    })
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  useEffect(() => {
    if (id === "saved") {
      setSelectTab("저장됨");
    } else if (id === "maked") {
      setSelectTab("생성됨");
    }
  }, [id]);

  return (
    <div>
      {id === "saved" || id === "maked" ? (
        <MyPageContainer>
          <Profile data={data.userInfo} />
          <TabContainer>
            <TabSelectBox>
              <Link to="/my-page/maked">
                <TabSelectBtn name="생성됨">생성됨</TabSelectBtn>
              </Link>
              <Link to="/my-page/saved">
                <TabSelectBtn name="저장됨">저장됨</TabSelectBtn>
              </Link>
            </TabSelectBox>
            {selectTab === "생성됨" ? (
              <Maked data={data.createdList} />
            ) : (
              <Boards data={data.boards} token={accessToken} />
            )}
          </TabContainer>
        </MyPageContainer>
      ) : (
        <BoardDetail />
      )}
    </div>
  );
};

const TabContainer = styled.div`
  .nav-tabs {
    display: flex;
    justify-content: center;
  }
`;

const TabSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabSelectBtn = styled.button`
  margin: 5px;
  padding: 8px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  background-color: white;

  &:hover {
    background-color: #ede9e9;
  }
`;

const MyPageContainer = styled.div`
  margin-top: 100px;
`;
export default MyPage;
