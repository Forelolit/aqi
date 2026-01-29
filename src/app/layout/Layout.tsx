import type { FC } from 'react';
import { Link, Outlet } from 'react-router';
import { Button } from '@/components';
import { paths } from '@/utils/constants';
import { useAuthStore } from '@/store';

export const Layout: FC = () => {
    const { isAuth, logout, user } = useAuthStore();

    return (
        <>
            <div className="flex items-center gap-5 absolute top-10 right-20 z-10">
                {!isAuth && (
                    <>
                        <span>Guest</span>
                        <Link to={paths.register} className="hover:*:text-blue-500 *:duration-300">
                            <Button variant="outline">Registration</Button>
                        </Link>
                    </>
                )}
                {isAuth && (
                    <>
                        <span>{user?.username}</span>
                        <Button variant="outline" onClick={logout}>
                            Logout
                        </Button>
                    </>
                )}
            </div>
            <main>
                <Outlet />
            </main>
        </>
    );
};
