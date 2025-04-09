import loadingSpinnerStyle from './loading-spinner.module.css';
export const LoadingSpinner = () => {

    return (
        <div className={loadingSpinnerStyle["loadingSpinnerContainer"]}>
            <div className={loadingSpinnerStyle["loadingSpinner"]}>
            </div></div>
    );
}
