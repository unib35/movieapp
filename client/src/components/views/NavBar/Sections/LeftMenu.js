import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined,
		 HeartOutlined,
	     MenuOutlined
} from '@ant-design/icons'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

let Title = 'FavoritePage'

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
		<a href="/"><HomeOutlined /></a>
    </Menu.Item>
	<SubMenu title={<span><MenuOutlined /></span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>	  
	<Menu.Item key="favorite">
      <a href="/favorite"><HeartOutlined /></a>
    </Menu.Item>
		  
    
  </Menu>
  )
}

export default LeftMenu