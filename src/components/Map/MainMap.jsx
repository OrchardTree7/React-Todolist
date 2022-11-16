import { React, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Map, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * '해결사항 : Marker 클릭 했을 시 Popup이 안 나타나는 문제
 *  메인 캘린더에 컴포넌트 부착
 * 	Naver api를 사용한 장소 검색
 */

// Popup 넣을 때 button 스타일 지정
// import './MainMap.css';

const MainMap = () => {
	// 검색한 위치 정보 담긴 Array
	const [pois, setPois] = useState(null);
	// 클릭한 Marker의 정보를 확인하기 위한 state
	const [popupInfo, setPopupInfo] = useState(null);

	// API 작동 확인용 위치 검색 함수
	const onSearch = async (e) => {
		const inputNode = e.target.parentNode.children[0];
		const searchText = inputNode.value;
		const res = await axios(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=pk.eyJ1Ijoic3Vud29uZ2EiLCJhIjoiY2w4eWxkNDZ5MGh2dDN3dDV2ZjNma2M2MiJ9.uRRO8IUZTFjCbk7Jn8q3ng&types=poi`
		);
		setPois(res.data.features);
	};

	// 마커 클릭 했을 시 Popup 출력하게 state 변경
	const onClickMarker = (e, poi) => {
		e.originalEvent.stopPropagation();
		setPopupInfo(poi);
	};
	return (
		<div>
			<InputGroup className='mb-3'>
				<Form.Control />
				<Button variant='success' onClick={onSearch}>
					search
				</Button>
			</InputGroup>
			<Map
				initialViewState={{
					longitude: 127,
					latitude: 37,
					zoom: 10,
				}}
				style={{ height: '500px' }}
				mapStyle='mapbox://styles/mapbox/streets-v9'
				mapboxAccessToken='pk.eyJ1Ijoic3Vud29uZ2EiLCJhIjoiY2w4eWxkNDZ5MGh2dDN3dDV2ZjNma2M2MiJ9.uRRO8IUZTFjCbk7Jn8q3ng'
			>
				{pois &&
					pois.map((poi, i) => (
						<Marker
							key={i}
							longitude={poi.center[0]}
							latitude={poi.center[1]}
							color={'red'}
							onClick={(e, p = poi) => {
								onClickMarker(e, p);
							}}
						></Marker>
					))}
				{popupInfo && (
					<Popup anchor='top' longitude={Number(popupInfo.center[0])} latitude={Number(popupInfo.center[1])} onClose={() => setPopupInfo(null)}>
						{popupInfo.text}
					</Popup>
				)}
			</Map>
		</div>
	);
};

export default MainMap;
