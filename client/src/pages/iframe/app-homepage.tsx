import {NextPage} from 'next'
import styles from '@styles/Index.module.css'
import {SyntheticEvent, useEffect, useState} from "react";
import {getUserAccessTokenData, populateTeammateList} from "@utils/index";

const AppHomepage: NextPage = () => {
    const [data, setData] = useState<[]>([]);
    const [showButton, setShowButton] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const userTokenData = await getUserAccessTokenData(false);
            if (userTokenData !== null) {
                const data: any = populateTeammateList(userTokenData);
                if (data && data.data) {
                    console.log("data.data exists");
                    setData(data.data);
                }
            } else {
                setShowButton(true);
            }
        })()
    }, []);

    const handleAuthorizationButtonPressed = async (e: SyntheticEvent) => {
        e.preventDefault();

        const userTokenData = await getUserAccessTokenData(true);
        const data: any = populateTeammateList(userTokenData);

        if (data && data.data) {
            console.log("data.data exists");
            setData(data.data);
        }
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Coffee Space
                </h1>

                <p className={styles.description}>
                    A coffee space for Jetbrains Space
                </p>

                {showButton && (
                    <button onClick={handleAuthorizationButtonPressed}>
                        Authorize to see team members
                    </button>
                )}

                {data ? (
                    <ul>
                        {data.map((element: any, index: number) => {
                            return (
                                <pre key={index}>
                                    {JSON.stringify(element, null, 2)}
                                </pre>
                            )
                        })}
                    </ul>
                ) : (
                    <p>
                        no data
                    </p>
                )}
            </main>
        </div>
    )
}

export default AppHomepage;
