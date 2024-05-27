import {useEffect, useState} from 'react';

import {currentEnvironment} from '@constants';

import styles from './users.module.scss';
import {FETCH_STATUS} from "pages/users/fetchUserStatus";

type Gender = 'female' | 'male' | '';

type User = {
    gender: Gender;
    login: {
        uuid: string;
    };
    name: {
        first: string;
        last: string;
    };
};

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [gender, setGender] = useState<Gender>('');
    const [pageToGet, setPageToGet] = useState<number>(1);
    const [status, setStatus] = useState<FETCH_STATUS>(FETCH_STATUS.IDLE);
    const [selectedOption, setSelectedOption] = useState<Gender>('');

    const getUsers = async (page: number, gender: Gender) => {
        try {
            setStatus(FETCH_STATUS.LOADING);
            const result = await fetch(
                `${currentEnvironment.api.baseUrl}?results=5&gender=${gender}&page=${String(page)}`,
            );
            setStatus(FETCH_STATUS.SUCCESS);
            const usersResults = await result.json();
            setUsers((oldUsers) => (page === 1 ? usersResults.results : [...oldUsers, ...usersResults.results]));
        } catch (error) {
            setStatus(FETCH_STATUS.ERROR);
        }
    };

    const isLoading = status === FETCH_STATUS.LOADING;
    const isSuccess = status === FETCH_STATUS.SUCCESS;
    const isError = status === FETCH_STATUS.ERROR;

    const filterUsersByGender = users.filter(user => {
        switch (gender) {
            case "":
                return user.gender;
            case 'female':
                return user.gender === 'female';
            case 'male':
                return user.gender === 'male';
        }
    });

    useEffect(() => {
        void (async () => {
            await getUsers(pageToGet, gender);
        })();
    }, [pageToGet, gender]);

    if (isLoading)
        return <div className={styles.loading}> Loading...</div>

    return (
        <div>
            <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: "center",
                marginTop: '5px',
                marginBottom: '5px',
                gap: '10px',
                alignItems: 'center'
            }}>
                Users
                <select
                    id="gender"
                    name="gender"
                    value={selectedOption}
                    onChange={(event) => {
                        setGender(event.target.value as Gender)
                        setSelectedOption(event.target.value as Gender)
                        setUsers([]);
                    }}
                >
                    <option value="">All</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            </div>
            {isSuccess &&
                <ul className={styles.list}>
                    {users?.length > 0
                        ? users?.map((user: User, index) => (
                            <li className={styles.listItem} key={user.login.uuid}>
                                {user.name.first}
                                {' '}
                                {user.name.last}
                                {' '}
                                {user.gender}
                                {' '}
                            </li>
                        )) : null}
                </ul>
            }
            {isError && (<span>Unable to fetch users. </span>)}
            <button
                className={styles.loadButton}
                type="button"
                onClick={() => {
                    setPageToGet((v) => v + 1);
                }}
            >
                Load More
            </button>
        </div>
    );
};

export default Users;

// 1. The logo looks tiny on smaller devices.
// 2. TEC theme is not displayed on the app bar instead a green color is seen.
// 3. Users screen does not display any data.
// 4. Load more button style is not working.
// 5. Style issues are encountered on the page - style however you want.
// 6. Additional data is not displayed upon using "Load more" button.
// 7. Users are not filtered by gender and the list does not reset on change select.
// 8. No loading state is displayed when accessing "Users" component.
// 9. On home page user should be able to do the following actions with cards that contain
// 2 fields: Title and Description
//     - See all the cards already added
//     - Add a card
//     - Update a card
//     - Delete a card
