import styled from '@emotion/styled';
import { Button } from 'antd';
import { useAuth } from './context/auth-context';
import { ProjectListScreen } from './screens/project-list';

export const AuthenticatedApp = () => {
    const { user, logout } = useAuth();
    return (
        <Container>
            <PageHeader>
                <span>当前用户: {user?.username}</span>
                <Button onClick={logout}>登出</Button>
            </PageHeader>
            <Main>
                <ProjectListScreen />
            </Main>
        </Container>
    );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
`;

const PageHeader = styled.header`
  height: 6rem;
  background-color: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.4rem;
`;

const Main = styled.main`
  padding: 2.4rem;
`;
