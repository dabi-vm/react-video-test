import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';

export const AppRoutes = () => {

  const commonRoutes = [{ path: '/', element: <div /> }];

  const routes = publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
