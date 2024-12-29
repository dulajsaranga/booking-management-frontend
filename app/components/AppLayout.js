import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
const { Header, Content } = Layout;
const { Item } = Menu;

const AppLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [current, setCurrent] = useState('bookings');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={handleClick} 
          selectedKeys={[current]}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
            <Item key="bookings">
                <Link href="/">Bookings</Link>
            </Item>
            <Item key="customers">
                <Link href="/customers">Customers</Link>
            </Item>
        </Menu>
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};
export default AppLayout;