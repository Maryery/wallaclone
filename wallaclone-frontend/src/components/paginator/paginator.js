import React from 'react';
import { Pagination } from 'semantic-ui-react';
import * as S from './styles';

const Paginator = () => (
	<S.PaginatorContainer>
		<Pagination defaultActivePage={5} totalPages={10} />
	</S.PaginatorContainer>
);

export default Paginator;
