import { RiHome4Line, RiCake3Fill, RiCodepenLine,  RiUserFill } from "react-icons/ri";

export const sideData = [
    {
        name: 'dashboard',
        path: '/',
        icon: <RiHome4Line/>

    },
    {
        name: 'products',
        path: '/products',
        icon: <RiCake3Fill/>,
        features: [
            {
             name: 'create product',
             path: '/products/create-product'
            },
            {
                name: 'category',
                path: '/products/category'
            },
         ]
    },
    {
        name: 'combos',
        path: '/combos',
        icon: <RiCodepenLine/>,
        features: [
            {
             name: 'create combos',
             path: '/combos/create-combos'
            }
         ]
    },
    {
        name: 'Users',
        path: '/users',
        icon: <RiUserFill/>,
        features: [
            {
             name: 'create users',
             path: '/users/create-users'
            },
            {
                name: 'roles',
                path: '/users/roles'
            }
         ]
    },
]