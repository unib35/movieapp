import React from 'react'
import { Descriptions, Badge } from 'antd';
import { IMAGE_BASE_URL } from '../../../Config'
import CastProfile from './CastProfile'
import replacePoster from '../../commons/toReplaceImage/GreenImage.jpeg'

function CastInfo(props) {

    let { cast } = props;

	const genderHandler = (gen) => {
		if(gen === 1){
			return 'Female';
		} else if(gen === 2) {
			return 'Male';
		} else {
			return 'Unknown';
		}
		
		console.log(cast.profile_path)
	}
	
	
	
    return (
        <Descriptions bordered>
			<Descriptions.Item label="CastInfo" span={3}>
				<CastProfile 
					image = {cast.profile_path ?
						`${IMAGE_BASE_URL}w500${cast.profile_path}`: replacePoster }
					name = {cast.name}
				/>
			</Descriptions.Item>
            <Descriptions.Item label="Name">{cast.name}</Descriptions.Item>
			<Descriptions.Item label="Gender">{genderHandler(cast.gender)}</Descriptions.Item>
			<Descriptions.Item label="Birthday">{cast.birthday}</Descriptions.Item>
            <Descriptions.Item label="Popularity">{cast.popularity}</Descriptions.Item>
			<Descriptions.Item label="Department">{cast.known_for_department}</Descriptions.Item>
			<Descriptions.Item label="Place Of Birth">{cast.place_of_birth}</Descriptions.Item>
			<Descriptions.Item label="Biography" span={3}>{cast.biography}</Descriptions.Item>
        </Descriptions>
		
    )
}

export default CastInfo