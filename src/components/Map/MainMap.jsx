import { React, useState } from 'react';
import { Button, Form, InputGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Map, { Marker, Popup, GeolocateControl } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

import GeocoderControl from './GeocoderControl';

/**
 * '해결사항 : Marker 클릭 했을 시 Popup이 안 나타나는 문제
 */

// Popup 넣을 때 button 스타일 지정
// import './MainMap.css';

const TOKEN = 'pk.eyJ1Ijoic3Vud29uZ2EiLCJhIjoiY2w4eWxkNDZ5MGh2dDN3dDV2ZjNma2M2MiJ9.uRRO8IUZTFjCbk7Jn8q3ng';

const MainMap = () => {
	// 검색한 위치 정보 담긴 Array
	const [pois, setPois] = useState([]);
	// 클릭한 Marker의 정보를 확인하기 위한 state
	const [popupInfo, setPopupInfo] = useState(null);

	const [value, setValue] = useState(false);

	const handleClick = async ({ lngLat }) => {
		const res = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${TOKEN}&types=poi`);
		const description = res.data.features[0].text;
		setPois((pois) => [...pois, { center: [lngLat.lng, lngLat.lat], text: description }]);
	};
	const handleMove = async ({ lngLat }) => {
		const res = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${TOKEN}&types=poi`);
		setPopupInfo(res.data.features[0]);
	};
	const handleChange = (val) => setValue(val);

	// API 작동 확인용 위치 검색 함수
	const onSearch = async (e) => {
		const inputNode = e.target.parentNode.children[0];
		const searchText = inputNode.value;
		const res = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?${TOKEN}&types=poi`);
		setPois(res.data.features);
	};

	// 마커 클릭 했을 시 Popup 출력하게 state 변경
	const onClickMarker = (e, poi) => {
		e.originalEvent.stopPropagation();
		setPopupInfo(poi);
	};
	return (
		<div>
			<InputGroup>
				<Form.Control />
				<Button variant='success' onClick={onSearch}>
					search
				</Button>
			</InputGroup>
			<ToggleButtonGroup className='mb-3' type='radio' name='options' defaultValue={false} onChange={handleChange}>
				<ToggleButton id='tbg-radio-1' value={false}>
					OFF
				</ToggleButton>
				<ToggleButton id='tbg-radio-2' value={true}>
					ON
				</ToggleButton>
			</ToggleButtonGroup>
			<Map
				initialViewState={{
					longitude: 127,
					latitude: 37,
					zoom: 10,
				}}
				style={{ height: '400px' }}
				mapStyle='mapbox://styles/mapbox/streets-v9'
				mapboxAccessToken={TOKEN}
				onClick={value && handleClick}
				// onMouseMove={value && handleMove}
				// api호출 너무 많고, 팝업 표시되는것이 부자연스러움
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
						<Button varient='secondary'>save</Button>
					</Popup>
				)}
				<GeocoderControl mapboxAccessToken={TOKEN} position='top-left'></GeocoderControl>
				<GeolocateControl trackUserLocation={true}></GeolocateControl>
			</Map>
		</div>
	);
};

export default MainMap;
