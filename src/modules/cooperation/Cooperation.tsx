import { useEffect } from "react";

import { getCooperationListAction } from "@modules/cooperation/store/actions";
import { useDispatch } from "react-redux";

const Cooperation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCooperationListAction());
  }, []);

  return (
    <div>
      <p>Cooperation</p>
    </div>
  );
};

export default Cooperation;
