
import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import BoardList from "./BoardList";


function BoardsPage() {
  const { boards } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading</p>}>
      <Await resolve={boards}>
        {(loadBoard) => <BoardList boards={loadBoard} />}
      </Await>
    </Suspense>
  );
}

export default BoardsPage;

async function loadBoard() {

  let headers = new Headers({
    "Content-Type": "application/json",
  });
  
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  const response = await fetch("http://localhost:8080/api/post/list", {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
export function loader() {
  // 해당 로드 안에서 response 즉 Promise를 기다리는 것을 피하기 위함 }
  return defer({
    boards: loadBoard(),
  });
}