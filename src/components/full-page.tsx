import styled from '@emotion/styled';
import { Spin, Typography } from 'antd';

export const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => <FullPage><Spin size="large" /></FullPage>;

export const FullPageError = ({ error }: { error: Error | null }) => <FullPage>
    <Typography.Text type="danger">{error?.message}</Typography.Text>
</FullPage>;
