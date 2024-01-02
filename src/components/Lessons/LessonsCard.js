import { Link } from "react-router-dom";
function LessonsCard({ lesson }) {
    const cardInfo = (lesson) => {
        return (
            <div className="lessons-card card" key={lesson.id}>
                <img
                    src={lesson.image}
                    className="card-img-top"
                    alt="Piano Basics"
                    style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                    }}
                />
                <div className="card-body d-flex flex-column">
                    <div>
                        <h6
                            className="card-subtitle text-uppercase"
                            style={{
                                color: "var(--color-secondary)",
                                fontSize: "12px",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                            }}
                        >
                            {lesson.category}
                        </h6>
                        <h5
                            className="card-title"
                            style={{
                                color: "var(--color-black-100)",
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            {lesson.title}
                        </h5>
                        <p
                            className="card-text"
                            style={{
                                color: "var(--color-black-100)",
                                fontSize: "16px",
                                fontWeight: "normal",
                            }}
                        >
                            {lesson.description}
                        </p>
                    </div>
                    <div className="mt-auto">
                        <ul className="list-inline">
                            {lesson.tags.map((tag, index) => (
                                <li className="list-inline-item" key={index}>
                                    <span
                                        style={{
                                            border: "1px solid var(--color-secondary)",
                                            color: "var(--color-secondary)",
                                            borderRadius: "16px",
                                            fontSize: "12px",
                                            padding: "4px 8px",
                                            margin: "2px",
                                            display: "inline-block",
                                        }}
                                    >
                                        {tag}{" "}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            {lesson.id === 1 ? (
                <Link to="/lesson" className="card-link">
                    {cardInfo(lesson)}
                </Link>
            ) : (
                cardInfo(lesson)
            )}
        </>
    );
}

export default LessonsCard;
