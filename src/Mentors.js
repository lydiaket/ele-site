import React from 'react';
function Mentors() {
    return (
        <div className="mentors-page">
            <h1>Become a Mentor</h1>
            
            <section className="mentors-intro">
                <p>
                    At Egna Le Egna, we are fortunate to have a diverse group of passionate, selfless, and dedicated mentors from various backgrounds, interests, and educational paths. Our mentors consistently find the experience to be incredibly impactful and fulfilling. By sharing your experiences, you can make a significant difference in the lives of students who are navigating challenges similar to those you’ve faced. Rest assured, we provide ongoing support to our mentors as they guide their mentees.
                </p>
            </section>

            <section className="mentor-responsibilities">
                <h2>Your Role as an ELE Mentor</h2>
                <p>
                    As an ELE Mentor, you will work with low-income Ethiopian and Eritrean high school students, providing the information, guidance, and support they need to thrive in high school and beyond. This role involves a commitment to mentor and support students from grades 9 through 12 across the country, helping them navigate their high school journey and prepare for college. The mentor-mentee relationship is built on honesty and transparency, and we expect our mentors to uphold these values.
                </p>
            </section>

            <section className="mentor-qualifications">
                <h2>What We’re Looking For</h2>
                <ul>
                    <li>Familiarity with the college application process and a passion for helping students from low socioeconomic backgrounds.</li>
                    <li>A commitment to our mission and a desire to make a meaningful difference.</li>
                    <li>Ability to dedicate at least 1 hour per week for one year.</li>
                    <li>Highly organized with excellent judgment.</li>
                    <li>A passion for mentoring high school students and a willingness to develop communication and mentoring skills.</li>
                    <li>Solution-oriented, with the ability to effectively use provided resources.</li>
                    <li>Sensitivity and support for low-income, first-generation students facing challenges in high school.</li>
                </ul>
            </section>

            <section className="mentor-application">
                <h2>How to Apply</h2>
                <p>
                    While most of our recruitment takes place in the Spring, we welcome applications at any time. If you’re interested in becoming a mentor, please fill out our application form and contact us via email.
                </p>
                <div className="apply-button-container">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfsqUdG2KguedIUIgHhnA8WQUBmUDj0ZdF3-VrePlUF6r26uA/viewform" target="_blank" rel="noopener noreferrer" className="apply-button">
                    Click Here to Apply
                </a>
            </div>
            </section>

            
        </div>
    );
}

export default Mentors;
