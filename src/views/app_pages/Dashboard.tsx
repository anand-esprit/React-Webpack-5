import { observer } from "mobx-react-lite";
import React from "react";

const Dashboard: React.FC = observer(() => {
  // const { AUTH } = useStore();
  // console.log(toJS(AUTH.appList));
  return (
    <>
      <div className="dashBoardWrap"></div>
    </>
  );
});

export default Dashboard;
