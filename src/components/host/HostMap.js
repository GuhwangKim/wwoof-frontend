import { useEffect } from "react";

const { kakao } = window;

const HostMap = (props) => {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };

    //map
    const map = new kakao.maps.Map(container, options);

    props.hosts.forEach((el) => {
      // 마커를 생성합니다
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(parseFloat(el.lat), parseFloat(el.lng)),
        //마커에 hover시 나타날 title
        title: el.shortintro,
      });
    });
  }, [props]);

  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
};

export default HostMap;
