import React from 'react';
import styles from './ProjectCard.module.css';

export function ProjectCard({img, label, imageDescription, onClick}) {

    return (
        <>
        <section className={styles['project-cards']}>
            <span className={styles['project-card-image']}>
                <img
                    src={img}
                    alt={imageDescription}
                    onClick={onClick}
                />
            </span>
            <span className={styles['project-card-label']}>
                <p>{label}</p>
            </span>

        </section>
        </>
    )
}

export default ProjectCard;