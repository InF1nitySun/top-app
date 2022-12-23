import cn from "classnames";
import axios from "axios";
import {useState} from "react";
import {useForm, Controller} from "react-hook-form";

import {ReviewFormProps} from "./ReviewForm.props";
import {Input, Rating, Textarea, Button} from "..";
import {IReviewForm, IReviewSentResponse} from "./ReviewForm.interface";
import {API} from "../../helpers/api";

import styles from "./ReviewForm.module.css";
import CloseIcon from './close.svg';

export const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {

    const {register, control, handleSubmit, formState: {errors}, reset, clearErrors} = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<string>();
    const onSubmit = async (formData: IReviewForm) => {

        try {
            const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setIsError("Что-то пошло не так");
            }
        } catch (err) {
            console.log(err);
            // setIsError(message)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)}{...props}>
                <Input
                    {...register('name', {required: {value: true, message: "Заполните имя"}})}
                    placeholder="Имя"
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.name}
                />
                <Input
                    {...register('title', {required: {value: true, message: "Заполните заголовок"}})}
                    placeholder="Заголовок отзыва"
                    className={styles.title}
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка</span>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{required: {value: true, message: "Укажите рейтинг"}}}
                        render={({field}) => (
                            <Rating
                                isEditable
                                rating={field.value}
                                ref={field.ref}
                                setRating={field.onChange}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        )}
                    />
                </div>
                <Textarea
                    {...register('description', {required: {value: true, message: "Заполните отзыв"}})}
                    placeholder="Текст отзыва"
                    className={styles.description}
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                    aria-label='Текст отзыва'
                    aria-invalid={!!errors.description}
                />
                <div className={styles.submit}>
                    <Button
                        type="submit"
                        appearance="primary"
                        tabIndex={isOpened ? 0 : -1}
                        onClick={() => clearErrors()}
                    >Отправить</Button>
                    <span className={styles.info}
                    >* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.panel, styles.success)} role='alert'>
              <div className={styles.successTitle}>Ваш отзыв отправлен</div>
              <div>
                Спасибо, Ваш отзыв будет опубликован после проверки.
              </div>
              <button
                onClick={() => setIsSuccess(false)}
                className={styles.close}
                aria-label='Закрыть оповещение'
              >
                <CloseIcon/>
              </button>
            </div>}
            {isError && <div className={cn(styles.panel, styles.error)} role='alert'>
              <div>Что-то пошло не так попробуйте обновить страницу</div>
              <button
                onClick={() => setIsError(undefined)}
                className={styles.close}
                aria-label='Закрыть оповещение'
              >
                <CloseIcon/>
              </button>
            </div>}
        </form>
    );
};
