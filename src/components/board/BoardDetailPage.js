import { json, useRouteLoaderData, redirect } from "react-router-dom";
import BoardItem from './BoardItem';

function BoardDetail() {
    const data = useRouteLoaderData("board-detail"); 
    // 1. App 에서 보낸 loader의 값을 id로 읽어서 사용함 
    // 3. loader의 실행 결과로써 data 

    return <BoardItem board = {data} />

}

export default BoardDetail;

export async function loader({ request, params }) {
  const id = params.boardNum; 
  // 2. board-detail 에 매칭된 loader가 실행, 그때 param으로 path 들어옴   
  const response = await fetch("http://localhost:8080/api/post/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else{
    return response;
  }
}

export async function action({params, request}){
  const id = params.boardNum; 
  const response =await fetch ('http://localhost:8080/api/post/' + id, {
    method : request.method, // method : 'delete'
  });
  if(!response.ok){
    throw json(
      {message : 'could not delete event'},
      {
        status: 500,
      }
    );
  }
  return redirect('/boards')
}
