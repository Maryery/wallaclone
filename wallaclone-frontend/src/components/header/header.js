import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import wallaclon from '../../images/wallaclon.svg';
import * as S from './styles';

const Header = ({ user, handleLogout }) => (
	<Menu>
		<S.LogoMenu as={Link} to="/">
			<S.Logo src={wallaclon} />
		</S.LogoMenu>
		<Menu.Item>
			{user === null && (
				<Button primary as={Link} to="/register">
					{' '}
					Sign up{' '}
				</Button>
			)}
		</Menu.Item>
		<Menu.Item>
			{user === null && (
				<Button as={Link} to="/login">
					{' '}
					Login{' '}
				</Button>
			)}
			{user !== null && (
				<Button primary as={Link} to="/" onClick={handleLogout}>
					{' '}
					Logout{' '}
				</Button>
			)}
		</Menu.Item>
		<Menu.Item as={Link} to="/profile">
			{user !== null && <Button primary>Mi Perfil</Button>}
		</Menu.Item>
		<Menu.Item as={Link} to="/createAd">
			{user !== null && <Button primary>Subir un Producto</Button>}
		</Menu.Item>
		<Menu.Item></Menu.Item>
	</Menu>
);
export default Header;
