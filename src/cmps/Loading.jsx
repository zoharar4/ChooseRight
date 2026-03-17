
export function Loading({ isForPage = false, isTxt = true }) {
    return (
        <div className={`loading-wrapper ${isForPage ? "page" : "inline"}`}>
            <div className="loader">
                <div className="spinner"></div>
                {isTxt &&
                    <p className="loading-text">טוען...</p>
                }
            </div>
        </div>
    )
}