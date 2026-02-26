import logo from "../assets/images/logo.png"
export function PlanPreview({ plan }) {
    return (
        <div className="plan-preview" >
            <div className="image-container">
                <img src={logo} alt="" />
                {/* <img src={plan.image} alt="" /> */}
            </div>
            <h1 className="underline">{plan.title}</h1>
            <p className="bold">{plan.subtitle}</p>
            <p>{plan.details}</p>
            <p><span className="underline">התכנית כוללת</span>:</p>
            <p>{plan.meetings}</p>
            <p><span className="underline">משך התכנית</span>: {plan.duration}</p>
            <p><span className="underline">עלות התכנית</span>: {plan.cost} ש"ח</p>
        </div>
    )
}