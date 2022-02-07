import React from 'react';
import cx from 'classnames';
import Logo from '../assets/img/logo.jpg'
import '../assets/scss/layout/DefaultLayout.scss'
import { Link } from 'react-router-dom';
import Button from '../components/basic/Button';
import { useSelector } from 'react-redux';

const DefaultLayout = ({
    children,
    header,
    navbar,
    login = false,
    ...rest
}) => {
    const { user } = useSelector(state => state.auth)
    return (
        <div className='DefaultLayout'>
            {header &&
                <Link to="/">
                    <div>
                        <img src={Logo} alt="logo" width="100px" />
                    </div>
                </Link>
            }
            {navbar &&
                <div className='Navbar'>
                    <img src={Logo} alt="logo" width="100px" />
                    <Link to="/"><Button>Home</Button></Link>
                    <div>
                        <div>{user}</div>
                    </div>
                </div>
            }

            <div className={cx('LayoutBody', { "login": login })} {...rest}>
                {children}
            </div>
        </div>
    );
};

export default DefaultLayout;
