import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';

import Button from 'components/button/Button';
import Cta from 'components/cta/Cta';
import Markdown from 'components/markdown/Markdown';
import { postLog } from 'services/logs.service';
import { Props } from './Recommendation.interface';

import s from './Recommendation.module.scss';

export default (props: Props): JSX.Element => {
    const {
        id,
        name,
        recommended_package,
        recommended_package_content,
        optional_package,
        optional_package_content,
        hide_details,
    } = props;

    const columnStyle = optional_package ? s.recommendation__columns___two : s.recommendation__columns___one;

    useEffect(() => {
        const postData = async () => {
            const log = await postLog(recommended_package.id);
        };
        postData().catch(console.error);
    }, []);

    return (
        <>
            <div className={s.recommendation}>
                <div className={`${s.recommendation__columns} ${columnStyle}`}>
                    <div className={s.recommendation__column}>
                        <h1 className={s.recommendation__title}>We recommend...</h1>
                        <div className={s.recommendation__header}>
                            <h3 className={s.recommendation__package}>{recommended_package.name} Package</h3>
                        </div>
                        <Markdown
                            className={s.recommendation__content}
                            source={recommended_package_content}
                            container
                            listItemIcon={
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    size="sm"
                                    aria-label="check icon."
                                    color="#62a43f"
                                />
                            }
                        />
                        {!hide_details && (
                            <div className={s.recommendation__details}>
                                <p><strong>{recommended_package.name} Package</strong><br /> {recommended_package.description}</p>
                            </div>
                        )}
                        <div className={s.recommendation__price}>
                            <span>£{recommended_package.price}</span>
                        </div>
                        <div className={s.recommendation__buttons}>
                            <Button
                                role="success"
                                to={recommended_package.buy_link}
                                className={`${s.recommendation__button} ${s.recommendation__button___buy}`}
                            >
                                Buy Now
                            </Button>
                            <Button
                                role="secondary"
                                to={recommended_package.details_link}
                                className={`${s.recommendation__button} ${s.recommendation__button___details}`}
                            >
                                Read More
                            </Button>
                        </div>

                        { !optional_package && <Cta /> }
                    </div>
                    {optional_package && (
                        <>
                            <div className={s.recommendation__divider}></div>
                            <div className={s.recommendation__column}>
                                <h1 className={s.recommendation__title}>Also consider...</h1>
                                <div className={s.recommendation__header}>
                                    <h3 className={s.recommendation__package}>{optional_package.name} Package</h3>
                                </div>
                                <Markdown
                                    className={s.recommendation__content}
                                    source={optional_package_content}
                                    container
                                    listItemIcon={
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            size="sm"
                                            aria-label="check icon."
                                            color="#62a43f"
                                        />
                                    }
                                />
                                {!hide_details && (
                                    <div className={s.recommendation__details}>
                                        <p><strong>{optional_package.name} Package</strong><br />{optional_package.description}</p>
                                    </div>
                                )}
                                <div className={s.recommendation__price}>
                                    <span>£{optional_package.price}</span>
                                </div>
                                <div className={s.recommendation__buttons}>
                                    <Button
                                        role="success"
                                        to={optional_package.buy_link}
                                        className={`${s.recommendation__button} ${s.recommendation__button___buy}`}
                                    >
                                        Buy Now
                                    </Button>
                                    <Button
                                        role="secondary"
                                        to={optional_package.details_link}
                                        className={`${s.recommendation__button} ${s.recommendation__button___details}`}
                                    >
                                        Read More
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                { optional_package && <Cta /> }
            </div>
        </>
    );
};
