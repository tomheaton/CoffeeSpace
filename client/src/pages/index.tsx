import {NextPage} from 'next'
import styles from '@styles/Index.module.css'

const Index: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Coffee Space
                </h1>

                <p className={styles.description}>
                    A coffee space for Jetbrains Space
                </p>
            </main>
        </div>
    )
}

export default Index;
